import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export function Card({
  children,
  className,
  highlighted,
}: {
  children: ReactNode;
  className?: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-[var(--surface)]/60 backdrop-blur-sm p-6 transition-all duration-300',
        'hover:border-[var(--primary)]/40 hover:bg-[var(--surface)]',
        highlighted
          ? 'border-[var(--primary)]/50 shadow-2xl shadow-[var(--primary)]/10 ring-1 ring-[var(--primary)]/20'
          : 'border-[var(--border)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
