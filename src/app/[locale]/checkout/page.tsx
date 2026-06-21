import type { Metadata } from "next";
import CheckoutPageClient from "./CheckoutPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "確認詢價 - Batlienergy" : "Checkout - Batlienergy",
    description: locale === "zh" ? "確認並提交電池採購詢價" : "Complete your quote request",
  };
}

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CheckoutPageClient locale={locale} />;
}
