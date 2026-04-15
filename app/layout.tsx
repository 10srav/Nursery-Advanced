import type { Metadata, Viewport } from 'next';
import { SmoothScrollProvider } from '@/components/shared/smooth-scroll-provider';
import { ScrollProgress } from '@/components/shared/scroll-progress';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://verdant.example',
  ),
  title: {
    default: 'Verdant — Your home, in conversation with the forest',
    template: '%s · Verdant',
  },
  description:
    'Living plants, nursery-raised for 180+ days. Paired with a care plan tuned to your light, water, and rhythm.',
  keywords: [
    'plants',
    'nursery',
    'indoor plants',
    'monstera',
    'fiddle leaf',
    'orchid',
    'plant care',
    'botanical',
  ],
  authors: [{ name: 'Verdant' }],
  alternates: { canonical: '/', languages: { 'en-US': '/' } },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Verdant',
    title: 'Verdant — Your home, in conversation with the forest',
    description:
      'Living plants, nursery-raised for 180+ days. Paired with a care plan tuned to your light, water, and rhythm.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verdant — Your home, in conversation with the forest',
    description:
      'Living plants, nursery-raised for 180+ days. Paired with a care plan tuned to your light, water, and rhythm.',
  },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F0FDF4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
        />
      </head>
      <body className="relative min-h-screen bg-mint font-sans text-forest-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-mint-50 focus:shadow-lift focus:outline-none"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <SmoothScrollProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
