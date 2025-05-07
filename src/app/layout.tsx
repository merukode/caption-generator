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
  title: "Caption Generator - AI-Powered Social Media Captions",
  description: "Generate engaging and creative captions for your social media posts using advanced AI technology. Perfect for Instagram, Twitter, Facebook, and more.",
  keywords: "AI caption generator, social media captions, Instagram captions, Twitter captions, Facebook captions, content creation, AI writing assistant",
  authors: [{ name: "Aulia Ramadhan - Merukode" }],
  creator: "Aulia Ramadhan",
  publisher: "Aulia Ramadhan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cptgenrator.netlify.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Caption Generator - AI-Powered Social Media Captions",
    description: "Generate engaging and creative captions for your social media posts using advanced AI technology.",
    url: 'https://cptgenrator.netlify.app/',
    siteName: 'Caption Generator',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
