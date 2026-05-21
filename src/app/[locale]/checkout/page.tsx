import type { Metadata } from "next";
import CheckoutPageClient from "./CheckoutPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "结账 - Batlienergy" : "Checkout - Batlienergy",
    description: "Complete your order",
  };
}

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CheckoutPageClient locale={locale} />;
}
