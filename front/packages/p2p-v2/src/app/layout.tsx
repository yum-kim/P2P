import type { Metadata } from 'next';
import { Bebas_Neue } from 'next/font/google';
import './globals.css';

export const bebas = Bebas_Neue({
  variable: '--font-bebas',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'P2P-v2',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className="font-p2p-main antialiased min-h-screen">{children}</body>
    </html>
  );
};

export default RootLayout;
