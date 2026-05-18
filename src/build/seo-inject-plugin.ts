/**
 * Vite plugin: inject SEO meta from `src/config/landing.config.ts` into the
 * built `index.html` head BEFORE the bundle is emitted.
 *
 * Why this exists
 * ---------------
 * The boilerplate ships with placeholder `<title>Landing Boilerplate</title>`
 * and `<meta name="description" content="Production landing boilerplate" />`
 * in `index.html`. The site React-renders the brand/copy from the config at
 * runtime, but the static head tags stay as boilerplate — which means:
 *
 *   - Google / Yandex index the page as "Landing Boilerplate".
 *   - Telegram / Facebook / WhatsApp link-previews show "Production landing
 *     boilerplate" (since they parse only the static HTML and never run JS).
 *   - First paint (before React boots) shows "Landing Boilerplate" in the
 *     tab title.
 *
 * The fix has to happen at BUILD time so the static HTML served to crawlers
 * already has the right title / description / og:title / og:image.
 *
 * Why we parse the .ts file with regex (not `import()`)
 * -----------------------------------------------------
 * The config is a TypeScript module. Importing it inside a Vite plugin
 * during `transformIndexHtml` is awkward (Node can't load .ts without a
 * loader, and bundling the config separately doubles complexity). Since
 * the config follows a predictable schema (single-quoted string literals
 * under `seo:` and `brand:` blocks), a balanced-brace + targeted regex
 * extractor is robust, dependency-free, and survives any whitespace /
 * line-break formatting the LLM-coder emits.
 *
 * If parsing fails (eg coder badly mangled the file), the plugin logs a
 * warn and leaves the HTML head untouched. The sentinel gate on the
 * agentflow-agents side will still catch boilerplate `<title>Landing
 * Boilerplate</title>` and force a retry.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const CONFIG_PATH = 'src/config/landing.config.ts';

export interface ExtractedSeo {
  lang?: string;
  brandName?: string;
  title?: string;
  description?: string;
  ogImage?: string;
  siteUrl?: string;
}

/**
 * Walk balanced braces from a `key: {` token to the matching `}`.
 * Returns the substring INCLUDING the outer braces, or null if not found.
 *
 * NB: We scan the raw source as a character stream. We don't try to
 * handle string-literal-with-curly-brace edge cases — the schema never
 * embeds `{` or `}` inside string values, so a naive depth counter is
 * sufficient and won't false-trigger inside a `tagline: 'foo'`.
 */
export function sliceObjectBlock(src: string, key: string): string | null {
  const startRe = new RegExp(`\\b${key}\\s*:\\s*\\{`);
  const start = src.match(startRe);
  if (!start || start.index === undefined) return null;
  const openIdx = start.index + start[0].length - 1;
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return src.slice(start.index, i + 1);
    }
  }
  return null;
}

/**
 * Extract a single-line string field like  `title: 'BrandX — …'`  from a
 * config block. Handles:
 *   - single-quoted or double-quoted values
 *   - value on its own line after the colon (Prettier breaks long lines)
 *   - escaped quotes `\'`  and  backslashes `\\` inside the literal
 * Returns null when not found.
 */
