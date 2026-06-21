"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Package, Send, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart/cart-context";
import { tx } from "@/lib/i18n/display";

export default function CheckoutPageClient({ locale }: { locale: string }) {
  const { items, totalPrice } = useCart();

  if (!items.length) {
    return (
      <div className="min-h-screen bg-[#F4F6F5]">
        <section className="border-b border-[#D7DDD9] bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Package className="mx-auto mb-5 h-12 w-12 text-[#168C5A]" />
            <h1 className="text-3xl font-bold text-[#111816]">{tx(locale, "No products selected", "尚未選擇產品")}</h1>
            <p className="mx-auto mt-3 max-w-xl text-[#5E6A65]">
              {tx(locale, "Add products to your quote cart before submitting an RFQ.", "提交詢價前，請先將產品加入詢價清單。")}
            </p>
            <Link href={`/${locale}/products`}>
              <Button className="mt-8 bg-[#111816] text-white hover:bg-[#2A3330]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {tx(locale, "Back to Products", "返回產品")}
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
          <p className="text-sm font-medium uppercase tracking-wide text-[#5E6A65]">{tx(locale, "RFQ submission", "提交詢價")}</p>
          <h1 className="mt-2 text-3xl font-bold text-[#111816]">{tx(locale, "Confirm Quote Request", "確認詢價需求")}</h1>
          <p className="mt-2 max-w-2xl text-[#5E6A65]">
            {tx(locale, "Provide buyer and shipping details. Final pricing will be confirmed by sales after checking stock, certificates, and lithium battery freight options.", "請提供買家與運輸資料。最終價格會由銷售在確認庫存、認證與鋰電池運輸方案後回覆。")}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <Card className="border-[#D7DDD9] bg-white shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2">
                <Truck className="h-5 w-5 text-[#168C5A]" />
                <h2 className="text-xl font-bold text-[#111816]">{tx(locale, "Buyer and Destination", "買家與目的地")}</h2>
              </div>
              <form action={`/${locale}/order`} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={tx(locale, "Full name", "姓名")} name="name" placeholder="John Smith" required />
                  <Field label={tx(locale, "Email", "電郵")} name="email" placeholder="john@company.com" type="email" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={tx(locale, "Company", "公司")} name="company" placeholder={tx(locale, "Company name", "公司名稱")} required />
                  <Field label="Phone / WhatsApp" name="phone" placeholder="+1 555 000 0000" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={tx(locale, "Destination country", "目的地國家")} name="country" placeholder="United States" required />
                  <Field label={tx(locale, "Preferred shipping", "偏好運輸方式")} name="shipping" placeholder={tx(locale, "Sea freight / air freight / courier", "海運 / 空運 / 快遞")} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#36423E]">{tx(locale, "RFQ notes", "詢價備註")}</label>
                  <Textarea
                    name="notes"
                    rows={6}
                    placeholder={tx(locale, "Target price, certificates, packaging, lead time, sample needs, or OEM requirements...", "目標價格、認證、包裝、交期、樣品需求或 OEM 要求...")}
                    className="border-[#C9D2CE] bg-white text-[#111816] placeholder:text-[#6B7671] focus:border-[#168C5A] focus:ring-[#168C5A]"
                  />
                </div>
                <div className="rounded-md border border-[#D7DDD9] bg-[#F8FAF9] p-4 text-sm text-[#5E6A65]">
                  <Shield className="mr-2 inline h-4 w-4 text-[#168C5A]" />
                  {tx(locale, "This is a quote request, not an online payment. Sales will confirm price, freight, and documents before order production.", "這是詢價請求，不是線上付款。銷售會在下單生產前確認價格、運費與文件。")}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" className="bg-[#111816] text-white hover:bg-[#2A3330]">
                    <Send className="mr-2 h-4 w-4" />
                    {tx(locale, "Submit RFQ", "提交詢價")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link href={`/${locale}/cart`}>
                    <Button type="button" variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {tx(locale, "Back to Cart", "返回清單")}
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="h-fit border-[#D7DDD9] bg-white shadow-sm lg:sticky lg:top-24">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-[#111816]">{tx(locale, "Selected Products", "已選產品")}</h2>
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
                      <p className="mt-1 text-sm text-[#5E6A65]">{tx(locale, "Qty", "數量")} {item.quantity} x ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-md bg-[#F8FAF9] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#5E6A65]">{tx(locale, "Reference subtotal", "參考小計")}</span>
                  <span className="text-xl font-bold text-[#126B45]">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#5E6A65]">
                  {tx(locale, "Final commercial invoice may change after stock and shipping review.", "最終商業發票會依庫存與運輸確認後調整。")}
                </p>
              </div>
              <div className="mt-5 flex gap-2 text-sm text-[#36423E]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#168C5A]" />
                <span>{tx(locale, "Quote review usually starts within 24 hours.", "詢價通常會於 24 小時內開始處理。")}</span>
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
