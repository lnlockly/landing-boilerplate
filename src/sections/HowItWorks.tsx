import { motion } from 'framer-motion';
import { config } from '../config/landing.config';
import { useI18n } from '../i18n';

export default function HowItWorks() {
  const { L } = useI18n();
  const sec = config.sections.how_it_works;
  if (!sec) return null;
  return (
    <section id="how" className="py-24 md:py-32 px-6 md:px-10 bg-[var(--surface)]/40 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl font-bold tracking-[-0.02em] text-balance max-w-2xl"
        >
          {L(sec.heading)}
        </motion.h2>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sec.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="font-mono text-sm text-[var(--primary)] mb-3">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">{L(step.title)}</h3>
              <p className="mt-2 text-[var(--muted)] leading-relaxed">{L(step.description)}</p>
              {i < sec.steps.length - 1 && (
                <div className="hidden lg:block absolute top-2 -right-4 h-px w-8 bg-gradient-to-r from-[var(--primary)]/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
