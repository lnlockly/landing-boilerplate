import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Accordion({ items }: { items: Array<{ q: ReactNode; a: ReactNode }> }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-[var(--primary)]"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-medium">{item.q}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--primary)]' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 text-[var(--muted)] leading-relaxed">{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
