import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import { Providers } from "@/components/layout/Providers";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

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
  const { locale: rawLocale = defaultLocale } = await params;
  const locale: Locale = isLocale(rawLocale)
    ? rawLocale
    : defaultLocale;

  return (
    <Providers locale={locale}>
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <FloatingContact locale={locale} />
    </Providers>
  );
}
