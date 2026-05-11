import { describe, it, expect } from 'vitest';
import { landingConfigSchema } from '../src/config/schema';
import { config } from '../src/config/landing.config';

describe('landing.config.ts', () => {
  it('matches the schema', () => {
    const parsed = landingConfigSchema.safeParse(config);
    if (!parsed.success) {
      console.error(parsed.error.format());
    }
    expect(parsed.success).toBe(true);
  });

  it('has at least hero + footer + brand + seo', () => {
    expect(config.brand.name).toBeTruthy();
    expect(config.seo.title).toBeTruthy();
    expect(config.seo.description).toBeTruthy();
    expect(config.sections.hero.headline).toBeTruthy();
    expect(config.sections.footer.copyright).toBeTruthy();
  });

  it('has valid theme preset', () => {
    expect(['cyberpunk', 'corporate', 'minimal']).toContain(config.theme.preset);
  });
});
