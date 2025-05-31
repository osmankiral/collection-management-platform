import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koleksiyon Yönetim Platformu",
  description: "Koleksiyon ve ürün yönetimi için geliştirilen admin paneli.",
};

import ClientProviders from "./ClientProviders";  
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>
          <Toaster richColors position="top-right"/>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}