'use client';

import './globals.css';
import Script from 'next/script'
import PillNav from '@/components/PillNav';
import GraphyFooter from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ClarityProvider from '@/components/ClarityProvider';
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { jetbrainsMono, poppins } from '@/app/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Sarwagyna Pvt Ltd." />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Sarwagyna Pvt Ltd.',
              alternateName: 'Sarwagyna',
              url: 'https://sarwagyna.com',
              logo: 'https://sarwagyna.com/favicon.svg',
              description:
                'Sarwagyna is India\'s next-gen multi-industry company with a 20+ member team delivering enterprise-grade AI solutions, strategic holdings, and scalable SaaS products.',
              numberOfEmployees: {
                '@type': 'QuantitativeValue',
                minValue: 20,
              },
            }),
          }}
        />
      </head>

      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C3690ECPQR"
          strategy="afterInteractive"
        />

        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C3690ECPQR');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7266890598523714"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
        <ClarityProvider />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Handle hash scrolling
    const hash = window.location.hash?.replace('#', '');
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  // Keep Sanity Studio free of marketing-site chrome and brand text colors
  if (pathname?.startsWith('/blogstudio')) {
    return (
      <div id="sanity-studio-root" className="min-h-screen bg-[#101112] text-white">
        {children}
      </div>
    );
  }

  return (
    <div className="site-shell min-h-screen flex flex-col font-sans bg-bg text-text dark:bg-bg-dark dark:text-white relative selection:bg-white/20 transition-colors duration-300">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg">Skip to content</a>
      {/* Secondary Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none dark:bg-[#050509] bg-black/5 opacity-20 transition-colors duration-300" />

      {/* Ambient Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="orb-bg" />

        {/* SVG Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Mandala / Lotus SVG Accents */}
        <div className="absolute -top-40 -right-32 w-80 h-80 opacity-[0.08] dark:opacity-[0.12] mix-blend-soft-light">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g stroke="rgba(107,127,191,0.8)" strokeWidth="0.6" fill="none">
              <circle cx="100" cy="100" r="60" />
              <circle cx="100" cy="100" r="40" />
              <circle cx="100" cy="100" r="20" />
              <path d="M100 30 Q115 60 140 70 Q115 80 100 110 Q85 80 60 70 Q85 60 100 30Z" />
              <path d="M100 50 Q110 70 125 75 Q110 80 100 100 Q90 80 75 75 Q90 70 100 50Z" />
            </g>
          </svg>
        </div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 opacity-[0.10] dark:opacity-[0.16] mix-blend-soft-light">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g stroke="rgba(232,98,26,0.75)" strokeWidth="0.6" fill="none">
              <circle cx="100" cy="100" r="55" />
              <circle cx="100" cy="100" r="35" />
              <path d="M100 35 Q125 65 150 90 Q125 95 100 135 Q75 95 50 90 Q75 65 100 35Z" />
              <path d="M100 65 Q115 85 135 95 Q115 100 100 125 Q85 100 65 95 Q85 85 100 65Z" />
            </g>
          </svg>
        </div>
      </div>

      {pathname !== '/links' && (
        <PillNav
          logo="/favicon.svg"
          logoFull="/logo.svg"
          logoAlt="Sarwagyna Logo"
          items={[
            { label: 'Home', href: '/' },
            { label: 'AI & IT', href: '/ai-it' },
            { label: 'About', href: '/holding-company' },
            { label: 'Products', href: '/products' },
            { label: 'Events', href: '/events' },
            { label: 'Blog', href: '/blog' },
            { label: 'Careers', href: '/careers' },
            { label: 'Contact', href: '/contact' }
          ]}
          activeHref={pathname ?? undefined}
          baseColor="#000000"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
          ease="power2.easeOut"
          initialLoadAnimation
        />
      )}
      <main id="main-content" className="grow relative z-10">
        {children}
      </main>
      {/* Footer */}
      {pathname !== '/links' && (
        <div className="relative z-10" style={{ color: '#0D1F1A' }}>
          <GraphyFooter />
        </div>
      )}
    </div>
  );
}
