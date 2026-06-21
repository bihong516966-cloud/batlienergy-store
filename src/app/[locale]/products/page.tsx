import { ProductCatalogLayout } from "@/components/products/ProductCatalogLayout";
import { categories, products } from "@/data/products";
import { tx } from "@/lib/i18n/display";

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;

  return (
    <ProductCatalogLayout
      locale={locale}
      title={tx(locale, "Battery Product Catalog", "鋰電池產品目錄")}
      eyebrow={tx(locale, "Industrial battery supply", "工業級電池供應")}
      description={tx(
        locale,
        `${products.length} mainstream battery models across ${categories.length} B2B categories, arranged for quick sourcing, comparison, and RFQ submission.`,
        `${products.length} 款主流電池型號，涵蓋 ${categories.length} 個 B2B 採購分類，方便海外華人買家快速選型、比較與發送詢價。`
      )}
      products={products}
    />
  );
}
