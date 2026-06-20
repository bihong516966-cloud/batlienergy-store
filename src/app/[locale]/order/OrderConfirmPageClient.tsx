"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Mail, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrderConfirmPageClient({ locale }: { locale: string }) {
  const [rfqNumber, setRfqNumber] = useState("BL-RFQ-PENDING");

  useEffect(() => {
    setRfqNumber(`BL-RFQ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F4EE]">
            <CheckCircle2 className="h-9 w-9 text-[#168C5A]" />
          </div>
          <Badge className="mb-4 bg-[#E7F4EE] text-[#126B45] border-0">
            RFQ received
          </Badge>
          <h1 className="text-4xl font-bold text-[#111816]">Quote request submitted</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#5E6A65]">
            Thank you. Batlienergy will review your product models, quantity,
            destination, and certificate needs before confirming pricing and freight.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_360px]">
          <Card className="border-[#D7DDD9] bg-white shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <p className="text-sm text-[#5E6A65]">Reference number</p>
              <p className="mt-1 text-2xl font-bold text-[#111816]">{rfqNumber}</p>

              <div className="mt-8 space-y-4">
                {[
                  "Sales checks stock, MOQ, and matching product options.",
                  "Freight options are reviewed according to lithium battery transport rules.",
                  "You receive a quotation with price, lead time, and required documents.",
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
                    WhatsApp Sales
                  </Button>
                </a>
                <a href="mailto:julian@batelithium.com">
                  <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Sales
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-5">
            <Card className="border-[#D7DDD9] bg-white shadow-sm">
              <CardContent className="p-6">
                <Clock className="mb-4 h-6 w-6 text-[#168C5A]" />
                <h2 className="font-semibold text-[#111816]">Expected response</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5E6A65]">
                  Most quote requests are reviewed within 24 hours on business days.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#D7DDD9] bg-white shadow-sm">
              <CardContent className="p-6">
                <Shield className="mb-4 h-6 w-6 text-[#168C5A]" />
                <h2 className="font-semibold text-[#111816]">Before payment</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5E6A65]">
                  Final price, lead time, certificate documents, and shipping method are confirmed before any payment request.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          <Link href={`/${locale}/products`}>
            <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
              Continue Browsing
            </Button>
          </Link>
          <Link href={`/${locale}`}>
            <Button className="bg-[#111816] text-white hover:bg-[#2A3330]">
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
