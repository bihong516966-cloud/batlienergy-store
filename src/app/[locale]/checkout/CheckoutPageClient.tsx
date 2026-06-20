"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Package, Send, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart/cart-context";

export default function CheckoutPageClient({ locale }: { locale: string }) {
  const { items, totalPrice } = useCart();

  if (!items.length) {
    return (
      <div className="min-h-screen bg-[#F4F6F5]">
        <section className="border-b border-[#D7DDD9] bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Package className="mx-auto mb-5 h-12 w-12 text-[#168C5A]" />
            <h1 className="text-3xl font-bold text-[#111816]">No products selected</h1>
            <p className="mx-auto mt-3 max-w-xl text-[#5E6A65]">
              Add products to your quote cart before submitting an RFQ.
            </p>
            <Link href={`/${locale}/products`}>
              <Button className="mt-8 bg-[#111816] text-white hover:bg-[#2A3330]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white py-10">
        <div className="container mx-auto px-4">
          <p className="text-sm font-medium uppercase tracking-wide text-[#5E6A65]">RFQ submission</p>
          <h1 className="mt-2 text-3xl font-bold text-[#111816]">Confirm Quote Request</h1>
          <p className="mt-2 max-w-2xl text-[#5E6A65]">
            Provide buyer and shipping details. Final pricing will be confirmed by sales after checking stock, certificates, and lithium battery freight options.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <Card className="border-[#D7DDD9] bg-white shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2">
                <Truck className="h-5 w-5 text-[#168C5A]" />
                <h2 className="text-xl font-bold text-[#111816]">Buyer and Destination</h2>
              </div>
              <form action={`/${locale}/order`} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" placeholder="John Smith" required />
                  <Field label="Email" name="email" placeholder="john@company.com" type="email" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Company" name="company" placeholder="Company name" required />
                  <Field label="Phone / WhatsApp" name="phone" placeholder="+1 555 000 0000" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Destination country" name="country" placeholder="United States" required />
                  <Field label="Preferred shipping" name="shipping" placeholder="Sea freight / air freight / courier" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#36423E]">RFQ notes</label>
                  <Textarea
                    name="notes"
                    rows={6}
                    placeholder="Target price, certificates, packaging, lead time, sample needs, or OEM requirements..."
                    className="border-[#C9D2CE] bg-white text-[#111816] placeholder:text-[#6B7671] focus:border-[#168C5A] focus:ring-[#168C5A]"
                  />
                </div>
                <div className="rounded-md border border-[#D7DDD9] bg-[#F8FAF9] p-4 text-sm text-[#5E6A65]">
                  <Shield className="mr-2 inline h-4 w-4 text-[#168C5A]" />
                  This is a quote request, not an online payment. Sales will confirm price, freight, and documents before order production.
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" className="bg-[#111816] text-white hover:bg-[#2A3330]">
                    <Send className="mr-2 h-4 w-4" />
                    Submit RFQ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link href={`/${locale}/cart`}>
                    <Button type="button" variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Cart
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="h-fit border-[#D7DDD9] bg-white shadow-sm lg:sticky lg:top-24">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-[#111816]">Selected Products</h2>
              <div className="mt-5 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-[56px_1fr] gap-3 border-b border-[#D7DDD9] pb-4 last:border-b-0">
                    <div className="relative h-14 w-14 overflow-hidden rounded-md bg-[#F8FAF9] ring-1 ring-[#D7DDD9]">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill sizes="56px" className="object-contain p-2" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="h-5 w-5 text-[#AAB5B0]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[#111816]">{item.name}</p>
                      <p className="mt-1 text-sm text-[#5E6A65]">Qty {item.quantity} x ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-md bg-[#F8FAF9] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#5E6A65]">Reference subtotal</span>
                  <span className="text-xl font-bold text-[#126B45]">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#5E6A65]">
                  Final commercial invoice may change after stock and shipping review.
                </p>
              </div>
              <div className="mt-5 flex gap-2 text-sm text-[#36423E]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#168C5A]" />
                <span>Quote review usually starts within 24 hours.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#36423E]">
        {label}
        {required ? <span className="text-[#168C5A]"> *</span> : null}
      </label>
      <Input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 border-[#C9D2CE] bg-white text-[#111816] placeholder:text-[#6B7671] focus:border-[#168C5A] focus:ring-[#168C5A]"
      />
    </div>
  );
}
