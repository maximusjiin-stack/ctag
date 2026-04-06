import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CTAG LIFE',
  description: 'Carbon lifestyle tracking web demo built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
