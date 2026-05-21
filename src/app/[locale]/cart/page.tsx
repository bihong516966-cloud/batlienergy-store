import CartPageClient from "./CartPageClient";

// ─── Metadata ────────────────────────────────────────────────────────────────

export function generateMetadata({ params }: { params: { locale: string } }) {
  const title =
    params.locale === "zh"
      ? "购物车 - Batlienergy"
      : "Shopping Cart - Batlienergy";
  return {
    title,
    description:
      params.locale === "zh"
        ? "查看您的购物车，管理锂电池产品订单"
        : "View your cart and manage your lithium battery product orders",
  };
}

// ─── Page (Server Component) ─────────────────────────────────────────────────

export default function CartPage({ params }: { params: { locale: string } }) {
  return <CartPageClient locale={params.locale} />;
}
