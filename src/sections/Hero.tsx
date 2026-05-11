import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedGradient } from '../components/AnimatedGradient';
import { Button } from '../components/Button';
import { PrimaryCta } from '../components/ContactForm';
import { config } from '../config/landing.config';
import { useI18n } from '../i18n';

export default function Hero() {
  const { L } = useI18n();
  const sec = config.sections.hero;
  return (
    <section className="relative min-h-[88vh] flex items-center px-6 md:px-10 pt-24 pb-20 overflow-hidden">
      <AnimatedGradient />
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            {sec.eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur px-3 py-1 font-mono text-xs uppercase tracking-wider text-[var(--muted)]"
              >
                <span className="size-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                {L(sec.eyebrow)}
              </motion.div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-balance"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
            >
              {L(sec.headline)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg md:text-xl text-[var(--muted)] max-w-xl text-pretty"
            >
              {L(sec.subhead)}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <PrimaryCta label={L(config.cta.primary_label) || ''} />
              {config.cta.secondary_label && (
                <Button href="#features" variant="secondary" size="lg">
                  {L(config.cta.secondary_label)}
                  <ArrowRight size={18} />
                </Button>
              )}
            </motion.div>
            {sec.stats && sec.stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-14 flex flex-wrap gap-x-10 gap-y-6"
              >
                {sec.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="font-display text-3xl md:text-4xl font-bold tracking-tight">{stat.value}</div>
                    <div className="text-sm text-[var(--muted)] mt-1">{L(stat.label)}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--accent)]/10 blur-2xl" />
            {sec.image ? (
              <img
                src={sec.image}
                alt={config.brand.name}
                width="640"
                height="480"
                loading="eager"
                className="relative rounded-3xl border border-[var(--border)] shadow-2xl w-full aspect-[4/3] object-cover bg-[var(--surface)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur aspect-[4/3] flex items-center justify-center">
                <span className="font-mono text-sm text-[var(--muted)]">hero image goes here</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
