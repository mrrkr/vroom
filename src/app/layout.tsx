import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Icons from "@/components/Icons";
import Link from "next/link";

const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "vroom", template: "%s - vroom" },
  description: "Track yourself. All your personal stuff, in one place.",
  manifest: "/manifest.json",
  icons: { icon: "/images.png", apple: "/images.png" },
  appleWebApp: { capable: true, title: "vroom", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Icons />
        <Navbar />
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-2 sm:px-4 pb-10">{children}</main>
        <footer className="text-center text-muted text-[11px] py-4 border-t border-line">
          <Link href="/">Explore</Link> - <Link href="/new">New note</Link>
        </footer>
      </body>
    </html>
  );
}
