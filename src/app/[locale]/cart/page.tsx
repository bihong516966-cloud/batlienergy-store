import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Quote Cart - Batlienergy",
  description: "Review battery products selected for quotation.",
};

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <CartPageClient locale={locale} />;
}
