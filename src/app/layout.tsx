import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './Providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Career Counseling Chat",
  description: "Chat with an AI career counselor to get advice and guidance",
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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ 
        backgroundColor: '#f8f9fa',
        margin: 0,
        padding: 0,
        minHeight: '100vh'
      }}>
        <header style={{
          backgroundColor: '#1677ff',
          color: 'white',
          padding: '1rem',
          textAlign: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ margin: 0 }}>AI Career Counseling</h1>
        </header>
        <main style={{ padding: '1rem' }}>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
