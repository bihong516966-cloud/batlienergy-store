import Link from "next/link";
import Image from "next/image";
import { Zap, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      {/* Header */}
      <section className="border-b border-[#D7DDD9] bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[#5E6A65]">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm">Browse & Filter</span>
              </div>
              <h1 className="text-3xl font-bold text-[#111816] sm:text-4xl">
                All Products
              </h1>
              <p className="mt-2 text-[#5E6A65]">
                {products.length} products across {categories.length} categories
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5E6A65]" />
              <input
                type="text"
                placeholder="Search products..."
                className="h-10 w-full rounded-lg border border-[#C9D2CE] bg-white pl-10 pr-4 text-sm text-[#111816] placeholder:text-[#6B7671] focus:border-[#168C5A] focus:outline-none focus:ring-1 focus:ring-[#168C5A] sm:w-72"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-0 z-10 border-b border-[#D7DDD9] bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
            <Badge
              className="shrink-0 cursor-pointer bg-[#111816] text-white hover:bg-[#2A3330] border-0"
            >
              All
            </Badge>
            {categories.map((category) => (
              <Link key={category.id} href={`/${locale}/products/${category.id}`}>
                <Badge
                  className="shrink-0 cursor-pointer border border-[#C9D2CE] bg-[#F8FAF9] text-[#36423E] hover:border-[#168C5A] hover:text-[#168C5A] transition-colors"
                >
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.slug}`}
                className="group"
              >
                <Card className="card-hover h-full overflow-hidden border-[#D7DDD9] bg-white shadow-sm">
                  {/* Image Placeholder */}
                  <div className="relative aspect-square bg-[#E8ECEA] flex items-center justify-center">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        loading="eager"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <Zap className="h-16 w-16 text-[#168C5A]/45 group-hover:text-[#168C5A]/75 transition-colors" />
                    )}
                    {product.badge && (
                      <Badge className="absolute left-3 top-3 bg-[#111816] text-white border-0 font-semibold">
                        {product.badge}
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge className="absolute right-3 top-3 bg-red-500/10 text-red-400 border-red-500/20">
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    {/* Category Badge */}
                    <Badge className="mb-2 bg-[#E7F4EE] text-[#126B45] border-0">
                      {categories.find((c) => c.id === product.category)?.name}
                    </Badge>

                    {/* Product Name */}
                    <h3 className="font-semibold text-[#111816] group-hover:text-[#168C5A] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-1 text-sm text-[#5E6A65] line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                        <span
                          key={key}
                          className="rounded-md border border-[#D7DDD9] bg-[#F8FAF9] px-2 py-1 text-xs text-[#5E6A65]"
                        >
                          {key}: <span className="font-medium text-[#111816]">{value}</span>
                        </span>
                      ))}
                    </div>

                    {product.certifications.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {product.certifications.slice(0, 3).map((cert) => (
                          <span
                            key={cert}
                            className="rounded border border-[#C9D2CE] bg-white px-2 py-0.5 text-[11px] font-medium text-[#36423E]"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price & MOQ */}
                    <div className="mt-4 flex items-end justify-between border-t border-[#D7DDD9] pt-3">
                      <div>
                        <span className="text-xs text-[#5E6A65]">B2B Price</span>
                        <p className="text-lg font-bold text-[#126B45]">
                          ${product.price.b2b.min} - ${product.price.b2b.max}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#5E6A65]">MOQ</span>
                        <p className="text-sm font-medium text-[#111816]">
                          {product.moq} pcs
                        </p>
                      </div>
                    </div>

                    {/* View Detail */}
                    <div className="mt-3 flex items-center gap-1 text-sm text-[#5E6A65] group-hover:text-[#168C5A] transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
