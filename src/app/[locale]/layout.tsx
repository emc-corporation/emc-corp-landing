import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Archivo, Manrope } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { LocaleProvider } from '@/components/LocaleProvider';
import { getOrganizationSchema } from '@/lib/structured-data';
import { Toaster } from '@/components/ui/Toaster';
import '../globals.css';

import ruMessages from '@/i18n/messages/ru.json';
import uzMessages from '@/i18n/messages/uz.json';
import enMessages from '@/i18n/messages/en.json';

const allMessages = { ru: ruMessages, uz: uzMessages, en: enMessages } as const;

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-archivo-var',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope-var',
  display: 'swap',
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://emc-corp.uz'),
    alternates: {
      canonical: `/${locale}`,
      languages: { ru: '/ru', uz: '/uz', en: '/en' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://emc-corp.uz/${locale}`,
      siteName: 'EMC',
      images: [{ url: '/images/emc-logo.png', width: 400, height: 134 }],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${archivo.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
      </head>
      <body>
        <LocaleProvider
          initialLocale={locale as 'ru' | 'uz' | 'en'}
          allMessages={allMessages}
        >
          {children}
          <Toaster />
        </LocaleProvider>
      </body>
    </html>
  );
}
