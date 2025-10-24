import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Japan Travel Journal",
  description: "A photo-forward travel blog exploring Tokyo, Kyoto, Hokkaido and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur">
            <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
              <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80">
                Japan Travel Journal
              </Link>
              <nav className="text-sm text-zinc-600 dark:text-zinc-300">
                <a href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-black/10 dark:border-white/10">
            <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} Japan Travel Journal. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
