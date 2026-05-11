# Landing Boilerplate

Production-grade landing template used by [AgentFlow](https://agentflow.website) as the default scaffold for `kind=landing` projects. Vite 7 + React 19 + Tailwind CSS 4 + Framer Motion. Config-driven sections, three theme presets, i18n RU/EN, SEO + sitemap.

When the platform creates a landing project, it clones this repo into `/workspace` and an AI coder edits `src/config/landing.config.ts`. No section internals or atoms are touched. Result: design-grade landing in 10 minutes.

## Quick start

```bash
git clone https://github.com/lnlockly/landing-boilerplate.git my-landing
cd my-landing && rm -rf .git
cp .env.example .env
npm install
npm run dev
```

Edit `src/config/landing.config.ts`, then `npm run build` → static `dist/`.

## What is included

- 9 modular sections: Hero, Logos, Features, HowItWorks, Testimonials, Pricing, FAQ, CTA, Footer
- 3 theme presets: `cyberpunk`, `corporate`, `minimal`
- i18n via `?lang=en` URL param, localized strings as `{ ru, en }` objects
- SEO meta + Open Graph + sitemap.xml
- Forms with `react-hook-form` + `zod` validation
- Framer Motion scroll-triggered animations
- Lighthouse 90+ target

## Documentation

See [AGENTS.md](./AGENTS.md) for the full agent-facing guide — where to edit, recipes, and forbidden patterns.

## License

MIT
