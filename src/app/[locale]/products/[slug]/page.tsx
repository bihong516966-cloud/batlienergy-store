import Link from "next/link";
import { notFound } from "next/navigation";
import { Zap, ArrowRight, ArrowLeft, Shield, Package, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  products,
  Product,
  Category,
  getProductBySlug,
  getProductsByCategory,
  categories,
} from "@/data/products";
import { Locale } from "@/lib/i18n/config";

interface ProductDetailPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  const categoryPage = categories.find((c) => c.id === slug);

  if (!product) {
    if (categoryPage) {
      return <CategoryListingPage locale={locale} category={categoryPage} />;
    }

    notFound();
  }

  const category = categories.find((c) => c.id === product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Breadcrumb */}
      <section className="border-b border-[#1E3A5F] bg-[#0A1628]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <Link
              href={`/${locale}`}
              className="hover:text-[#00E676] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/products`}
              className="hover:text-[#00E676] transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Image Area */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square rounded-2xl bg-[#111D2E] border border-[#1E3A5F] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 via-transparent to-transparent" />
                <Zap className="h-32 w-32 text-[#00E676]/30" />
                {product.badge && (
                  <Badge className="absolute left-4 top-4 bg-[#00E676] text-[#0A1628] border-0 font-semibold text-sm px-3 py-1">
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Certification Tags */}
              {product.certifications.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-[#94A3B8] mr-2">Certifications:</span>
                  {product.certifications.map((cert) => (
                    <Badge
                      key={cert}
                      className="border border-[#1E3A5F] bg-[#111D2E] text-[#94A3B8]"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info Area */}
            <div className="flex flex-col gap-6">
              {/* Category */}
              {category && (
                <Badge className="w-fit bg-[#00E676]/10 text-[#00E676] border-0">
                  {category.name}
                </Badge>
              )}

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-lg text-[#94A3B8] leading-relaxed">
                {product.description}
              </p>

              {/* Specs Table */}
              <Card className="border-[#1E3A5F] bg-[#111D2E] overflow-hidden">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-[#1E3A5F] hover:bg-transparent">
                        <TableHead className="bg-[#E8F4FD] text-[#0A1628] font-semibold h-10">
                          Specification
                        </TableHead>
                        <TableHead className="bg-[#E8F4FD] text-[#0A1628] font-semibold h-10">
                          Details
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <TableRow
                          key={key}
                          className="border-b border-[#1E3A5F]/50 hover:bg-[#1E3A5F]/20"
                        >
                          <TableCell className="text-[#94A3B8] font-medium py-3">
                            {key}
                          </TableCell>
                          <TableCell className="text-white py-3">
                            {value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Pricing */}
              <div className="rounded-xl border border-[#1E3A5F] bg-[#111D2E] p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* B2B Price */}
                  <div className="rounded-lg bg-[#0A1628] p-4">
                    <span className="text-sm text-[#94A3B8]">B2B Price</span>
                    <p className="mt-1 text-2xl font-bold text-[#00E676]">
                      ${product.price.b2b.min} - ${product.price.b2b.max}
                    </p>
                    <span className="text-xs text-[#94A3B8]">
                      {product.price.b2b.currency} per unit
                    </span>
                  </div>

                  {/* Retail Price (if available) */}
                  {product.price.retail ? (
                    <div className="rounded-lg bg-[#0A1628] p-4">
                      <span className="text-sm text-[#94A3B8]">Retail Price</span>
                      <p className="mt-1 text-2xl font-bold text-white">
                        ${product.price.retail.min} - ${product.price.retail.max}
                      </p>
                      <span className="text-xs text-[#94A3B8]">
                        {product.price.retail.currency} per unit
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-[#0A1628] p-4">
                      <span className="text-sm text-[#94A3B8]">MOQ</span>
                      <div className="mt-1 flex items-center gap-2">
                        <Package className="h-6 w-6 text-[#00E676]" />
                        <p className="text-2xl font-bold text-white">
                          {product.moq} pcs
                        </p>
                      </div>
                      <span className="text-xs text-[#94A3B8]">
                        Minimum order quantity
                      </span>
                    </div>
                  )}
                </div>

                {/* MOQ (if retail price exists) */}
                {product.price.retail && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#0A1628] p-3">
                    <Package className="h-5 w-5 text-[#00E676]" />
                    <span className="text-sm text-[#94A3B8]">
                      Minimum Order Quantity:{" "}
                      <span className="font-semibold text-white">
                        {product.moq} pcs
                      </span>
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/contact`} className="flex-1">
                  <Button
                    size="lg"
                    className="btn-energy w-full text-[#0A1628] font-semibold h-12"
                  >
                    Add to Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/8613800138000?text=${encodeURIComponent(`Hi, I'm interested in the product: ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 h-12"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Inquiry
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[#1E3A5F] bg-[#111D2E] py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Related Products
                </h2>
                <p className="mt-2 text-[#94A3B8]">
                  More from {category?.name}
                </p>
              </div>
              <Link href={`/${locale}/products`} className="hidden sm:flex">
                <Button
                  variant="outline"
                  className="border-[#1E3A5F] text-white hover:bg-[#1E3A5F]"
                >
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/${locale}/products/${rp.slug}`}
                  className="group"
                >
                  <Card className="card-hover h-full overflow-hidden border-[#1E3A5F] bg-[#0A1628]">
                    <div className="aspect-square bg-[#111D2E] flex items-center justify-center">
                      <Zap className="h-12 w-12 text-[#00E676]/40 group-hover:text-[#00E676]/70 transition-colors" />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-[#00E676]/10 text-[#00E676] border-0">
                        {category?.name}
                      </Badge>
                      <h3 className="font-semibold text-white group-hover:text-[#00E676] transition-colors line-clamp-1">
                        {rp.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#94A3B8] line-clamp-2">
                        {rp.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#00E676]">
                          ${rp.price.b2b.min}-${rp.price.b2b.max}
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          MOQ: {rp.moq}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Link href={`/${locale}/products`}>
            <Button
              variant="ghost"
              className="text-[#94A3B8] hover:text-[#00E676]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function CategoryListingPage({
  locale,
  category,
}: {
  locale: Locale;
  category: Category;
}) {
  const categoryProducts = getProductsByCategory(category.id);
  const featuredProduct = categoryProducts.find((p) => p.badge) || categoryProducts[0];
  const minPrice = Math.min(...categoryProducts.map((p) => p.price.b2b.min));
  const maxPrice = Math.max(...categoryProducts.map((p) => p.price.b2b.max));
  const certifications = Array.from(
    new Set(categoryProducts.flatMap((p) => p.certifications))
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      {/* Breadcrumb */}
      <section className="border-b border-[#D7DDD9] bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-[#5E6A65]">
            <Link
              href={`/${locale}`}
              className="hover:text-[#168C5A] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/products`}
              className="hover:text-[#168C5A] transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-[#111816]">{category.name}</span>
          </div>
        </div>
      </section>

      {/* Category Hero */}
      <section className="relative overflow-hidden border-b border-[#D7DDD9] bg-white py-14">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(22,140,90,0.08),transparent_40%),repeating-linear-gradient(90deg,rgba(17,24,22,0.035)_0,rgba(17,24,22,0.035)_1px,transparent_1px,transparent_42px)]" />
        <div className="container relative mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <Badge className="mb-4 bg-[#E7F4EE] text-[#126B45] border-0">
                {categoryProducts.length} products
              </Badge>
              <h1 className="text-3xl font-bold text-[#111816] sm:text-5xl">
                {category.name}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#5E6A65]">
                {category.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/${locale}/contact`}>
                  <Button className="bg-[#111816] text-white hover:bg-[#2A3330] font-semibold">
                    Request Category Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${locale}/products`}>
                  <Button
                    variant="outline"
                    className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All Products
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="border-[#D7DDD9] bg-[#F8FAF9] shadow-sm">
              <CardContent className="p-5">
                <div className="mb-5 flex aspect-video items-center justify-center rounded-xl bg-[#E8ECEA]">
                  <Zap className="h-20 w-20 text-[#168C5A]/55" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <CategoryMetric label="B2B price range" value={`$${minPrice} - $${maxPrice}`} />
                  <CategoryMetric label="Products" value={String(categoryProducts.length)} />
                  <CategoryMetric
                    label="Lowest MOQ"
                    value={`${Math.min(...categoryProducts.map((p) => p.moq))} pcs`}
                  />
                  <CategoryMetric
                    label="In stock"
                    value={String(categoryProducts.filter((p) => p.inStock).length)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Table */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#111816] sm:text-3xl">
                {category.name} Lineup
              </h2>
              <p className="mt-2 text-[#5E6A65]">
                Compare mainstream models, MOQ, certifications, and B2B price ranges.
              </p>
            </div>
            {certifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <Badge
                    key={cert}
                    className="border border-[#C9D2CE] bg-white text-[#5E6A65]"
                  >
                    <Shield className="mr-1 h-3 w-3" />
                    {cert}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Card className="overflow-hidden border-[#D7DDD9] bg-white shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#D7DDD9] hover:bg-transparent">
                    <TableHead className="bg-[#E8ECEA] text-[#111816] font-semibold">
                      Model
                    </TableHead>
                    <TableHead className="bg-[#E8ECEA] text-[#111816] font-semibold">
                      Key Specs
                    </TableHead>
                    <TableHead className="bg-[#E8ECEA] text-[#111816] font-semibold">
                      B2B Price
                    </TableHead>
                    <TableHead className="bg-[#E8ECEA] text-[#111816] font-semibold">
                      MOQ
                    </TableHead>
                    <TableHead className="bg-[#E8ECEA] text-[#111816] font-semibold">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryProducts.map((product) => (
                    <TableRow
                      key={product.id}
                      className="border-b border-[#D7DDD9] hover:bg-[#F4F6F5]"
                    >
                      <TableCell className="min-w-56 py-4">
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/${locale}/products/${product.slug}`}
                            className="font-semibold text-[#111816] hover:text-[#168C5A]"
                          >
                            {product.name}
                          </Link>
                          {product.badge && (
                            <Badge className="w-fit bg-[#00E676] text-[#0A1628] border-0">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="min-w-72 py-4 text-[#5E6A65]">
                        <SpecSummary product={product} />
                      </TableCell>
                      <TableCell className="py-4 font-bold text-[#126B45]">
                        ${product.price.b2b.min} - ${product.price.b2b.max}
                      </TableCell>
                      <TableCell className="py-4 text-[#111816]">
                        {product.moq} pcs
                      </TableCell>
                      <TableCell className="py-4">
                        <Link href={`/${locale}/products/${product.slug}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]"
                          >
                            Details
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Product Cards */}
      <section className="border-t border-[#D7DDD9] bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#111816] sm:text-3xl">
              Featured {category.name}
            </h2>
            <p className="mt-2 text-[#5E6A65]">
              RFQ-ready products for B2B buyers and OEM projects.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.slug}`}
                className="group"
              >
                <Card className="card-hover h-full overflow-hidden border-[#D7DDD9] bg-[#F8FAF9] shadow-sm">
                  <div className="relative aspect-square bg-[#E8ECEA] flex items-center justify-center">
                    <Zap className="h-16 w-16 text-[#168C5A]/45 group-hover:text-[#168C5A]/75 transition-colors" />
                    {product.badge && (
                      <Badge className="absolute left-3 top-3 bg-[#111816] text-white border-0 font-semibold">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#111816] group-hover:text-[#168C5A] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#5E6A65] line-clamp-2">
                      {product.description}
                    </p>
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
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredProduct && (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl border border-[#D7DDD9] bg-[#F8FAF9] p-6 shadow-sm sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <Badge className="mb-3 bg-[#E7F4EE] text-[#126B45] border-0">
                    Recommended starting point
                  </Badge>
                  <h2 className="text-2xl font-bold text-[#111816]">
                    Start with {featuredProduct.name}
                  </h2>
                  <p className="mt-2 max-w-3xl text-[#5E6A65]">
                    {featuredProduct.description}
                  </p>
                </div>
                <Link href={`/${locale}/contact`}>
                  <Button className="bg-[#111816] text-white hover:bg-[#2A3330] font-semibold">
                    Ask for Bulk Pricing
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function CategoryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#D7DDD9] bg-white p-3">
      <span className="text-xs text-[#5E6A65]">{label}</span>
      <p className="mt-1 text-lg font-bold text-[#111816]">{value}</p>
    </div>
  );
}

function SpecSummary({ product }: { product: Product }) {
  const specs = Object.entries(product.specs).slice(0, 3);

  return (
    <div className="flex flex-wrap gap-2">
      {specs.map(([key, value]) => (
        <span
          key={key}
          className="rounded-md border border-[#C9D2CE] bg-[#F8FAF9] px-2 py-1 text-xs"
        >
          {key}: <span className="text-[#111816]">{value}</span>
        </span>
      ))}
    </div>
  );
}
