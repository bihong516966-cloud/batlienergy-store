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

  if (!product) {
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
