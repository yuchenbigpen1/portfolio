import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yuchenzhang.work"),
  title: {
    default: "Yuchen Zhang — Builds AI products",
    template: "%s · Yuchen Zhang",
  },
  description:
    "Yuchen Zhang builds AI products that turn fuzzy human work into reliable systems. Based in Toronto.",
  openGraph: {
    title: "Yuchen Zhang",
    description:
      "I build AI products that turn fuzzy human work into reliable systems.",
    siteName: "Yuchen Zhang",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}
    >
      <body className="bg-bg text-ink font-body min-h-[100dvh]">
        {children}
      </body>
    </html>
  );
}
