import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Task Bar Hero Chest CD',
  description: 'Controle de rota de farm de baus com cooldown.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body>{children}</body>
    </html>
  );
}
