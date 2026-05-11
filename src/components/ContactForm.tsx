import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18n } from '../i18n';
import { Button } from './Button';
import { config } from '../config/landing.config';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const { t } = useI18n();
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setState('sending');
    try {
      const endpoint = config.cta.email_endpoint || import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('bad status');
      setState('sent');
      reset();
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return <p className="text-[var(--primary)] font-medium py-4">{t('form.success')}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('name')}
          placeholder={t('form.name_placeholder')}
          className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--fg)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none transition"
        />
        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder={t('form.email_placeholder')}
          className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--fg)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none transition"
        />
        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <textarea
          {...register('message')}
          placeholder={t('form.message_placeholder')}
          rows={4}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--fg)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none transition"
        />
        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" disabled={state === 'sending'} className="w-full">
        {state === 'sending' ? t('form.sending') : t('form.submit')}
      </Button>
      {state === 'error' && <p className="text-sm text-red-400">{t('form.error')}</p>}
    </form>
  );
}

export function PrimaryCta({ label, className }: { label: string; className?: string }) {
  const { t } = useI18n();
  if (config.cta.action === 'telegram') {
    const bot = config.cta.telegram_bot || import.meta.env.VITE_TELEGRAM_BOT || '__BOT__';
    return (
      <Button href={`https://t.me/${bot}?start=lead-from-landing`} size="lg" className={className}>
        {label || t('cta.telegram')}
      </Button>
    );
  }
  if (config.cta.action === 'phone') {
    return (
      <Button href={`tel:${config.cta.phone}`} size="lg" className={className}>
        {label || t('cta.phone')}
      </Button>
    );
  }
  return (
    <Button href="#contact" size="lg" className={className}>
      {label || t('cta.email')}
    </Button>
  );
}
