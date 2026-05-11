import type { LandingConfig } from './schema';

/**
 * EDIT THIS FILE TO CUSTOMIZE THE LANDING.
 *
 * 99% of customization happens here. Section components in src/sections/*
 * are pre-built — leave them alone unless adding a brand new section.
 *
 * Read /AGENTS.md for full recipes.
 */
export const config: LandingConfig = {
  lang: 'ru',
  brand: {
    name: 'BrandX',
    tagline: 'Опиши кратко чем занимается продукт',
    logo: '/favicon.svg',
  },
  seo: {
    title: 'BrandX — Производительная платформа нового поколения',
    description:
      'BrandX — конструктор лендингов, который собирает страницу за 10 минут вместо 10 дней. Готовые секции, дизайн-система, i18n.',
    og_image: '/og-image.jpg',
    site_url: 'https://example.com',
  },
  theme: {
    preset: 'cyberpunk',
    primary: '#a6f25c',
    dark: true,
  },
  cta: {
    action: 'telegram',
    telegram_bot: '__BOT__',
    primary_label: { ru: 'Попробовать бесплатно', en: 'Try for free' },
    secondary_label: { ru: 'Посмотреть демо', en: 'Watch demo' },
  },
  layout: ['hero', 'logos', 'features', 'how_it_works', 'testimonials', 'pricing', 'faq', 'cta', 'footer'],
  sections: {
    hero: {
      eyebrow: { ru: 'Запуск 2026', en: 'Launch 2026' },
      headline: {
        ru: 'Лендинги, которые продают, а не существуют',
        en: 'Landings that sell, not just exist',
      },
      subhead: {
        ru: 'Production-ready темплейт с готовыми секциями, дизайн-системой и i18n. Запуск — 10 минут вместо 10 дней.',
        en: 'Production-ready template with sections, design system and i18n. Ship in 10 minutes, not 10 days.',
      },
      image: '/hero.jpg',
      stats: [
        { value: '10×', label: { ru: 'быстрее запуск', en: 'faster launch' } },
        { value: '90+', label: { ru: 'Lighthouse score', en: 'Lighthouse score' } },
        { value: '3', label: { ru: 'theme presets', en: 'theme presets' } },
      ],
    },
    logos: {
      heading: { ru: 'Нам доверяют команды из', en: 'Trusted by teams at' },
      items: [
        { name: 'Acme', src: '/logos/acme.svg' },
        { name: 'Pluto', src: '/logos/pluto.svg' },
        { name: 'Nova', src: '/logos/nova.svg' },
        { name: 'Quark', src: '/logos/quark.svg' },
        { name: 'Orbit', src: '/logos/orbit.svg' },
        { name: 'Flux', src: '/logos/flux.svg' },
      ],
    },
    features: {
      heading: { ru: 'Что внутри', en: 'What is inside' },
      subhead: { ru: 'Всё что нужно для запуска воронки', en: 'Everything you need to launch' },
      items: [
        {
          icon: 'Zap',
          title: { ru: '10 минут до релиза', en: '10 minutes to ship' },
          description: { ru: 'Готовые секции, заполняешь только конфиг', en: 'Pre-built sections, just fill config' },
        },
        {
          icon: 'Palette',
          title: { ru: '3 design preset', en: '3 design presets' },
          description: { ru: 'Cyberpunk, Corporate, Minimal — один клик', en: 'Cyberpunk, Corporate, Minimal — one click' },
        },
        {
          icon: 'Globe',
          title: { ru: 'i18n из коробки', en: 'i18n out of the box' },
          description: { ru: 'RU/EN, легко добавить ещё', en: 'RU/EN, easy to add more' },
        },
        {
          icon: 'Gauge',
          title: { ru: 'Lighthouse 90+', en: 'Lighthouse 90+' },
          description: { ru: 'Lazy images, preload fonts, code-split', en: 'Lazy images, preload fonts, code-split' },
        },
        {
          icon: 'Sparkles',
          title: { ru: 'Анимации', en: 'Animations' },
          description: { ru: 'Framer Motion, scroll-triggered', en: 'Framer Motion, scroll-triggered' },
        },
        {
          icon: 'Shield',
          title: { ru: 'Type-safe конфиг', en: 'Type-safe config' },
          description: { ru: 'Zod schema валидирует на билде', en: 'Zod validates at build time' },
        },
      ],
    },
    how_it_works: {
      heading: { ru: 'Как это работает', en: 'How it works' },
      steps: [
        {
          title: { ru: 'Клонируйте темплейт', en: 'Clone the template' },
          description: { ru: 'git clone — и вы готовы', en: 'git clone — and you are ready' },
        },
        {
          title: { ru: 'Откройте landing.config.ts', en: 'Open landing.config.ts' },
          description: { ru: 'Один файл со всем контентом', en: 'A single file with all the content' },
        },
        {
          title: { ru: 'Подставьте контент бренда', en: 'Drop in your brand content' },
          description: { ru: 'Тексты, цвета, картинки', en: 'Copy, colors, images' },
        },
        {
          title: { ru: 'Deploy', en: 'Deploy' },
          description: { ru: 'npm run build → preview за минуту', en: 'npm run build → live in a minute' },
        },
      ],
    },
    testimonials: {
      heading: { ru: 'Что говорят клиенты', en: 'What clients say' },
      items: [
        {
          quote: {
            ru: 'Запустили лендинг под новый продукт за один вечер. Раньше тратили неделю.',
            en: 'Launched a landing for a new product in one evening. Used to take a week.',
          },
          author: 'Анна К.',
          role: { ru: 'CEO, SaaS-стартап', en: 'CEO, SaaS startup' },
          avatar: '/avatars/anna.jpg',
        },
        {
          quote: {
            ru: 'Скорость и дизайн — два редко совмещаемых качества. Здесь — оба.',
            en: 'Speed and design rarely come together. Here, they do.',
          },
          author: 'Михаил Р.',
          role: { ru: 'Дизайн-лид, маркетинг-агентство', en: 'Design lead, marketing agency' },
          avatar: '/avatars/mikhail.jpg',
        },
        {
          quote: {
            ru: 'Конфиг-первый подход — лучшее что случилось с лендингами за последние годы.',
            en: 'Config-first is the best thing to happen to landings in years.',
          },
          author: 'Дарья В.',
          role: { ru: 'Head of growth', en: 'Head of growth' },
          avatar: '/avatars/daria.jpg',
        },
      ],
    },
    pricing: {
      heading: { ru: 'Тарифы', en: 'Pricing' },
      subhead: { ru: 'Платите один раз — пользуйтесь навсегда', en: 'Pay once — use forever' },
      tiers: [
        {
          name: { ru: 'Старт', en: 'Starter' },
          price: { ru: '0 ₽', en: '$0' },
          period: { ru: '/ навсегда', en: '/ forever' },
          features: [
            { ru: '1 проект', en: '1 project' },
            { ru: 'Базовые секции', en: 'Basic sections' },
            { ru: 'Сообщество', en: 'Community support' },
          ],
          cta: { ru: 'Начать', en: 'Get started' },
        },
        {
          name: { ru: 'Pro', en: 'Pro' },
          price: { ru: '4 900 ₽', en: '$49' },
          period: { ru: '/ навсегда', en: '/ forever' },
          features: [
            { ru: 'Безлимит проектов', en: 'Unlimited projects' },
            { ru: 'Все темы и секции', en: 'All themes & sections' },
            { ru: 'Приоритетная поддержка', en: 'Priority support' },
            { ru: 'A/B-варианты', en: 'A/B variants' },
          ],
          cta: { ru: 'Купить', en: 'Buy now' },
          highlighted: true,
        },
        {
          name: { ru: 'Team', en: 'Team' },
          price: { ru: '19 900 ₽', en: '$199' },
          period: { ru: '/ навсегда', en: '/ forever' },
          features: [
            { ru: 'До 10 пользователей', en: 'Up to 10 seats' },
            { ru: 'White-label', en: 'White-label' },
            { ru: 'Менеджер аккаунта', en: 'Account manager' },
          ],
          cta: { ru: 'Связаться', en: 'Contact us' },
        },
      ],
    },
    faq: {
      heading: { ru: 'Частые вопросы', en: 'FAQ' },
      items: [
        {
          q: { ru: 'Нужен ли мне фронт-разработчик?', en: 'Do I need a frontend developer?' },
          a: {
            ru: 'Нет. Достаточно отредактировать один файл — landing.config.ts. Все секции уже собраны.',
            en: 'No. Just edit one file — landing.config.ts. All sections are pre-built.',
          },
        },
        {
          q: { ru: 'Можно ли поменять палитру?', en: 'Can I change the palette?' },
          a: {
            ru: 'Да. Установите config.theme.preset = "corporate" / "minimal" / "cyberpunk". Или передайте свой primary HEX.',
            en: 'Yes. Set config.theme.preset to "corporate" / "minimal" / "cyberpunk". Or override primary HEX.',
          },
        },
        {
          q: { ru: 'Где будет хостинг?', en: 'Where will it be hosted?' },
          a: {
            ru: 'Это статический сайт. Vercel, Netlify, любой статик-хост. AgentFlow деплоит в preview-домен автоматически.',
            en: 'Static site. Vercel, Netlify, any static host. AgentFlow auto-deploys to preview domain.',
          },
        },
        {
          q: { ru: 'Что с SEO?', en: 'What about SEO?' },
          a: {
            ru: 'Meta + OG + sitemap.xml генерируются автоматически из config.seo.',
            en: 'Meta + OG + sitemap.xml are generated automatically from config.seo.',
          },
        },
        {
          q: { ru: 'Можно использовать без AgentFlow?', en: 'Can I use it without AgentFlow?' },
          a: {
            ru: 'Конечно — это обычный Vite-проект. npm install && npm run build.',
            en: 'Of course — plain Vite. npm install && npm run build.',
          },
        },
      ],
    },
    cta: {
      heading: { ru: 'Запустите свой лендинг сегодня', en: 'Launch your landing today' },
      subhead: { ru: 'Без боли. Без дизайнера. Без верстальщика.', en: 'No pain. No designer. No coder.' },
      urgency: { ru: 'Только до конца месяца — Pro за полцены', en: 'Until end of month — Pro 50% off' },
    },
    footer: {
      columns: [
        {
          title: { ru: 'Продукт', en: 'Product' },
          links: [
            { label: { ru: 'Возможности', en: 'Features' }, href: '#features' },
            { label: { ru: 'Тарифы', en: 'Pricing' }, href: '#pricing' },
            { label: { ru: 'FAQ', en: 'FAQ' }, href: '#faq' },
          ],
        },
        {
          title: { ru: 'Компания', en: 'Company' },
          links: [
            { label: { ru: 'О нас', en: 'About' }, href: '/about' },
            { label: { ru: 'Контакты', en: 'Contact' }, href: '/contact' },
          ],
        },
        {
          title: { ru: 'Юридическое', en: 'Legal' },
          links: [
            { label: { ru: 'Политика', en: 'Privacy' }, href: '/privacy' },
            { label: { ru: 'Условия', en: 'Terms' }, href: '/terms' },
          ],
        },
      ],
      social: [
        { kind: 'telegram', href: 'https://t.me/__BOT__' },
        { kind: 'github', href: 'https://github.com/lnlockly' },
        { kind: 'twitter', href: 'https://twitter.com' },
      ],
      copyright: { ru: '© 2026 BrandX. Все права защищены.', en: '© 2026 BrandX. All rights reserved.' },
    },
  },
};
