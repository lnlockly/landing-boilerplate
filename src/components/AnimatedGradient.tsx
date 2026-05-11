export function AnimatedGradient({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute -top-1/4 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full opacity-40 blur-3xl animate-float-slow"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, var(--gradient-from, #a6f25c), transparent 50%), radial-gradient(circle at 70% 70%, var(--gradient-via, #38bdf8), transparent 50%), radial-gradient(circle at 50% 50%, var(--gradient-to, #a855f7), transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[50vh] w-[50vw] rounded-full opacity-20 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, var(--accent, #38bdf8), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </div>
  );
}
