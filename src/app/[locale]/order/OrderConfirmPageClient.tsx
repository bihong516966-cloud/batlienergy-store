"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Mail, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tx } from "@/lib/i18n/display";

export default function OrderConfirmPageClient({ locale }: { locale: string }) {
  const [rfqNumber] = useState(
    () => `BL-RFQ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
  );

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F4EE]">
            <CheckCircle2 className="h-9 w-9 text-[#168C5A]" />
          </div>
          <Badge className="mb-4 bg-[#E7F4EE] text-[#126B45] border-0">
            {tx(locale, "RFQ received", "已收到詢價")}
          </Badge>
          <h1 className="text-4xl font-bold text-[#111816]">{tx(locale, "Quote request submitted", "詢價需求已提交")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#5E6A65]">
            {tx(locale, "Thank you. Batlienergy will review your product models, quantity, destination, and certificate needs before confirming pricing and freight.", "謝謝。Batlienergy 會先審核您的產品型號、數量、目的地與認證需求，再確認價格與運費。")}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_360px]">
          <Card className="border-[#D7DDD9] bg-white shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <p className="text-sm text-[#5E6A65]">{tx(locale, "Reference number", "參考編號")}</p>
              <p className="mt-1 text-2xl font-bold text-[#111816]">{rfqNumber}</p>

              <div className="mt-8 space-y-4">
                {[
                  tx(locale, "Sales checks stock, MOQ, and matching product options.", "銷售會確認庫存、起訂量與合適產品方案。"),
                  tx(locale, "Freight options are reviewed according to lithium battery transport rules.", "會依鋰電池運輸規則評估物流方案。"),
                  tx(locale, "You receive a quotation with price, lead time, and required documents.", "您會收到包含價格、交期與所需文件的報價。"),
                ].map((item, index) => (
                  <div key={item} className="flex gap-4 border-l-2 border-[#168C5A] bg-[#F8FAF9] p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111816] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-[#5E6A65]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/8613800138000?text=${encodeURIComponent(`Hi, I submitted RFQ ${rfqNumber}. Please help confirm the details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#111816] text-white hover:bg-[#2A3330]">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp {tx(locale, "Sales", "銷售")}
                  </Button>
                </a>
                <a href="mailto:julian@batelithium.com">
                  <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                    <Mail className="mr-2 h-4 w-4" />
                    {tx(locale, "Email Sales", "電郵聯絡銷售")}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-5">
            <Card className="border-[#D7DDD9] bg-white shadow-sm">
              <CardContent className="p-6">
                <Clock className="mb-4 h-6 w-6 text-[#168C5A]" />
                <h2 className="font-semibold text-[#111816]">{tx(locale, "Expected response", "預計回覆")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5E6A65]">
                  {tx(locale, "Most quote requests are reviewed within 24 hours on business days.", "大多數詢價會於工作日 24 小時內處理。")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#D7DDD9] bg-white shadow-sm">
              <CardContent className="p-6">
                <Shield className="mb-4 h-6 w-6 text-[#168C5A]" />
                <h2 className="font-semibold text-[#111816]">{tx(locale, "Before payment", "付款前確認")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5E6A65]">
                  {tx(locale, "Final price, lead time, certificate documents, and shipping method are confirmed before any payment request.", "任何付款前都會先確認最終價格、交期、認證文件與運輸方式。")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          <Link href={`/${locale}/products`}>
            <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
              {tx(locale, "Continue Browsing", "繼續瀏覽")}
            </Button>
          </Link>
          <Link href={`/${locale}`}>
            <Button className="bg-[#111816] text-white hover:bg-[#2A3330]">
              {tx(locale, "Back to Home", "返回首頁")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
