import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: "BISARA SISTEM - Sistem Kerja Digital untuk Usaha Indonesia",
  description: "Penyedia sistem kerja digital untuk usaha Indonesia yang ingin rapi tanpa ribet. Sistem kerja yang simpel, sesuai cara kerja Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${plusJakarta.variable} ${inter.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
