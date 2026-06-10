import { notFound } from 'next/navigation';
import FarmDashboard from '../farm-dashboard';
import { getDictionary, isLocale, locales } from '../lib/i18n';

export function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return <FarmDashboard dict={getDictionary(lang)} locale={lang} />;
}
