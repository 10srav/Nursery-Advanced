'use client';

import { useEffect, useRef, useState } from 'react';
import { Instagram, Twitter, Youtube, ArrowUpRight, Send } from 'lucide-react';
import { FOOTER_COLS } from '@/lib/constants';
import { Logo } from '@/components/shared/illustrations/logo';
import { Leaf } from '@/components/shared/illustrations/leaf';
import { cn } from '@/lib/utils';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function Footer() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const year = new Date().getUTCFullYear();

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setState('error');
      setErrorMessage('Enter an email to subscribe.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setState('error');
      setErrorMessage("That email doesn't look quite right.");
      return;
    }

    setState('success');
    setErrorMessage(null);

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setEmail('');
      setState('idle');
    }, 2600);
  };

  const isSuccess = state === 'success';
  const isError = state === 'error';

  return (
    <footer className="relative mt-24 overflow-hidden">
      <div aria-hidden className="absolute left-0 right-0 top-0 -translate-y-1/2">
        <svg
          viewBox="0 0 1440 120"
          className="h-12 w-full sm:h-20 lg:h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80 Q360 20 720 60 T1440 40 L1440 120 L0 120 Z"
            fill="#052E16"
          />
        </svg>
      </div>

      <div className="relative bg-forest-950 text-mint-50">
        <Leaf
          variant="monstera"
          className="pointer-events-none absolute -right-12 top-20 h-72 w-auto opacity-10"
          fill="#4ADE80"
          accent="#4ADE80"
        />
        <Leaf
          variant="frond"
          className="pointer-events-none absolute -left-12 bottom-0 h-64 w-auto opacity-10"
          fill="#4ADE80"
          accent="#4ADE80"
        />

        <div className="container relative py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Logo className="text-mint-50 [&_span]:text-mint-50" />
              <p className="mt-5 max-w-sm text-base leading-relaxed text-mint-50/85">
                Living plants, nursery-raised for 180+ days. Paired with a care
                plan tuned to your light, water, and rhythm.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 flex max-w-md flex-col gap-2">
                <label
                  htmlFor="newsletter"
                  className="text-xs font-medium uppercase tracking-widest text-mint-50/75"
                >
                  Weekly dispatch
                </label>
                <div className={cn(
                  'group relative flex items-center rounded-full border bg-white/5 backdrop-blur-sm transition-all duration-300',
                  isError
                    ? 'border-bloom-400 focus-within:border-bloom-400'
                    : 'border-white/25 focus-within:border-white/45 focus-within:bg-white/10',
                )}>
                  <input
                    id="newsletter"
                    type="email"
                    autoComplete="email"
                    required
                    aria-describedby="newsletter-hint newsletter-status"
                    aria-invalid={isError}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (isError) {
                        setState('idle');
                        setErrorMessage(null);
                      }
                    }}
                    placeholder="you@garden.com"
                    className="h-14 w-full flex-1 rounded-full bg-transparent px-6 text-sm text-mint-50 placeholder:text-mint-50/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    disabled={isSuccess}
                    className={cn(
                      'mr-1.5 flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950',
                      isSuccess
                        ? 'bg-bloom-700 text-white focus-visible:ring-bloom-400'
                        : 'bg-mint-50 text-forest-900 hover:bg-mint-100 focus-visible:ring-mint-50',
                    )}
                  >
                    {isSuccess ? 'Subscribed' : 'Join'}
                    <Send className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
                <p id="newsletter-hint" className="text-xs text-mint-50/70">
                  Care tips, new arrivals, the occasional plant poem. No spam.
                </p>
                <p
                  id="newsletter-status"
                  aria-live="polite"
                  className={cn(
                    'text-xs transition-opacity',
                    isError ? 'text-bloom-300' : 'sr-only',
                  )}
                >
                  {errorMessage ?? ''}
                </p>
              </form>

              <div className="mt-10 flex items-center gap-3">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Youtube, label: 'YouTube' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-mint-50/90 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-mint-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-50 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
              {FOOTER_COLS.map((col) => (
                <div key={col.title}>
                  <h4 className="text-xs font-medium uppercase tracking-widest text-mint-50/80">
                    {col.title}
                  </h4>
                  <ul className="mt-5 flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-sm text-mint-50/90 transition-colors cursor-pointer hover:text-mint-50 focus-visible:outline-none focus-visible:underline"
                        >
                          <span className="transition-transform duration-300 ease-liquid group-hover:translate-x-0.5">
                            {link.label}
                          </span>
                          <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 ease-liquid group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-xs text-mint-50/70 sm:flex-row sm:items-center">
            <p>© {year} Verdant Botanical Co. — Grown slow, shipped alive.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="cursor-pointer transition-colors hover:text-mint-50">Privacy</a>
              <a href="#" className="cursor-pointer transition-colors hover:text-mint-50">Terms</a>
              <a href="#" className="cursor-pointer transition-colors hover:text-mint-50">Sustainability</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
