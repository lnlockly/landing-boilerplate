/**
 * Unit tests for the SEO-inject Vite plugin. Cover the two pure helpers
 * (`parseConfigSource` + `applySeoToHtml`) — pulling the actual plugin
 * into a vitest run would require booting Vite, which we don't need
 * here.
 *
 * Regression scenario: the boilerplate's index.html has
 *   <title>Landing Boilerplate</title>
 *   <meta name="description" content="Production landing boilerplate" />
 * and the user-edited landing.config.ts has:
 *   seo: { title: 'Онлайн-школа рисования', description: '…' }
 * After the plugin runs the static HTML must reflect the config, NOT
 * the boilerplate placeholders.
 */
import { describe, it, expect } from 'vitest';
import {
  parseConfigSource,
  applySeoToHtml,
  escapeHtml,
  sliceObjectBlock,
  extractStringField,
} from '../src/build/seo-inject-plugin';

const SAMPLE_CONFIG = `import type { LandingConfig } from './schema';

export const config: LandingConfig = {
  lang: 'ru',
  brand: {
    name: 'Онлайн-школа рисования',
    tagline: 'Учим рисовать с нуля',
    logo: '/favicon.svg',
  },
  seo: {
    title: 'Онлайн-школа рисования — три тарифа',
    description:
      'Школа рисования онлайн с тремя тарифами. Старт, Стандарт и Премиум — выбирай свой темп.',
    og_image: '/og-image.jpg',
    site_url: 'https://example.com',
  },
  theme: { preset: 'cyberpunk', dark: true },
  cta: { action: 'telegram', telegram_bot: '__BOT__' },
  sections: {
    hero: {
      headline: { ru: 'Научим рисовать', en: 'Learn to draw' },
      subhead: { ru: 'За 8 недель', en: 'In 8 weeks' },
    },
    footer: {
      columns: [{ title: 'Контакты', links: [] }],
      copyright: '© 2026',
    },
  },
};
`;

const BOILERPLATE_INDEX_HTML = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0a0a0a" />

    <!-- These get rewritten at runtime from src/config/landing.config.ts SEO block -->
    <title>Landing Boilerplate</title>
    <meta name="description" content="Production landing boilerplate" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Landing Boilerplate" />
    <meta property="og:description" content="Production landing boilerplate" />
    <meta property="og:image" content="/og-image.jpg" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

describe('parseConfigSource', () => {
  it('extracts lang, brand.name, seo.title/description/og_image/site_url', () => {
    const out = parseConfigSource(SAMPLE_CONFIG);
    expect(out.lang).toBe('ru');
    expect(out.brandName).toBe('Онлайн-школа рисования');
    expect(out.title).toBe('Онлайн-школа рисования — три тарифа');
    expect(out.description).toMatch(/Школа рисования онлайн/);
    expect(out.ogImage).toBe('/og-image.jpg');
    expect(out.siteUrl).toBe('https://example.com');
  });

  it('returns empty object on malformed input', () => {
    const out = parseConfigSource('export const x = {};');
    expect(out).toEqual({});
  });

  it('handles single-quote escape inside string literal', () => {
    const cfg = `export const config = {
      lang: 'ru',
      brand: { name: 'Crowd\\'s favorite' },
      seo: { title: 'Foo', description: 'Bar' },
    };`;
    const out = parseConfigSource(cfg);
    expect(out.brandName).toBe("Crowd's favorite");
  });

  it('handles value on new line after colon (Prettier wraps long strings)', () => {
    const cfg = `export const config = {
      seo: {
        title: 'Short',
        description:
          'A very long string that Prettier broke onto its own line for readability.',
      },
    };`;
    const out = parseConfigSource(cfg);
    expect(out.description).toMatch(/A very long string/);
  });
});

