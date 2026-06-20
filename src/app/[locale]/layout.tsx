import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import { Providers } from "@/components/layout/Providers";
import { defaultLocale } from "@/lib/i18n/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Batlienergy - Premium Lithium Battery Solutions",
  description: "Professional lithium battery manufacturer serving global B2B customers with premium quality cells and packs. 18650, 21700, LiFePO4, E-Bike batteries.",
  keywords: ["lithium battery", "18650", "21700", "LiFePO4", "E-Bike battery", "B2B battery supplier"],
  openGraph: {
    title: "Batlienergy - Premium Lithium Battery Solutions",
    description: "Professional lithium battery manufacturer serving global B2B customers",
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale = defaultLocale } = await params;

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen bg-[#F4F6F5] text-[#111816]">
        <Providers>
          <Header locale={locale as any} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale as any} />
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}
