import Link from "next/link";
import Image from "next/image";
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
  Category,
  getProductBySlug,
  getProductsByCategory,
  categories,
} from "@/data/products";
import { Locale } from "@/lib/i18n/config";
import { ProductCatalogLayout } from "@/components/products/ProductCatalogLayout";

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
            <span className="text-[#111816]">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Image Area */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-[#D7DDD9] bg-white shadow-sm">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain bg-white p-8"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#E8ECEA]">
                    <Zap className="h-32 w-32 text-[#168C5A]/40" />
                  </div>
                )}
                {product.badge && (
                  <Badge className="absolute left-4 top-4 bg-[#111816] text-white border-0 font-semibold text-sm px-3 py-1">
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Certification Tags */}
              {product.certifications.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-[#5E6A65] mr-2">Certifications:</span>
                  {product.certifications.map((cert) => (
                    <Badge
                      key={cert}
                      className="border border-[#C9D2CE] bg-white text-[#36423E]"
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
                <Badge className="w-fit bg-[#E7F4EE] text-[#126B45] border-0">
                  {category.name}
                </Badge>
              )}

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-[#111816] sm:text-4xl">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-lg text-[#5E6A65] leading-relaxed">
                {product.description}
              </p>

              {/* Specs Table */}
              <Card className="border-[#D7DDD9] bg-white overflow-hidden shadow-sm">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-[#D7DDD9] hover:bg-transparent">
                        <TableHead className="bg-[#E8ECEA] text-[#111816] font-semibold h-10">
                          Specification
                        </TableHead>
                        <TableHead className="bg-[#E8ECEA] text-[#111816] font-semibold h-10">
                          Details
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <TableRow
                          key={key}
                          className="border-b border-[#D7DDD9] hover:bg-[#F4F6F5]"
                        >
                          <TableCell className="text-[#5E6A65] font-medium py-3">
                            {key}
                          </TableCell>
                          <TableCell className="text-[#111816] py-3">
                            {value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Pricing */}
              <div className="rounded-lg border border-[#D7DDD9] bg-white p-6 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* B2B Price */}
                  <div className="rounded-md border border-[#D7DDD9] bg-[#F8FAF9] p-4">
                    <span className="text-sm text-[#5E6A65]">B2B Price</span>
                    <p className="mt-1 text-2xl font-bold text-[#126B45]">
                      ${product.price.b2b.min} - ${product.price.b2b.max}
                    </p>
                    <span className="text-xs text-[#5E6A65]">
                      {product.price.b2b.currency} per unit
                    </span>
                  </div>

                  {/* Retail Price (if available) */}
                  {product.price.retail ? (
                    <div className="rounded-md border border-[#D7DDD9] bg-[#F8FAF9] p-4">
                      <span className="text-sm text-[#5E6A65]">Retail Price</span>
                      <p className="mt-1 text-2xl font-bold text-[#111816]">
                        ${product.price.retail.min} - ${product.price.retail.max}
                      </p>
                      <span className="text-xs text-[#5E6A65]">
                        {product.price.retail.currency} per unit
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-md border border-[#D7DDD9] bg-[#F8FAF9] p-4">
                      <span className="text-sm text-[#5E6A65]">MOQ</span>
                      <div className="mt-1 flex items-center gap-2">
                        <Package className="h-6 w-6 text-[#168C5A]" />
                        <p className="text-2xl font-bold text-[#111816]">
                          {product.moq} pcs
                        </p>
                      </div>
                      <span className="text-xs text-[#5E6A65]">
                        Minimum order quantity
                      </span>
                    </div>
                  )}
                </div>

                {/* MOQ (if retail price exists) */}
                {product.price.retail && (
                  <div className="mt-4 flex items-center gap-2 rounded-md border border-[#D7DDD9] bg-[#F8FAF9] p-3">
                    <Package className="h-5 w-5 text-[#168C5A]" />
                    <span className="text-sm text-[#5E6A65]">
                      Minimum Order Quantity:{" "}
                      <span className="font-semibold text-[#111816]">
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
                    className="w-full bg-[#111816] text-white hover:bg-[#2A3330] font-semibold h-12"
                  >
                    Request Quote
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
                    className="w-full border-[#25D366] bg-white text-[#1A8F4D] hover:bg-[#E7F4EE] h-12"
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
        <section className="border-t border-[#D7DDD9] bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#111816] sm:text-3xl">
                  Related Products
                </h2>
                <p className="mt-2 text-[#5E6A65]">
                  More from {category?.name}
                </p>
              </div>
              <Link href={`/${locale}/products`} className="hidden sm:flex">
                <Button
                  variant="outline"
                  className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]"
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
                  <Card className="card-hover h-full overflow-hidden border-[#D7DDD9] bg-[#F8FAF9] shadow-sm">
                    <div className="relative aspect-square bg-white flex items-center justify-center">
                      {rp.images[0] ? (
                        <Image
                          src={rp.images[0]}
                          alt={rp.name}
                          fill
                          loading="eager"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-contain bg-white p-5 transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <Zap className="h-12 w-12 text-[#168C5A]/40 group-hover:text-[#168C5A]/70 transition-colors" />
                      )}
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-[#E7F4EE] text-[#126B45] border-0">
                        {category?.name}
                      </Badge>
                      <h3 className="font-semibold text-[#111816] group-hover:text-[#168C5A] transition-colors line-clamp-1">
                        {rp.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#5E6A65] line-clamp-2">
                        {rp.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#126B45]">
                          ${rp.price.b2b.min}-${rp.price.b2b.max}
                        </span>
                        <span className="text-xs text-[#5E6A65]">
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
              className="text-[#5E6A65] hover:text-[#168C5A]"
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

  return (
    <ProductCatalogLayout
      locale={locale}
      activeCategoryId={category.id}
      title={category.name}
      eyebrow="Battery category catalog"
      description={category.description}
      products={categoryProducts}
    />
  );
}