export function extractStringField(block: string, key: string): string | null {
  // Match  `key:` optionally followed by newline/whitespace, then a quoted
  // string. Use a non-greedy capture inside the quotes that allows escape
  // sequences but not raw newlines.
  const single = new RegExp(`\\b${key}\\s*:\\s*\\n?\\s*'((?:[^'\\\\\\n]|\\\\.)*)'`);
  const double = new RegExp(`\\b${key}\\s*:\\s*\\n?\\s*"((?:[^"\\\\\\n]|\\\\.)*)"`);
  const m = block.match(single) ?? block.match(double);
  if (!m) return null;
  return m[1].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

/** Parse the .ts source and pull out only the fields we need for HTML head. */
export function parseConfigSource(src: string): ExtractedSeo {
  const out: ExtractedSeo = {};
  // top-level lang: 'ru'
  const langMatch = src.match(/\blang\s*:\s*'([^'\n]+)'/);
  if (langMatch) out.lang = langMatch[1];

  const brandBlock = sliceObjectBlock(src, 'brand');
  if (brandBlock) {
    const name = extractStringField(brandBlock, 'name');
    if (name) out.brandName = name;
  }

  const seoBlock = sliceObjectBlock(src, 'seo');
  if (seoBlock) {
    const title = extractStringField(seoBlock, 'title');
    if (title) out.title = title;
    const description = extractStringField(seoBlock, 'description');
    if (description) out.description = description;
    const ogImage = extractStringField(seoBlock, 'og_image');
    if (ogImage) out.ogImage = ogImage;
    const siteUrl = extractStringField(seoBlock, 'site_url');
    if (siteUrl) out.siteUrl = siteUrl;
  }

  return out;
}

/** HTML-escape a value for use inside text content or attribute values. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Apply the extracted SEO to an HTML string. Pure function — no IO, so
 * unit tests can exercise it directly.
 */
export function applySeoToHtml(html: string, seo: ExtractedSeo): string {
  let out = html;

  // <html lang="..."> — only override if config explicitly sets `lang`.
  if (seo.lang) {
    out = out.replace(
      /<html(\s[^>]*?)?\slang="[^"]*"/i,
      `<html$1 lang="${escapeHtml(seo.lang)}"`,
    );
    // also handle the case where html has no lang attr yet
    if (!/<html[^>]*\slang=/.test(out)) {
      out = out.replace(/<html\b/i, `<html lang="${escapeHtml(seo.lang)}"`);
    }
  }

  // <title>...</title>
  if (seo.title) {
    out = out.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(seo.title)}</title>`,
    );
  }

  // <meta name="description" content="..." />
  if (seo.description) {
    out = out.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    );
  }

  // <meta property="og:title" content="..." />
  if (seo.title) {
    out = out.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    );
  }

  // <meta property="og:description" content="..." />
  if (seo.description) {
    out = out.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    );
  }

  // <meta property="og:image" content="..." /> — only if config has one.
  if (seo.ogImage) {
    out = out.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${escapeHtml(seo.ogImage)}" />`,
    );
  }

  // Add Twitter title/description (boilerplate has only twitter:card, so
  // insert title+description right after it if not already present).
  if (seo.title && !/<meta\s+name="twitter:title"/i.test(out)) {
    out = out.replace(
      /(<meta\s+name="twitter:card"[^>]*>)/i,
      `$1\n    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    );
  }
  if (seo.description && !/<meta\s+name="twitter:description"/i.test(out)) {
    out = out.replace(
      /(<meta\s+name="twitter:card"[^>]*>)/i,
      `$1\n    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    );
  }

  return out;
}

/**
 * Vite plugin entrypoint. Hooks `transformIndexHtml` (runs for both dev
 * server requests and `vite build`). `enforce: 'pre'` runs the rewrite
 * before any user-provided HTML transforms.
 */
export function seoInjectPlugin(): Plugin {
  return {
    name: 'agentflow:seo-inject',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const root = ctx?.server?.config.root ?? process.cwd();
        const configPath = path.resolve(root, CONFIG_PATH);
        let source: string;
        try {
          source = fs.readFileSync(configPath, 'utf8');
        } catch (err) {
          this.warn?.(
            `[seo-inject] failed to read ${CONFIG_PATH}: ${
              err instanceof Error ? err.message : String(err)
            } — leaving head untouched`,
          );
          return html;
        }
        const seo = parseConfigSource(source);
        if (!seo.title && !seo.description && !seo.brandName && !seo.lang) {
          this.warn?.(
            `[seo-inject] no SEO fields parsed from ${CONFIG_PATH} — head left as-is`,
          );
          return html;
        }
        return applySeoToHtml(html, seo);
      },
    },
  };
}
