import Link from "next/link";
import { ArrowRight, Zap, Globe, Shield, Truck } from "lucide-react";
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
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A1628] py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20">
                  Global B2B Battery Supplier
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Power Your World with{" "}
                  <span className="gradient-text">Premium Lithium</span>{" "}
                  Battery Cells
                </h1>
                <p className="max-w-[600px] text-lg text-[#94A3B8] sm:text-xl">
                  Professional lithium battery manufacturer serving 50+ countries. 
                  10M+ cells annually. 8+ years of excellence in energy solutions.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
              <Link href={`/${locale}/products`}>
                <Button
                  size="lg"
                  className="btn-energy text-[#0A1628] font-semibold"
                >
                  View Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#1E3A5F] text-white hover:bg-[#1E3A5F]"
                >
                  Request OEM Quote
                </Button>
              </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#00E676]">50+</span>
                  <span className="text-sm text-[#94A3B8]">Countries</span>
                </div>
                <div className="h-12 w-px bg-[#1E3A5F]" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#00E676]">10M+</span>
                  <span className="text-sm text-[#94A3B8]">Cells/Year</span>
                </div>
                <div className="h-12 w-px bg-[#1E3A5F]" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#00E676]">8+</span>
                  <span className="text-sm text-[#94A3B8]">Years</span>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-[#00E676]/20 blur-3xl" />
                <div className="relative rounded-2xl bg-gradient-to-br from-[#111D2E] to-[#0A1628] p-8 border border-[#1E3A5F]">
                  <div className="grid grid-cols-2 gap-4">
                    {featuredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="rounded-lg bg-[#0A1628] p-4 border border-[#1E3A5F]"
                      >
                        <div className="aspect-square rounded-md bg-[#1E3A5F]/50 mb-3 flex items-center justify-center">
                          <Zap className="h-8 w-8 text-[#00E676]" />
                        </div>
                        <h3 className="text-sm font-medium text-white truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#94A3B8]">
                          ${product.price.b2b.min}-{product.price.b2b.max}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-[#111D2E] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Product Categories
            </h2>
            <p className="mt-4 text-[#94A3B8]">
              Comprehensive lithium battery solutions for every application
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${locale}/products/${category.id}`}
                className="group"
              >
                <Card className="card-hover border-[#1E3A5F] bg-[#0A1628]">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00E676]/10 group-hover:bg-[#00E676]/20">
                      <Zap className="h-8 w-8 text-[#00E676]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#94A3B8]">
                      View products
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#0A1628] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Featured Products
              </h2>
              <p className="mt-4 text-[#94A3B8]">
                Best-selling lithium batteries with competitive B2B pricing
              </p>
            </div>
            <Link href={`/${locale}/products`}>
              <Button
                variant="outline"
                className="hidden border-[#1E3A5F] text-white hover:bg-[#1E3A5F] sm:flex"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/${locale}/products/${product.slug}`}>
                <Card className="card-hover overflow-hidden border-[#1E3A5F] bg-[#111D2E]">
                  <div className="aspect-square bg-[#0A1628] flex items-center justify-center">
                    <Zap className="h-16 w-16 text-[#00E676]/50" />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2 bg-[#00E676]/10 text-[#00E676] border-0">
                      {categories.find((c) => c.id === product.category)?.name}
                    </Badge>
                    <h3 className="font-semibold text-white">{product.name}</h3>
                    <p className="mt-1 text-sm text-[#94A3B8] line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#94A3B8]">B2B Price</span>
                        <p className="text-lg font-bold text-[#00E676]">
                          ${product.price.b2b.min}-{product.price.b2b.max}
                        </p>
                      </div>
                      <span className="text-xs text-[#94A3B8]">
                        MOQ: {product.moq}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-[#111D2E] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Why Choose Batlienergy
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Fully Certified",
                desc: "UN38.3, CE, UL, IEC 62619 certified products",
              },
              {
                icon: Globe,
                title: "Global Shipping",
                desc: "Fast delivery to 50+ countries worldwide",
              },
              {
                icon: Zap,
                title: "24/7 Support",
                desc: "AI-powered customer service always available",
              },
              {
                icon: Truck,
                title: "Quality Guaranteed",
                desc: "8+ years of excellence in battery manufacturing",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00E676]/10">
                  <item.icon className="h-8 w-8 text-[#00E676]" />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-[#94A3B8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A1628] py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111D2E] to-[#0A1628] border border-[#1E3A5F] p-8 lg:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00E676]/10 blur-3xl" />
            <div className="relative flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Power Your Business?
              </h2>
              <p className="mt-4 max-w-[600px] text-[#94A3B8]">
                Get competitive B2B pricing on premium lithium batteries. 
                Contact us for custom OEM solutions and bulk orders.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href={`/${locale}/contact`}>
                  <Button
                    size="lg"
                    className="btn-energy text-[#0A1628] font-semibold"
                  >
                    Get Quote Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${locale}/products`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#1E3A5F] text-white hover:bg-[#1E3A5F]"
                  >
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
