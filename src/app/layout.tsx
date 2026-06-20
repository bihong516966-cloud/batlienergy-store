import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Batlienergy - Premium Lithium Battery Solutions",
  description: "Professional lithium battery manufacturer serving global B2B customers with premium quality cells and packs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#F4F6F5] text-[#111816]">
        {children}
      </body>
    </html>
  );
}
