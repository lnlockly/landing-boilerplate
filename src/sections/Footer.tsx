import { Github, Send, Twitter, Youtube, Instagram, Linkedin, Mail } from 'lucide-react';
import { config } from '../config/landing.config';
import { useI18n } from '../i18n';

const socialIcons = {
  telegram: Send,
  github: Github,
  twitter: Twitter,
  youtube: Youtube,
  instagram: Instagram,
  linkedin: Linkedin,
  email: Mail,
};

export default function Footer() {
  const { L, lang, setLang } = useI18n();
  const sec = config.sections.footer;
  return (
    <footer className="py-16 px-6 md:px-10 border-t border-[var(--border)] bg-[var(--surface)]/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.5fr_repeat(3,1fr)] gap-10">
          <div>
            <div className="flex items-center gap-2">
              {config.brand.logo && (
                <img src={config.brand.logo} alt={config.brand.name} width="32" height="32" className="size-8" />
              )}
              <span className="font-display text-xl font-bold tracking-tight">{config.brand.name}</span>
            </div>
            {config.brand.tagline && (
              <p className="mt-3 text-sm text-[var(--muted)] max-w-xs">{L(config.brand.tagline)}</p>
            )}
            <div className="mt-6 flex gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLang('ru')}
                className={lang === 'ru' ? 'text-[var(--primary)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'}
              >
                RU
              </button>
              <span className="text-[var(--muted)]">/</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={lang === 'en' ? 'text-[var(--primary)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'}
              >
                EN
              </button>
            </div>
          </div>
          {sec.columns.map((col, i) => (
            <div key={i}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--fg)]">{L(col.title)}</h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                      {L(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <p className="text-xs text-[var(--muted)]">{L(sec.copyright)}</p>
          {sec.social && (
            <div className="flex gap-3">
              {sec.social.map((s, i) => {
                const Icon = socialIcons[s.kind];
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.kind}
                    className="size-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
