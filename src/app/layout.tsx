// src/app/layout.tsx
import '../styles/global.css';
import '@worldcoin/mini-apps-ui-kit-react/styles.css';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientProviders from '@/providers';
import type { ReactNode } from 'react';


const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'Kronos Airdrop',
  description: 'Mini app para World App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // session puede manejarse dentro de ClientProviders
  const dummySession = null;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 text-gray-900`}>
        <ClientProviders session={dummySession}>
          <div className="min-h-screen flex flex-col">{children}</div>
        </ClientProviders>
      </body>
    </html>
  );
}
