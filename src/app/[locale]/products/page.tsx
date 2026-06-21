import { ProductCatalogLayout } from "@/components/products/ProductCatalogLayout";
import { categories, products } from "@/data/products";

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;

  return (
    <ProductCatalogLayout
      locale={locale}
      title="Battery Product Catalog"
      eyebrow="Industrial battery supply"
      description={`${products.length} mainstream battery models across ${categories.length} B2B categories, arranged for quick sourcing, comparison, and RFQ submission.`}
      products={products}
    />
  );
}
