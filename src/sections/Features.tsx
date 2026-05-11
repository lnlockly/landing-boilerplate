import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Card } from '../components/Card';
import { config } from '../config/landing.config';
import { useI18n } from '../i18n';

export default function Features() {
  const { L } = useI18n();
  const sec = config.sections.features;
  if (!sec) return null;
  return (
    <section id="features" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-6xl font-bold tracking-[-0.02em] text-balance"
          >
            {L(sec.heading)}
          </motion.h2>
          {sec.subhead && (
            <p className="mt-4 text-lg text-[var(--muted)]">{L(sec.subhead)}</p>
          )}
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sec.items.map((feat, i) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[feat.icon] || Icons.Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={i % 2 === 1 ? 'lg:mt-8' : ''}
              >
                <Card className="h-full">
                  <div className="size-12 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{L(feat.title)}</h3>
                  <p className="mt-2 text-[var(--muted)] leading-relaxed">{L(feat.description)}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
