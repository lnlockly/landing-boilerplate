import { z } from 'zod';

/**
 * Schema for src/config/landing.config.ts.
 *
 * All user-facing text is a Localized string — either a plain string
 * (uses default lang) or an object { ru, en, ... } keyed by lang code.
 */

export const localizedSchema = z.union([
  z.string(),
  z.record(z.string(), z.string()),
]);

export type Localized = z.infer<typeof localizedSchema>;

export const themeSchema = z.object({
  preset: z.enum(['cyberpunk', 'corporate', 'minimal']),
  primary: z.string().optional(),
  dark: z.boolean().optional(),
  font: z.string().optional(),
});

export const ctaActionSchema = z.object({
  action: z.enum(['email', 'telegram', 'phone']),
  email_endpoint: z.string().optional(),
  telegram_bot: z.string().optional(),
  phone: z.string().optional(),
  primary_label: localizedSchema.optional(),
  secondary_label: localizedSchema.optional(),
});

export const heroSectionSchema = z.object({
  eyebrow: localizedSchema.optional(),
  headline: localizedSchema,
  subhead: localizedSchema,
  image: z.string().optional(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label: localizedSchema,
      }),
    )
    .optional(),
});

export const logosSectionSchema = z.object({
  heading: localizedSchema,
  items: z.array(
    z.object({
      name: z.string(),
      src: z.string(),
      href: z.string().optional(),
    }),
  ),
});

export const featuresSectionSchema = z.object({
  heading: localizedSchema,
  subhead: localizedSchema.optional(),
  items: z.array(
    z.object({
      icon: z.string(),
      title: localizedSchema,
      description: localizedSchema,
    }),
  ),
});

export const howItWorksSectionSchema = z.object({
  heading: localizedSchema,
  steps: z.array(
    z.object({
      title: localizedSchema,
      description: localizedSchema,
      image: z.string().optional(),
    }),
  ),
});

export const testimonialsSectionSchema = z.object({
  heading: localizedSchema,
  items: z.array(
    z.object({
      quote: localizedSchema,
      author: z.string(),
      role: localizedSchema,
      avatar: z.string().optional(),
    }),
  ),
});

export const pricingSectionSchema = z.object({
  heading: localizedSchema,
  subhead: localizedSchema.optional(),
  tiers: z.array(
    z.object({
      name: localizedSchema,
      price: localizedSchema,
      period: localizedSchema.optional(),
      features: z.array(localizedSchema),
      cta: localizedSchema,
      highlighted: z.boolean().optional(),
    }),
  ),
});

export const faqSectionSchema = z.object({
  heading: localizedSchema,
  items: z.array(
    z.object({
      q: localizedSchema,
      a: localizedSchema,
    }),
  ),
});

export const ctaSectionSchema = z.object({
  heading: localizedSchema,
  subhead: localizedSchema.optional(),
  urgency: localizedSchema.optional(),
});

export const footerSectionSchema = z.object({
  columns: z.array(
    z.object({
      title: localizedSchema,
      links: z.array(
        z.object({
          label: localizedSchema,
          href: z.string(),
        }),
      ),
    }),
  ),
  social: z
    .array(
      z.object({
        kind: z.enum(['telegram', 'github', 'twitter', 'youtube', 'instagram', 'linkedin', 'email']),
        href: z.string(),
      }),
    )
    .optional(),
  copyright: localizedSchema,
});

export const layoutKeySchema = z.enum([
  'hero',
  'logos',
  'features',
  'how_it_works',
  'testimonials',
  'pricing',
  'faq',
  'cta',
  'footer',
]);

export type LayoutKey = z.infer<typeof layoutKeySchema>;

export const landingConfigSchema = z.object({
  lang: z.string().default('ru'),
  brand: z.object({
    name: z.string(),
    tagline: localizedSchema.optional(),
    logo: z.string().optional(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    og_image: z.string().optional(),
    site_url: z.string().optional(),
  }),
  theme: themeSchema,
  cta: ctaActionSchema,
  layout: z.array(layoutKeySchema).optional(),
  sections: z.object({
    hero: heroSectionSchema,
    logos: logosSectionSchema.optional(),
    features: featuresSectionSchema.optional(),
    how_it_works: howItWorksSectionSchema.optional(),
    testimonials: testimonialsSectionSchema.optional(),
    pricing: pricingSectionSchema.optional(),
    faq: faqSectionSchema.optional(),
    cta: ctaSectionSchema.optional(),
    footer: footerSectionSchema,
  }),
});

export type LandingConfig = z.infer<typeof landingConfigSchema>;
