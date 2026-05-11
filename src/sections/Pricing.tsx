import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { config } from '../config/landing.config';
import { useI18n } from '../i18n';

export default function Pricing() {
  const { L } = useI18n();
  const sec = config.sections.pricing;
  if (!sec) return null;
  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-6xl font-bold tracking-[-0.02em] text-balance"
          >
            {L(sec.heading)}
          </motion.h2>
          {sec.subhead && <p className="mt-4 text-lg text-[var(--muted)]">{L(sec.subhead)}</p>}
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {sec.tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={tier.highlighted ? 'lg:-my-4' : ''}
            >
              <Card highlighted={tier.highlighted} className="h-full flex flex-col">
                <h3 className="font-display text-xl font-semibold">{L(tier.name)}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold tracking-tight">{L(tier.price)}</span>
                  {tier.period && <span className="text-[var(--muted)]">{L(tier.period)}</span>}
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />
                      <span>{L(feat)}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.highlighted ? 'primary' : 'secondary'}
                  size="md"
                  className="mt-8 w-full"
                  href="#cta"
                >
                  {L(tier.cta)}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
