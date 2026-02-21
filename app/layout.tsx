import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryClientProviderImpl from '@/common/utils/react-query/QueryClientProviderImpl';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'cdri-books-김영우',
  description: 'CDRI Frontend 지원자 김영우 과제 테스트입니다. (작업기간: 2026.02.20 ~ 02.26)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="root">
          <QueryClientProviderImpl>
            {children}
          </QueryClientProviderImpl>
        </div>
      </body>
    </html>
  );
}
