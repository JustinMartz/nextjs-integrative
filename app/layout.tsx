import type { Metadata } from "next";
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s | Integrative Practice',
    default: 'Integrative Practice',
  },
  description: 'Next.js app for mental health providers and clients',
  metadataBase: new URL('https://nextjs-integrative.vercel.app/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased overscroll-none`}>{children}</body>
    </html>
  );
}
