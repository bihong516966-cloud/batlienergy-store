"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/lib/cart/cart-context";

interface CartPageClientProps {
  locale: string;
}

export default function CartPageClient({ locale }: CartPageClientProps) {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F6F5]">
        <section className="border-b border-[#D7DDD9] bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-md bg-[#F8FAF9] ring-1 ring-[#D7DDD9]">
              <ShoppingBag className="h-8 w-8 text-[#168C5A]" />
            </div>
            <h1 className="text-4xl font-bold text-[#111816]">Quote cart is empty</h1>
            <p className="mx-auto mt-3 max-w-xl text-[#5E6A65]">
              Browse the catalog and select battery models for a bulk quotation.
            </p>
            <Link href={`/${locale}/products`}>
              <Button className="mt-8 bg-[#111816] text-white hover:bg-[#2A3330]">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const estimatedFreight = totalPrice >= 5000 ? 0 : 150;
  const quoteTotal = totalPrice + estimatedFreight;

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-[#5E6A65]">RFQ workspace</p>
              <h1 className="mt-2 text-3xl font-bold text-[#111816]">Quote Cart</h1>
              <p className="mt-2 text-[#5E6A65]">{totalItems} selected item{totalItems === 1 ? "" : "s"}</p>
            </div>
            <Button variant="outline" onClick={clearCart} className="border-[#C9D2CE] bg-white text-[#B42318] hover:bg-[#FFF4F2]">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {items.map((item) => {
                const subtotal = item.price * item.quantity;
                return (
                  <Card key={item.id} className="border-[#D7DDD9] bg-white shadow-sm">
                    <CardContent className="p-4 sm:p-5">
                      <div className="grid gap-4 md:grid-cols-[96px_1fr_auto] md:items-center">
                        <div className="relative h-24 w-24 overflow-hidden rounded-md bg-[#F8FAF9] ring-1 ring-[#D7DDD9]">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill sizes="96px" className="object-contain p-3" />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <ShoppingBag className="h-8 w-8 text-[#AAB5B0]" />
                            </div>
                          )}
                        </div>

                        <div>
                          <Link href={`/${locale}/products/${item.slug}`} className="font-semibold text-[#111816] hover:text-[#168C5A]">
                            {item.name}
                          </Link>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge className="bg-[#E7F4EE] text-[#126B45] border-0">{item.category}</Badge>
                            <Badge className="border border-[#C9D2CE] bg-white text-[#5E6A65]">B2B quote item</Badge>
                          </div>
                          <p className="mt-3 text-sm text-[#5E6A65]">
                            Unit estimate: <span className="font-semibold text-[#111816]">${item.price.toFixed(2)}</span>
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 md:items-end">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#C9D2CE] bg-white text-[#36423E] disabled:opacity-40"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-12 text-center font-semibold text-[#111816]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#C9D2CE] bg-white text-[#36423E]"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#126B45]">${subtotal.toFixed(2)}</p>
                            <button onClick={() => removeItem(item.id)} className="mt-1 text-sm text-[#B42318] hover:underline">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="h-fit border-[#D7DDD9] bg-white shadow-sm lg:sticky lg:top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-[#111816]">Quote Summary</h2>
                <div className="mt-5 space-y-3 text-sm">
                  <SummaryRow label="Product estimate" value={`$${totalPrice.toFixed(2)}`} />
                  <SummaryRow label="Estimated freight" value={estimatedFreight === 0 ? "To confirm" : `$${estimatedFreight.toFixed(2)}`} />
                  <div className="border-t border-[#D7DDD9] pt-3">
                    <SummaryRow label="RFQ total reference" value={`$${quoteTotal.toFixed(2)}`} strong />
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[#5E6A65]">
                  Final price depends on stock, battery transport method, destination, and certificate requirements.
                </p>
                <Link href={`/${locale}/checkout`} className="mt-5 block">
                  <Button className="w-full bg-[#111816] text-white hover:bg-[#2A3330]">
                    Continue RFQ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${locale}/products`} className="mt-3 block">
                  <Button variant="outline" className="w-full border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Add More Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "font-semibold text-[#111816]" : "text-[#5E6A65]"}>{label}</span>
      <span className={strong ? "text-xl font-bold text-[#126B45]" : "font-semibold text-[#111816]"}>{value}</span>
    </div>
  );
}
