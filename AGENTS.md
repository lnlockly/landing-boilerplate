# AGENTS.md

Read this first. This file is the entry point for AI agents working on this boilerplate.

## What this is

A **production landing boilerplate** for AgentFlow. When a user says «сделай мне лендинг для X», the platform clones this repo into `/workspace`, you edit `src/config/landing.config.ts`, drop assets into `public/`, run `npm run build`, and the Caddy preview sidecar serves `dist/`. Result: design-grade landing in 10 minutes, not an empty `<div id="root">`.

## Tech stack

- **Vite 7** + **React 19** + **TypeScript strict**
- **Tailwind CSS 4** (via `@tailwindcss/vite` plugin — NO postcss.config.js)
- **Framer Motion 11** (animations, scroll-triggered)
- **react-hook-form** + **zod** (forms with validation)
- **lucide-react** (icons; `feat.icon` is a Lucide component name)
- **vite-plugin-sitemap** (auto sitemap.xml)
- Static output → any static host (AgentFlow Caddy sidecar serves `/workspace/dist/`)

## Sections — what is included

| Key             | File                          | Description                                     |
|-----------------|-------------------------------|-------------------------------------------------|
| `hero`          | `src/sections/Hero.tsx`       | Full-viewport, animated mesh gradient, stats   |
| `logos`         | `src/sections/Logos.tsx`      | Trust strip, 6–8 logos                          |
| `features`      | `src/sections/Features.tsx`   | 3–6 feature cards with Lucide icon              |
| `how_it_works`  | `src/sections/HowItWorks.tsx` | 3–4 numbered steps                              |
| `testimonials`  | `src/sections/Testimonials.tsx`| 2–4 quotes with avatar                         |
| `pricing`       | `src/sections/Pricing.tsx`    | 1–4 tier cards with optional `highlighted`      |
| `faq`           | `src/sections/FAQ.tsx`        | Accordion, 5–10 Q&A                             |
| `cta`           | `src/sections/CTA.tsx`        | Repeat primary CTA + urgency element            |
| `footer`        | `src/sections/Footer.tsx`     | 3–4 columns + social + lang switcher            |

Hide a section: **omit the corresponding key** under `sections` in config. The renderer (`src/App.tsx`) skips missing sections.

## Quick start

```bash
git clone https://github.com/lnlockly/landing-boilerplate.git /workspace
cd /workspace && rm -rf .git
cp .env.example .env
npm install
npm run dev      # local dev on :5173
npm run build    # produces dist/
npm test         # validates landing.config.ts against the zod schema
```

After `npm run build` Caddy on `:8080` picks up `/workspace/dist/` automatically — no need to run `http-server` yourself.

## Where to edit

| You want to…                       | Edit this                                          |
|------------------------------------|----------------------------------------------------|
| 99% of customization               | `src/config/landing.config.ts`                     |
| Color palette                      | `config.theme.preset` (`cyberpunk` / `corporate` / `minimal`) or `config.theme.primary` |
| Images / logos / og:image          | drop files into `public/` and reference by path    |
| RU/EN copy keys (form labels etc.) | `src/i18n/ru.json`, `src/i18n/en.json`             |
| Add a new section type             | new file in `src/sections/`, register in `App.tsx` SECTIONS map, extend `src/config/schema.ts` |
| Add a new theme preset             | new file in `src/theme/`, add to `presets` in `src/theme/index.ts` |

## DO NOT edit (unless absolutely needed)

- `src/sections/*.tsx` — section internals. The brief never requires you to rewrite them; if you find yourself doing this, you are doing it wrong. Edit the config.
- `src/components/*.tsx` — atomic UI (Button, Card, Accordion, AnimatedGradient, ContactForm). Change visual style via theme vars (`--primary`, `--bg`, `--surface`, …), not by editing components.
- `src/theme/cyberpunk.ts | corporate.ts | minimal.ts` — pick a preset, don't fork unless you need a brand-new look.
- `src/index.css` — Tailwind v4 entry. **Single line `@import "tailwindcss";`** plus theme variables. Do NOT switch to v3 `@tailwind base; @tailwind components; @tailwind utilities;` — that breaks the build.
- `vite.config.ts` — already wired with `@tailwindcss/vite`, `@vitejs/plugin-react`, `vite-plugin-sitemap`. Don't touch unless adding a new plugin.

## Where to find platform-injected data

When the platform clones this boilerplate, it may pre-stage extras in `/workspace`:

```
/workspace/
  scraped/<source>.json     # output of scrape-* operators (TG channel, website, etc.)
  brief.md                  # original user brief
  refs/                     # reference images uploaded by the owner
  public/                   # platform-generated assets (avatars, hero, og-image)
```

