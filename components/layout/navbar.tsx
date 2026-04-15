'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { Logo } from '@/components/shared/illustrations/logo';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

const SCROLL_SOLID_THRESHOLD = 80;
const SCROLL_TRANSPARENT_THRESHOLD = 48;

export function Navbar() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    // hysteresis — avoid oscillation on borderline scroll
    setScrolled((prev) =>
      prev ? v > SCROLL_TRANSPARENT_THRESHOLD : v > SCROLL_SOLID_THRESHOLD,
    );
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -40, opacity: 0 }}
        animate={reduced ? undefined : { y: 0, opacity: 1 }}
        transition={reduced ? undefined : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={cn(
          'fixed left-3 right-3 top-3 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ease-liquid',
          scrolled
            ? 'border border-white/70 bg-white/75 shadow-[0_10px_30px_-10px_rgba(20,83,45,0.25)] backdrop-blur-xl'
            : 'border border-transparent bg-transparent',
        )}
      >
        <a
          href="/"
          aria-label="Verdant — home"
          className="flex items-center pl-2 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2"
        >
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-4 py-2 text-sm font-medium text-forest-900/85 transition-colors cursor-pointer hover:text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2"
            >
              <span className="relative z-10">{l.label}</span>
              <span aria-hidden className="absolute inset-0 scale-90 rounded-full bg-forest-900/5 opacity-0 transition-all duration-300 ease-liquid group-hover:scale-100 group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-forest-900/85 transition-colors cursor-pointer hover:bg-forest-900/5 hover:text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 md:inline-flex"
          >
            <Search className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Cart, 2 items"
            className="relative hidden h-11 w-11 items-center justify-center rounded-full text-forest-900/85 transition-colors cursor-pointer hover:bg-forest-900/5 hover:text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 md:inline-flex"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden />
            <span aria-hidden className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-bloom-500" />
            <span className="sr-only">2 items in cart</span>
          </button>
          <Button size="sm" className="ml-1 hidden md:inline-flex" variant="default">
            Shop now
          </Button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/70 backdrop-blur-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 md:hidden"
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        id="mobile-menu"
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
          className="absolute inset-0 h-full w-full bg-forest-950/30 backdrop-blur-sm cursor-pointer"
        />
        <motion.nav
          aria-label="Mobile primary"
          initial={false}
          animate={{ y: open ? 0 : -40, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-3 right-3 top-20 rounded-3xl border border-white/60 bg-white/90 p-6 shadow-glass backdrop-blur-xl"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="block rounded-2xl px-4 py-3 text-base font-medium text-forest-900 transition-colors cursor-pointer hover:bg-forest-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <Button className="flex-1" tabIndex={open ? 0 : -1}>
              Shop now
            </Button>
            <Button
              variant="glass"
              size="icon"
              aria-label="Cart, 2 items"
              tabIndex={open ? 0 : -1}
            >
              <ShoppingBag className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </motion.nav>
      </motion.div>
    </>
  );
}
