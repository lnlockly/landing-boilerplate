import { motion } from 'framer-motion';
import { AnimatedGradient } from '../components/AnimatedGradient';
import { PrimaryCta } from '../components/ContactForm';
import { config } from '../config/landing.config';
import { useI18n } from '../i18n';

export default function CTA() {
  const { L } = useI18n();
  const sec = config.sections.cta;
  if (!sec) return null;
  return (
    <section id="cta" className="relative py-32 md:py-40 px-6 md:px-10 overflow-hidden border-y border-[var(--border)]">
      <AnimatedGradient />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-[-0.03em] text-balance leading-[0.95]">
          {L(sec.heading)}
        </h2>
        {sec.subhead && (
          <p className="mt-6 text-xl text-[var(--muted)] max-w-xl mx-auto">{L(sec.subhead)}</p>
        )}
        {sec.urgency && (
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)]">
            <span className="size-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            {L(sec.urgency)}
          </div>
        )}
        <div className="mt-10 flex justify-center">
          <PrimaryCta label={L(config.cta.primary_label) || ''} />
        </div>
      </motion.div>
    </section>
  );
}
