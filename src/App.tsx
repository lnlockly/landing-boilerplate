import { config } from './config/landing.config';
import { I18nProvider } from './i18n';
import Hero from './sections/Hero';
import Logos from './sections/Logos';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

const SECTIONS = {
  hero: Hero,
  logos: Logos,
  features: Features,
  how_it_works: HowItWorks,
  testimonials: Testimonials,
  pricing: Pricing,
  faq: FAQ,
  cta: CTA,
  footer: Footer,
} as const;

export default function App() {
  const order = config.layout ?? [
    'hero',
    'logos',
    'features',
    'how_it_works',
    'testimonials',
    'pricing',
    'faq',
    'cta',
    'footer',
  ];

  return (
    <I18nProvider config={config}>
      <main className="min-h-screen overflow-x-hidden">
        {order.map((key) => {
          const Section = SECTIONS[key];
          if (!Section) return null;
          if (key !== 'hero' && key !== 'footer' && !(config.sections as Record<string, unknown>)[key]) return null;
          return <Section key={key} />;
        })}
      </main>
    </I18nProvider>
  );
}
