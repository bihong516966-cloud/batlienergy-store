import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  PackageCheck,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, products } from "@/data/products";
import { Locale } from "@/lib/i18n/config";
import { categoryDescription, categoryName, tx } from "@/lib/i18n/display";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const featuredProducts = products.filter((product) => product.images[0]).slice(0, 6);
  const keyCategories = categories.slice(0, 8);
  const trustItems = [
    { label: tx(locale, "Factory sourcing and export support", "工廠供應與出口配套"), icon: Factory },
    { label: tx(locale, "UN38.3 / CE / UL document options", "可配 UN38.3 / CE / UL 文件"), icon: Shield },
    { label: tx(locale, "Wholesale MOQ and OEM support", "批發起訂量與 OEM 支援"), icon: PackageCheck },
    { label: tx(locale, "Lithium battery packaging and shipping", "鋰電池包裝與物流方案"), icon: Truck },
  ];

  return (
    <div className="flex flex-col bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white">
        <div className="container mx-auto px-4 py-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <Badge className="mb-5 w-fit border border-[#C9D2CE] bg-[#F8FAF9] px-3 py-1 text-[#36423E]">
                {tx(locale, "Industrial lithium battery supply for global B2B buyers", "面向全球 B2B 買家的工業鋰電池供應")}
              </Badge>
              <h1 className="max-w-4xl text-4xl font-bold tracking-normal text-[#111816] sm:text-5xl">
                Batlienergy
                <span className="block text-[#168C5A]">
                  {tx(locale, "Battery Cells & Packs", "電芯與電池組批發供應")}
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5E6A65]">
                {tx(
                  locale,
                  "Mainstream cylindrical cells, LiFePO4 cells, e-bike packs, tool batteries, FPV packs, portable power stations, and home storage systems for distributors, repair shops, OEM projects, and wholesale buyers.",
                  "供應主流圓柱電芯、磷酸鐵鋰電芯、電動自行車電池、工具電池、FPV 電池、便攜電源與家用儲能系統，服務經銷商、維修商、OEM 項目與批發買家。"
                )}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/products`}>
                  <Button size="lg" className="bg-[#111816] text-white hover:bg-[#2A3330]">
                    {tx(locale, "Browse Product Catalog", "瀏覽產品目錄")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${locale}/contact`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]"
                  >
                    {tx(locale, "Request Bulk Quote", "索取批發報價")}
                  </Button>
                </Link>
              </div>

              <div className="mt-8 grid max-w-2xl grid-cols-3 border-y border-[#D7DDD9]">
                <HeroMetric value="38" label={tx(locale, "Listed models", "已整理型號")} />
                <HeroMetric value="11" label={tx(locale, "Battery families", "產品系列")} />
                <HeroMetric value="24" label={tx(locale, "Languages", "語言市場")} />
              </div>

              <div className="mt-8 grid gap-3 text-sm text-[#36423E] sm:grid-cols-2">
                {trustItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 border-l-2 border-[#168C5A] bg-[#F8FAF9] p-3">
                    <item.icon className="h-4 w-4 text-[#168C5A]" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/${locale}/products/${product.slug}`} className="group">
                  <Card className="h-full overflow-hidden rounded-md border-[#D7DDD9] bg-white shadow-sm transition-colors hover:border-[#168C5A]">
                    <div className="relative aspect-square bg-white">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="border-t border-[#D7DDD9] p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-[#5E6A65]">
                        {categoryName(locale, categories.find((c) => c.id === product.category))}
                      </p>
                      <h3 className="mt-1 font-semibold text-[#111816] group-hover:text-[#168C5A]">
                        {product.name}
                      </h3>
                      <div className="mt-3 flex items-center justify-between border-t border-[#D7DDD9] pt-3 text-sm">
                        <span className="font-bold text-[#126B45]">
                          ${product.price.b2b.min} - ${product.price.b2b.max}
                        </span>
                        <span className="text-[#5E6A65]">{tx(locale, "MOQ", "起訂量")} {product.moq}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#111816]">
                {tx(locale, "Battery Product Lines", "鋰電池產品系列")}
              </h2>
              <p className="mt-2 max-w-2xl text-[#5E6A65]">
                {tx(
                  locale,
                  "Organized for purchasing teams: compare by application, chemistry, MOQ, certificates, and target price range.",
                  "為採購團隊整理：可按用途、化學體系、起訂量、認證文件與目標價格區間快速比較。"
                )}
              </p>
            </div>
            <Link href={`/${locale}/products`}>
              <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                {tx(locale, "All Products", "全部產品")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyCategories.map((category) => (
              <Link key={category.id} href={`/${locale}/products/${category.id}`} className="group">
                <Card className="h-full rounded-md border-[#D7DDD9] bg-[#F8FAF9] shadow-sm transition-colors hover:border-[#168C5A]">
                  <CardContent className="p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#168C5A] ring-1 ring-[#D7DDD9]">
                      <BatteryCharging className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-[#111816] group-hover:text-[#168C5A]">
                      {categoryName(locale, category)}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5E6A65]">
                      {categoryDescription(locale, category)}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#36423E] group-hover:text-[#168C5A]">
                      {tx(locale, "View category", "查看分類")}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#D7DDD9] bg-[#F4F6F5] py-14">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
            <div>
              <Badge className="mb-4 bg-[#E7F4EE] text-[#126B45]">
                {tx(locale, "RFQ workflow", "詢價流程")}
              </Badge>
              <h2 className="text-3xl font-bold text-[#111816]">
                {tx(locale, "Built for battery buyers", "為鋰電池採購買家設計")}
              </h2>
              <p className="mt-3 text-[#5E6A65]">
                {tx(
                  locale,
                  "The catalog helps buyers quickly understand available models, sourcing confidence, certificates, and whether the product fits their MOQ.",
                  "產品目錄幫助買家快速了解可供型號、供應可信度、認證文件，以及是否符合目標起訂量。"
                )}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <WorkflowItem
                icon={ClipboardCheck}
                title={tx(locale, "Model matching", "型號匹配")}
                desc={tx(locale, "Choose by application, voltage, capacity, chemistry, and target MOQ.", "按用途、電壓、容量、化學體系與目標起訂量選型。")}
              />
              <WorkflowItem
                icon={Shield}
                title={tx(locale, "Document review", "文件確認")}
                desc={tx(locale, "Confirm UN38.3, MSDS, CE, UL, IEC62619, and export packaging needs.", "確認 UN38.3、MSDS、CE、UL、IEC62619 與出口包裝需求。")}
              />
              <WorkflowItem
                icon={CheckCircle2}
                title={tx(locale, "Quotation", "報價確認")}
                desc={tx(locale, "Send quantity and destination to receive price, lead time, and freight options.", "提供數量與目的地後確認價格、交期與物流方案。")}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#D7DDD9] bg-[#111816] py-14 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">
                {tx(locale, "Need pricing for a battery project?", "需要鋰電池項目報價？")}
              </h2>
              <p className="mt-2 max-w-2xl text-[#C9D2CE]">
                {tx(
                  locale,
                  "Send target model, quantity, destination country, and certificate requirements. Batlienergy can prepare a product and shipping quote.",
                  "請提供目標型號、數量、目的地國家與認證需求，Batlienergy 可協助整理產品與物流報價。"
                )}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/contact`}>
                <Button size="lg" className="bg-white text-[#111816] hover:bg-[#E8ECEA]">
                  {tx(locale, "Request Quote", "索取報價")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${locale}/products`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-transparent text-white hover:bg-white/10"
                >
                  {tx(locale, "View Catalog", "查看目錄")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-r border-[#D7DDD9] py-4 pr-4 last:border-r-0 sm:pr-6">
      <p className="text-2xl font-bold text-[#111816]">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-[#5E6A65]">{label}</p>
    </div>
  );
}

function WorkflowItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof ClipboardCheck;
  title: string;
  desc: string;
}) {
  return (
    <div className="border-l-2 border-[#168C5A] bg-white p-5">
      <Icon className="mb-4 h-6 w-6 text-[#168C5A]" />
      <h3 className="font-semibold text-[#111816]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#5E6A65]">{desc}</p>
    </div>
  );
}
