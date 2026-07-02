// @ts-nocheck
import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'AirPure X - Máy Lọc Không Khí Cầm Tay Thông Minh | HELICORP',
  description: 'AirPure X bơi HELICORP mang lại luồng khí sạch chuẩn lâm sàng y khoa nhờ bộ lọc HEPA H13 và Plasma Ion di động mọi nơi.',
  keywords: ['AirPure X', 'HELICORP', 'Máy lọc không khí cầm tay', 'Máy lọc không khí ô tô', 'HEPA H13', 'Plasma Ion', 'Khí sạch chuẩn y khoa'],
  authors: [{ name: 'HELICORP Corporation' }],
  openGraph: {
    title: 'AirPure X - Máy Lọc Không Khí Cầm Tay Thông Minh | HELICORP',
    description: 'Thanh lọc bụi mịn PM2.5, khử mùi ô tô dứt điểm, tạo bong bóng khí bảo vệ chuẩn y khoa mọi lúc mọi nơi.',
    url: 'https://helicorp.vn/airpure-x',
    siteName: 'HELICORP',
    images: [
      {
        url: 'https://helicorp.vn/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AirPure X - Smart Portable Air Purifier',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AirPure X - Máy Lọc Không Khí Cầm Tay Thông Minh | HELICORP',
    description: 'Bảo vệ hệ hô hấp của bạn và gia đình trên từng ki-lô-mét.',
    images: ['https://helicorp.vn/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://helicorp.vn/airpure-x',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
