import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--primary)] text-[var(--primary-fg)] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[var(--primary)]/20',
  secondary:
    'bg-transparent text-[var(--fg)] border border-[var(--border)] hover:bg-[var(--surface)] hover:border-[var(--primary)]/40',
  ghost: 'bg-transparent text-[var(--fg)] hover:bg-[var(--surface)]',
};

export const Button = forwardRef<HTMLElement, ButtonAsButton | ButtonAsAnchor>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => {
    const cls = cn(base, sizes[size], variants[variant], className);
    if ('href' in rest && rest.href) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
