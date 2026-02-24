import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import QueryClientProviderImpl from '@/common/utils/react-query/QueryClientProviderImpl';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
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
        className={`${notoSansKR.variable}`}
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
