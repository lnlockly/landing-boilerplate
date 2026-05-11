import { motion } from 'framer-motion';
import { Accordion } from '../components/Accordion';
import { config } from '../config/landing.config';
import { useI18n } from '../i18n';

export default function FAQ() {
  const { L } = useI18n();
  const sec = config.sections.faq;
  if (!sec) return null;
  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl font-bold tracking-[-0.02em] text-balance"
        >
          {L(sec.heading)}
        </motion.h2>
        <div className="mt-12">
          <Accordion items={sec.items.map((it) => ({ q: L(it.q), a: L(it.a) }))} />
        </div>
      </div>
    </section>
  );
}
