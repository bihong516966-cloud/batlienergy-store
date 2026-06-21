import type { Metadata } from "next";
import OrderConfirmPageClient from "./OrderConfirmPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "詢價已提交 - Batlienergy" : "Order Confirmation - Batlienergy",
    description: locale === "zh" ? "您的電池採購詢價已提交" : "Your quote request has been submitted successfully",
  };
}

export default async function OrderConfirmPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <OrderConfirmPageClient locale={locale} />;
}
