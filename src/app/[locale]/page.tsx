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

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const featuredProducts = products.filter((product) => product.images[0]).slice(0, 4);
  const keyCategories = categories.slice(0, 8);

  return (
    <div className="flex flex-col bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white">
        <div className="container mx-auto px-4">
          <div className="grid min-h-[calc(100vh-4rem)] gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-16">
            <div>
              <Badge className="mb-5 w-fit border border-[#C9D2CE] bg-[#F8FAF9] px-3 py-1 text-[#36423E]">
                Industrial lithium battery supply for global B2B buyers
              </Badge>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#111816] sm:text-5xl lg:text-6xl">
                Batlienergy
                <span className="block text-[#168C5A]">Battery Cells & Packs</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5E6A65]">
                Mainstream cylindrical cells, LiFePO4 cells, e-bike packs, tool batteries,
                FPV packs, and storage systems for distributors, repair shops, OEM projects,
                and wholesale buyers.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/products`}>
                  <Button size="lg" className="bg-[#111816] text-white hover:bg-[#2A3330]">
                    Browse Product Catalog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${locale}/contact`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]"
                  >
                    Request Bulk Quote
                  </Button>
                </Link>
              </div>

              <div className="mt-8 grid max-w-2xl grid-cols-3 border-y border-[#D7DDD9]">
                <HeroMetric value="50+" label="Export markets" />
                <HeroMetric value="10M+" label="Cells supplied yearly" />
                <HeroMetric value="8+" label="Years battery sourcing" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/${locale}/products/${product.slug}`} className="group">
                  <Card className="h-full overflow-hidden border-[#D7DDD9] bg-[#F8FAF9] shadow-sm transition-colors hover:border-[#168C5A]">
                    <div className="relative aspect-square bg-white">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-[#5E6A65]">
                        {categories.find((c) => c.id === product.category)?.name}
                      </p>
                      <h3 className="mt-1 font-semibold text-[#111816] group-hover:text-[#168C5A]">
                        {product.name}
                      </h3>
                      <div className="mt-3 flex items-center justify-between border-t border-[#D7DDD9] pt-3 text-sm">
                        <span className="font-bold text-[#126B45]">
                          ${product.price.b2b.min} - ${product.price.b2b.max}
                        </span>
                        <span className="text-[#5E6A65]">MOQ {product.moq}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#D7DDD9] bg-[#F8FAF9] py-5">
        <div className="container mx-auto px-4">
          <div className="grid gap-3 text-sm text-[#36423E] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Verified supply channels", icon: ClipboardCheck },
              { label: "UN38.3 / CE / UL options", icon: Shield },
              { label: "Wholesale MOQ and OEM support", icon: PackageCheck },
              { label: "Export packaging and shipping", icon: Truck },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-[#168C5A]" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#111816]">Battery Product Lines</h2>
              <p className="mt-2 max-w-2xl text-[#5E6A65]">
                Organized for purchasing teams: compare by application, chemistry, MOQ,
                certificates, and target price range.
              </p>
            </div>
            <Link href={`/${locale}/products`}>
              <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyCategories.map((category) => (
              <Link key={category.id} href={`/${locale}/products/${category.id}`} className="group">
                <Card className="h-full border-[#D7DDD9] bg-[#F8FAF9] shadow-sm transition-colors hover:border-[#168C5A]">
                  <CardContent className="p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#168C5A] ring-1 ring-[#D7DDD9]">
                      <BatteryCharging className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-[#111816] group-hover:text-[#168C5A]">
                      {category.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5E6A65]">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#36423E] group-hover:text-[#168C5A]">
                      View category
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#D7DDD9] bg-[#F4F6F5] py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
            <div>
              <Badge className="mb-4 bg-[#E7F4EE] text-[#126B45]">RFQ workflow</Badge>
              <h2 className="text-3xl font-bold text-[#111816]">Built for battery buyers</h2>
              <p className="mt-3 text-[#5E6A65]">
                The catalog helps buyers quickly understand available models, sourcing
                confidence, certificates, and whether the product fits their MOQ.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Factory,
                  title: "Application Matching",
                  desc: "Cells and packs grouped by e-bike, tool, ESS, FPV, portable power, and OEM use cases.",
                },
                {
                  icon: Shield,
                  title: "Compliance First",
                  desc: "UN38.3, CE, UL, IEC62619, MSDS, and export packaging requirements surfaced early.",
                },
                {
                  icon: CheckCircle2,
                  title: "Quote Ready",
                  desc: "Each product shows MOQ, price range, core specs, and direct quote action for bulk orders.",
                },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-[#168C5A] bg-white p-5">
                  <item.icon className="mb-4 h-6 w-6 text-[#168C5A]" />
                  <h3 className="font-semibold text-[#111816]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5E6A65]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#111816]">Featured Battery Models</h2>
              <p className="mt-2 text-[#5E6A65]">
                Products with clean images are now presented as RFQ-ready catalog items.
              </p>
            </div>
            <Link href={`/${locale}/products/cylindrical`}>
              <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                Cylindrical Cells
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/${locale}/products/${product.slug}`} className="group">
                <Card className="h-full overflow-hidden border-[#D7DDD9] bg-white shadow-sm transition-colors hover:border-[#168C5A]">
                  <div className="relative aspect-square bg-[#F8FAF9]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      loading="eager"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2 bg-[#E7F4EE] text-[#126B45] border-0">
                      {categories.find((c) => c.id === product.category)?.name}
                    </Badge>
                    <h3 className="font-semibold text-[#111816] group-hover:text-[#168C5A]">
                      {product.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-[#5E6A65]">
                      {product.description}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#D7DDD9] pt-3 text-sm">
                      <div>
                        <span className="text-xs text-[#5E6A65]">B2B Price</span>
                        <p className="font-bold text-[#126B45]">
                          ${product.price.b2b.min} - ${product.price.b2b.max}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-[#5E6A65]">MOQ</span>
                        <p className="font-semibold text-[#111816]">{product.moq} pcs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#D7DDD9] bg-[#111816] py-14 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Need pricing for a battery project?</h2>
              <p className="mt-2 max-w-2xl text-[#C9D2CE]">
                Send target model, quantity, destination country, and certificate requirements.
                Batlienergy can prepare a product and shipping quote.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/contact`}>
                <Button size="lg" className="bg-white text-[#111816] hover:bg-[#E8ECEA]">
                  Request Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${locale}/products`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-transparent text-white hover:bg-white/10"
                >
                  View Catalog
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
