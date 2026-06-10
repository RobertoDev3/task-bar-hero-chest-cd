import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, isLocale } from '../lib/i18n';

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  return getDictionary(lang).metadata;
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
