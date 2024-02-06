import type { Metadata } from "next";
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: "Integrative Counseling",
  description: "Next.js app for mental health providers and clients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
