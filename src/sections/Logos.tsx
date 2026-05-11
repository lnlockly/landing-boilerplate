import { motion } from 'framer-motion';
import { config } from '../config/landing.config';
import { useI18n } from '../i18n';

export default function Logos() {
  const { L } = useI18n();
  const sec = config.sections.logos;
  if (!sec) return null;
  return (
    <section className="py-16 px-6 md:px-10 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-mono uppercase tracking-widest text-[var(--muted)]">{L(sec.heading)}</p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-6 items-center justify-items-center"
        >
          {sec.items.map((logo) => (
            <a
              key={logo.name}
              href={logo.href || '#'}
              className="opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={logo.src}
                alt={logo.name}
                width="120"
                height="40"
                loading="lazy"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.outerHTML = `<span class="font-display font-bold text-lg text-[var(--muted)]">${logo.name}</span>`;
                }}
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
