import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Card } from '../components/Card';
import { config } from '../config/landing.config';
import { useI18n } from '../i18n';

export default function Testimonials() {
  const { L } = useI18n();
  const sec = config.sections.testimonials;
  if (!sec) return null;
  return (
    <section className="py-24 md:py-32 px-6 md:px-10">
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
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sec.items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full flex flex-col">
                <Quote size={28} className="text-[var(--primary)]/60" />
                <p className="mt-4 text-lg leading-relaxed text-pretty flex-1">{L(t.quote)}</p>
                <div className="mt-6 flex items-center gap-3">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.author}
                      width="40"
                      height="40"
                      loading="lazy"
                      className="size-10 rounded-full border border-[var(--border)] object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="size-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center font-medium text-sm">
                      {t.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{t.author}</div>
                    <div className="text-sm text-[var(--muted)]">{L(t.role)}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
