import Link from "next/link";
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
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <section className="border-b border-[#1E3A5F] bg-[#0A1628] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[#94A3B8]">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm">Browse & Filter</span>
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                All Products
              </h1>
              <p className="mt-2 text-[#94A3B8]">
                {products.length} products across {categories.length} categories
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search products..."
                className="h-10 w-full rounded-lg border border-[#1E3A5F] bg-[#111D2E] pl-10 pr-4 text-sm text-white placeholder:text-[#94A3B8] focus:border-[#00E676] focus:outline-none focus:ring-1 focus:ring-[#00E676] sm:w-72"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-0 z-10 border-b border-[#1E3A5F] bg-[#0A1628]/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
            <Badge
              className="shrink-0 cursor-pointer bg-[#00E676] text-[#0A1628] hover:bg-[#00E676]/90 border-0"
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.id}
                className="shrink-0 cursor-pointer border border-[#1E3A5F] bg-[#111D2E] text-[#94A3B8] hover:border-[#00E676] hover:text-[#00E676] transition-colors"
              >
                {category.name}
              </Badge>
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
                <Card className="card-hover h-full overflow-hidden border-[#1E3A5F] bg-[#111D2E]">
                  {/* Image Placeholder */}
                  <div className="relative aspect-square bg-[#0A1628] flex items-center justify-center">
                    <Zap className="h-16 w-16 text-[#00E676]/40 group-hover:text-[#00E676]/70 transition-colors" />
                    {product.badge && (
                      <Badge className="absolute left-3 top-3 bg-[#00E676] text-[#0A1628] border-0 font-semibold">
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
                    <Badge className="mb-2 bg-[#00E676]/10 text-[#00E676] border-0">
                      {categories.find((c) => c.id === product.category)?.name}
                    </Badge>

                    {/* Product Name */}
                    <h3 className="font-semibold text-white group-hover:text-[#00E676] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-1 text-sm text-[#94A3B8] line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price & MOQ */}
                    <div className="mt-4 flex items-end justify-between border-t border-[#1E3A5F] pt-3">
                      <div>
                        <span className="text-xs text-[#94A3B8]">B2B Price</span>
                        <p className="text-lg font-bold text-[#00E676]">
                          ${product.price.b2b.min} - ${product.price.b2b.max}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#94A3B8]">MOQ</span>
                        <p className="text-sm font-medium text-white">
                          {product.moq} pcs
                        </p>
                      </div>
                    </div>

                    {/* View Detail */}
                    <div className="mt-3 flex items-center gap-1 text-sm text-[#94A3B8] group-hover:text-[#00E676] transition-colors">
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
