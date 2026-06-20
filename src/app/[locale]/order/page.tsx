import type { Metadata } from "next";
import OrderConfirmPageClient from "./OrderConfirmPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "订单确认 - Batlienergy" : "Order Confirmation - Batlienergy",
    description: "Your order has been submitted successfully",
  };
}

export default async function OrderConfirmPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <OrderConfirmPageClient locale={locale} />;
}