describe('sliceObjectBlock', () => {
  it('returns the full balanced-brace block for a top-level key', () => {
    const block = sliceObjectBlock(SAMPLE_CONFIG, 'seo');
    expect(block).toBeTruthy();
    expect(block).toMatch(/title:\s*'/);
    expect(block).toMatch(/site_url:\s*'https:\/\/example\.com'/);
  });

  it('does not greedy-match past the closing brace', () => {
    const src = `brand: { name: 'A' },\n  seo: { title: 'B' },\n  theme: { preset: 'X' },`;
    const brand = sliceObjectBlock(src, 'brand');
    expect(brand).toBe("brand: { name: 'A' }");
  });

  it('returns null when key is missing', () => {
    expect(sliceObjectBlock("foo: 'bar'", 'seo')).toBeNull();
  });
});

describe('extractStringField', () => {
  it('reads single-quoted value', () => {
    expect(extractStringField("{ title: 'Hello' }", 'title')).toBe('Hello');
  });
  it('reads double-quoted value', () => {
    expect(extractStringField('{ title: "Hi" }', 'title')).toBe('Hi');
  });
  it('returns null on miss', () => {
    expect(extractStringField('{ foo: 1 }', 'title')).toBeNull();
  });
});

describe('escapeHtml', () => {
  it('escapes & < > " \'', () => {
    expect(escapeHtml(`a & b < c > d "e" 'f'`)).toBe(
      'a &amp; b &lt; c &gt; d &quot;e&quot; &#39;f&#39;',
    );
  });
});

describe('applySeoToHtml — full boilerplate replacement', () => {
  const seo = parseConfigSource(SAMPLE_CONFIG);
  const out = applySeoToHtml(BOILERPLATE_INDEX_HTML, seo);

  it('rewrites <title>', () => {
    expect(out).toContain('<title>Онлайн-школа рисования — три тарифа</title>');
    expect(out).not.toMatch(/<title>Landing Boilerplate<\/title>/);
  });

  it('rewrites <meta name="description">', () => {
    expect(out).toMatch(
      /<meta name="description" content="Школа рисования онлайн[^"]+"\s*\/?>/,
    );
    expect(out).not.toContain('Production landing boilerplate');
  });

  it('rewrites og:title and og:description', () => {
    expect(out).toMatch(
      /<meta property="og:title" content="Онлайн-школа рисования[^"]+"\s*\/?>/,
    );
    expect(out).toMatch(
      /<meta property="og:description" content="Школа рисования онлайн[^"]+"\s*\/?>/,
    );
  });

  it('preserves <html lang="ru">', () => {
    expect(out).toMatch(/<html lang="ru">/);
  });

  it('adds twitter:title and twitter:description after twitter:card', () => {
    expect(out).toMatch(
      /<meta name="twitter:card"[^>]*>\s*\n\s*<meta name="twitter:description"/,
    );
    expect(out).toMatch(/<meta name="twitter:title" content="Онлайн-школа/);
  });

  it('rewrites og:image when config provides one', () => {
    expect(out).toContain(
      '<meta property="og:image" content="/og-image.jpg" />',
    );
  });

  it('contains zero boilerplate sentinels after rewrite', () => {
    expect(out).not.toMatch(/Landing Boilerplate/);
    expect(out).not.toMatch(/Production landing boilerplate/);
  });
});

describe('applySeoToHtml — partial config', () => {
  it('leaves description untouched when config has only title', () => {
    const out = applySeoToHtml(BOILERPLATE_INDEX_HTML, { title: 'OnlyTitle' });
    expect(out).toContain('<title>OnlyTitle</title>');
    // description stays as boilerplate (sentinel gate will catch it
    // upstream, but the plugin must not crash on partial input)
    expect(out).toContain('Production landing boilerplate');
  });

  it('escapes special characters in injected values', () => {
    const out = applySeoToHtml(BOILERPLATE_INDEX_HTML, {
      title: 'A & B <c>',
      description: 'X "y" Z',
    });
    expect(out).toContain('<title>A &amp; B &lt;c&gt;</title>');
    expect(out).toMatch(
      /<meta name="description" content="X &quot;y&quot; Z"\s*\/?>/,
    );
  });

  it('changes <html lang> when config sets a different lang', () => {
    const out = applySeoToHtml(BOILERPLATE_INDEX_HTML, { lang: 'en' });
    expect(out).toMatch(/<html lang="en">/);
    expect(out).not.toMatch(/<html lang="ru">/);
  });
});
