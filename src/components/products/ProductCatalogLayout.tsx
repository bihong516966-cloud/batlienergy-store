import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Boxes,
  CheckCircle2,
  Factory,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  categories,
  getProductsByCategory,
  Product,
} from "@/data/products";
import {
  badgeLabel,
  categoryDescription,
  categoryName,
  productDescription,
  specLabel,
  tx,
} from "@/lib/i18n/display";

interface ProductCatalogLayoutProps {
  locale: string;
  activeCategoryId?: string;
  title: string;
  eyebrow: string;
  description: string;
  products: Product[];
}

export function ProductCatalogLayout({
  locale,
  activeCategoryId,
  title,
  eyebrow,
  description,
  products,
}: ProductCatalogLayoutProps) {
  const totalProducts = categories.reduce(
    (count, category) => count + getProductsByCategory(category.id).length,
    0
  );
  const activeCategory = categories.find((category) => category.id === activeCategoryId);
  const lowestMoq = Math.min(...products.map((product) => product.moq));
  const stockedProducts = products.filter((product) => product.inStock).length;

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#5E6A65]">
                <Factory className="h-4 w-4 text-[#168C5A]" />
                <span>{eyebrow}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-normal text-[#111816] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#5E6A65]">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm sm:min-w-[360px]">
              <CatalogMetric label={tx(locale, "Products", "產品數量")} value={String(products.length)} />
              <CatalogMetric label={tx(locale, "In stock", "現貨款式")} value={String(stockedProducts)} />
              <CatalogMetric label={tx(locale, "Lowest MOQ", "最低起訂量")} value={`${lowestMoq} pcs`} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-lg border border-[#D7DDD9] bg-white shadow-sm">
              <div className="border-b border-[#D7DDD9] bg-[#E8ECEA] px-4 py-4">
                <div className="flex items-center gap-2">
                  <Boxes className="h-4 w-4 text-[#168C5A]" />
                  <h2 className="font-semibold text-[#111816]">
                    {tx(locale, "Product Categories", "產品分類")}
                  </h2>
                </div>
                <p className="mt-1 text-xs text-[#5E6A65]">
                  {tx(locale, "Select a battery family to compare models.", "選擇電池系列，快速比較型號與採購條件。")}
                </p>
              </div>

              <nav className="max-h-[calc(100vh-220px)] overflow-y-auto p-2">
                <Link
                  href={`/${locale}/products`}
                  className={`group flex items-center justify-between rounded-md px-3 py-3 text-sm transition-colors ${
                    !activeCategoryId
                      ? "bg-[#111816] text-white"
                      : "text-[#36423E] hover:bg-[#F4F6F5] hover:text-[#111816]"
                  }`}
                >
                  <span className="font-medium">
                    {tx(locale, "All Battery Products", "全部電池產品")}
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 text-xs ${
                      !activeCategoryId
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-[#D7DDD9] bg-[#F8FAF9] text-[#5E6A65]"
                    }`}
                  >
                    {totalProducts}
                  </span>
                </Link>

                {categories.map((category) => {
                  const count = getProductsByCategory(category.id).length;
                  const active = category.id === activeCategoryId;

                  return (
                    <Link
                      key={category.id}
                      href={`/${locale}/products/${category.id}`}
                      className={`group mt-1 flex items-start justify-between gap-3 rounded-md px-3 py-3 text-sm transition-colors ${
                        active
                          ? "bg-[#111816] text-white"
                          : "text-[#36423E] hover:bg-[#F4F6F5] hover:text-[#111816]"
                      }`}
                    >
                      <span>
                        <span className="block font-medium leading-snug">
                          {categoryName(locale, category)}
                        </span>
                        <span
                          className={`mt-1 block text-xs leading-snug ${
                            active ? "text-white/70" : "text-[#6B7671]"
                          }`}
                        >
                          {categoryDescription(locale, category)}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 rounded border px-2 py-0.5 text-xs ${
                          active
                            ? "border-white/20 bg-white/10 text-white"
                            : "border-[#D7DDD9] bg-[#F8FAF9] text-[#5E6A65]"
                        }`}
                      >
                        {count}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="mb-5 flex flex-col gap-3 border-b border-[#D7DDD9] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-[#E7F4EE] text-[#126B45]">
                    {activeCategory
                      ? categoryName(locale, activeCategory)
                      : tx(locale, "All categories", "全部分類")}
                  </Badge>
                  <Badge className="border border-[#C9D2CE] bg-white text-[#5E6A65]">
                    {products.length} {tx(locale, "RFQ-ready models", "款可詢價型號")}
                  </Badge>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-[#111816]">
                  {tx(locale, "Product Showcase", "產品展示")}
                </h2>
              </div>
              <Link href={`/${locale}/contact`}>
                <Button className="bg-[#111816] text-white hover:bg-[#2A3330]">
                  {tx(locale, "Send RFQ", "發送詢價")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} locale={locale} product={product} />
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ locale, product }: { locale: string; product: Product }) {
  const category = categories.find((item) => item.id === product.category);

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group">
      <Card className="h-full overflow-hidden rounded-lg border-[#D7DDD9] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#AAB6B0] hover:shadow-md">
        <div className="relative aspect-[4/3] border-b border-[#D7DDD9] bg-white">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              loading="eager"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#E8ECEA]">
              <BatteryCharging className="h-16 w-16 text-[#168C5A]/45" />
            </div>
          )}
          {product.badge && (
            <Badge className="absolute left-3 top-3 border-0 bg-[#111816] text-white">
              {badgeLabel(locale, product.badge)}
            </Badge>
          )}
          <div className="absolute bottom-3 right-3 rounded border border-[#D7DDD9] bg-white/95 px-2 py-1 text-xs font-medium text-[#36423E]">
            {tx(locale, "MOQ", "起訂量")} {product.moq} pcs
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-2">
            <Badge className="min-w-0 border-0 bg-[#E7F4EE] text-[#126B45]">
              <span className="truncate">{category ? categoryName(locale, category) : product.category}</span>
            </Badge>
            {product.inStock && (
              <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-[#126B45]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {tx(locale, "In stock", "現貨")}
              </span>
            )}
          </div>

          <h3 className="mt-3 line-clamp-2 min-h-[48px] text-base font-semibold leading-6 text-[#111816] transition-colors group-hover:text-[#168C5A]">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-[#5E6A65]">
            {productDescription(locale, product)}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.entries(product.specs)
              .slice(0, 4)
              .map(([key, value]) => (
                <div key={key} className="rounded-md border border-[#D7DDD9] bg-[#F8FAF9] p-2">
                  <span className="block text-[11px] text-[#6B7671]">{specLabel(locale, key)}</span>
                  <span className="mt-0.5 block truncate text-xs font-semibold text-[#111816]">
                    {value}
                  </span>
                </div>
              ))}
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-[#D7DDD9] pt-4">
            <div>
              <span className="text-xs text-[#5E6A65]">{tx(locale, "B2B Price", "批發參考價")}</span>
              <p className="text-lg font-bold text-[#126B45]">
                ${product.price.b2b.min} - ${product.price.b2b.max}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-[#36423E]">
              {tx(locale, "Details", "詳情")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {product.certifications.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.certifications.slice(0, 3).map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1 rounded border border-[#C9D2CE] bg-white px-2 py-0.5 text-[11px] font-medium text-[#5E6A65]"
                >
                  <ShieldCheck className="h-3 w-3 text-[#168C5A]" />
                  {cert}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

function CatalogMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#D7DDD9] bg-[#F8FAF9] p-3">
      <span className="block text-xs text-[#5E6A65]">{label}</span>
      <span className="mt-1 block text-lg font-bold text-[#111816]">{value}</span>
    </div>
  );
}