In your code: `fetch('/scraped/<file>.json')` works at runtime if you `cp /workspace/scraped/*.json /workspace/public/scraped/` first.

## Recipes

### 1. Replace hero text

Edit `src/config/landing.config.ts`:

```ts
sections: {
  hero: {
    headline: { ru: 'Новый заголовок', en: 'New headline' },
    subhead: { ru: 'Новый подзаголовок', en: 'New subhead' },
    ...
  },
}
```

### 2. Switch palette to corporate

```ts
theme: { preset: 'corporate', primary: '#1e40af', dark: false }
```

### 3. Disable pricing

Omit the `pricing` key under `sections` entirely. The renderer hides it.

### 4. Change CTA target to a Telegram bot

```ts
cta: {
  action: 'telegram',
  telegram_bot: 'your_bot_username',
  primary_label: { ru: 'Открыть бота', en: 'Open the bot' }
}
```

For email: `action: 'email'`, set `VITE_CONTACT_ENDPOINT` in `.env`.
For phone: `action: 'phone', phone: '+79000000000'`.

### 5. Add a new feature card

Append to `sections.features.items`:

```ts
{ icon: 'Rocket', title: { ru: '…', en: '…' }, description: { ru: '…', en: '…' } }
```

`icon` must be a Lucide React export name (`Zap`, `Palette`, `Globe`, `Shield`, `Rocket`, `Sparkles`, …).

### 6. Custom OG image

1. Generate via `multimodal.image_generate` (1200×630).
2. Save as `public/og-image.jpg`.
3. Reference: `seo.og_image: '/og-image.jpg'`.

### 7. Add a new section

```ts
// src/sections/CaseStudies.tsx
export default function CaseStudies() { /* ... */ }
```

Then in `src/App.tsx`:

```ts
import CaseStudies from './sections/CaseStudies';
const SECTIONS = { ..., case_studies: CaseStudies } as const;
```

And extend `src/config/schema.ts` with a `caseStudiesSectionSchema` plus a `case_studies` key under `sections`. Update `landingConfigSchema.sections` and the `layoutKeySchema` enum.

## Forbidden patterns (acceptance gate fails)

- `<script src="https://cdn.tailwindcss.com">` — Tailwind CDN is banned. Use the `@tailwindcss/vite` plugin (already wired).
- Serving raw `src/main.tsx` in production — always `npm run build` and serve `dist/`.
- External `<img src="https://source.unsplash.com/…">` placeholders — generate real images via `multimodal.image_generate` and save under `public/`.
- 0 `<img>` tags / 0 `<a href>` CTAs in the rendered DOM — gate fails. The default config already includes hero image + CTAs; don't strip them.
- Generic filler text ("discover the power of", "modern landing premium") — bring real copy from the brief.
- Title still equal to `"Landing Boilerplate"`/`"Vite + React"` — `seo.title` MUST be branded. The static `dist/index.html` is rewritten at build time by `src/build/seo-inject-plugin.ts`, so the brand must come from `seo.title` in `landing.config.ts`; do NOT edit `index.html` directly.

## Pre-REPLY sanity check

Run before claiming done:

```bash
cd /workspace
npm run typecheck                                          # TS strict must pass
npm run build                                              # must succeed
ls -lh dist/assets/*.css | awk '{print $5,$9}'             # CSS must exist & be >5KB
grep -c '<img' dist/index.html dist/assets/*.js 2>/dev/null # >0 image refs
test -f dist/sitemap.xml && echo "sitemap ok"
```

## Brief analysis (always do this first)

Before writing code, write 3 lines:
- **Что просит юзер:** one-sentence paraphrase.
- **Hard requirements:** specific usernames / counts / sections from the brief.
- **План:** 3–7 bullet points with exact files to edit.

Then edit `landing.config.ts` and commit.

## Deploy

The platform runs `npm install && npm run build` automatically. Caddy serves `dist/` on `:8080`. **Do not** start your own http-server.

For standalone use (outside AgentFlow): see `.github/workflows/deploy.yml`. Self-hosted-runner deploy via `vars.DEPLOY_TARGET=self-hosted` + a tagged self-hosted runner with label `landing`.

## Knowledge sources

- Eliza-canonical preset format: presets live in `agentflow-agents/presets/<slug>.json`, knowledge files in `agentflow-agents/presets/_shared/*.md`. This boilerplate is the kind=landing default scaffold registered via `agent_boilerplates`.
- Memory anchors: `project_agentflow_presets_in_json.md`, `feedback_eliza_first.md`, `feedback_agentflow_use_ci.md`, `feedback_agentflow_no_project_specific_code.md`.
