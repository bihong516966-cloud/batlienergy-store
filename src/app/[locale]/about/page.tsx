import Link from "next/link";
import { ArrowRight, Award, Factory, Globe, Shield, Target, Truck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tx } from "@/lib/i18n/display";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const stats = [
    { value: "8+", label: tx(locale, "Years in battery supply", "電池供應經驗") },
    { value: "50+", label: tx(locale, "Export markets", "出口市場") },
    { value: "10M+", label: tx(locale, "Cells supplied yearly", "年供應電芯") },
    { value: "200+", label: tx(locale, "Factory and sourcing partners", "工廠與供應鏈夥伴") },
  ];

  const capabilities = [
    {
      icon: Factory,
      title: tx(locale, "Cell and pack sourcing", "電芯與電池組採購"),
      desc: tx(locale, "Mainstream cylindrical cells, LiFePO4 cells, e-bike packs, tool batteries, LiPo packs, and storage systems.", "主流圓柱電芯、磷酸鐵鋰電芯、電動自行車電池、工具電池、LiPo 電池與儲能系統。"),
    },
    {
      icon: Shield,
      title: tx(locale, "Compliance support", "認證文件支援"),
      desc: tx(locale, "UN38.3, CE, UL, IEC62619, MSDS, RoHS, and export document preparation depending on product line.", "依產品線配合 UN38.3、CE、UL、IEC62619、MSDS、RoHS 與出口文件準備。"),
    },
    {
      icon: Truck,
      title: tx(locale, "Export logistics", "出口物流協調"),
      desc: tx(locale, "Packaging, labeling, carton planning, sea freight, air freight, and courier options for lithium batteries.", "協助鋰電池包裝、標籤、裝箱規劃、海運、空運與快遞方案評估。"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <Badge className="mb-5 border border-[#C9D2CE] bg-[#F8FAF9] text-[#36423E]">
                {tx(locale, "Battery supplier profile", "電池供應商簡介")}
              </Badge>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#111816] sm:text-5xl">
                {tx(locale, "Industrial battery sourcing for global B2B customers", "面向全球 B2B 客戶的工業電池採購支援")}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5E6A65]">
                {tx(
                  locale,
                  "Batlienergy helps distributors, repair businesses, OEM buyers, and project teams source reliable lithium battery cells and packs with clear pricing, MOQ, specifications, certificates, and export support.",
                  "Batlienergy 協助經銷商、維修商、OEM 買家與項目團隊採購可靠鋰電池電芯與電池組，提供清晰價格、起訂量、規格、認證與出口支援。"
                )}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/products`}>
                  <Button className="bg-[#111816] text-white hover:bg-[#2A3330]">
                    {tx(locale, "View Product Catalog", "查看產品目錄")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${locale}/contact`}>
                  <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                    {tx(locale, "Request Company Quote", "索取公司報價")}
                  </Button>
                </Link>
              </div>
            </div>
            <Card className="border-[#D7DDD9] bg-[#F8FAF9] shadow-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="border-l-2 border-[#168C5A] bg-white p-4">
                      <p className="text-3xl font-bold text-[#111816]">{stat.value}</p>
                      <p className="mt-1 text-sm text-[#5E6A65]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#111816]">
              {tx(locale, "What Batlienergy Focuses On", "Batlienergy 專注方向")}
            </h2>
            <p className="mt-2 max-w-3xl text-[#5E6A65]">
              {tx(locale, "A professional battery website should quickly answer what can be sourced, whether export is feasible, and how buyers can request pricing.", "專業電池網站應讓買家快速了解可採購產品、出口是否可行，以及如何取得報價。")}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {capabilities.map((item) => (
              <Card key={item.title} className="border-[#D7DDD9] bg-[#F8FAF9] shadow-sm">
                <CardContent className="p-6">
                  <item.icon className="mb-5 h-7 w-7 text-[#168C5A]" />
                  <h3 className="font-semibold text-[#111816]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5E6A65]">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#D7DDD9] bg-[#F4F6F5] py-14">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 bg-[#E7F4EE] text-[#126B45]">{tx(locale, "Buyer workflow", "買家流程")}</Badge>
              <h2 className="text-3xl font-bold text-[#111816]">{tx(locale, "From model selection to shipment", "從選型到出貨")}</h2>
              <div className="mt-6 space-y-4">
                {[
                  ["1", tx(locale, "Share target model, quantity, destination, and certificate needs.", "提供目標型號、數量、目的地與認證需求。")],
                  ["2", tx(locale, "Confirm stock, specification, packaging, and battery transport requirements.", "確認庫存、規格、包裝與鋰電池運輸要求。")],
                  ["3", tx(locale, "Receive quotation with MOQ, lead time, and shipment options.", "取得包含起訂量、交期與運輸方案的報價。")],
                  ["4", tx(locale, "Arrange sample, bulk order, or OEM project follow-up.", "安排樣品、批量訂單或 OEM 項目跟進。")],
                ].map(([step, text]) => (
                  <div key={step} className="flex gap-4 border-l-2 border-[#168C5A] bg-white p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111816] text-sm font-bold text-white">
                      {step}
                    </span>
                    <p className="text-sm leading-relaxed text-[#5E6A65]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Badge className="mb-4 bg-[#E7F4EE] text-[#126B45]">{tx(locale, "Trust signals", "信任要素")}</Badge>
              <h2 className="text-3xl font-bold text-[#111816]">{tx(locale, "Built for repeat B2B purchasing", "適合長期 B2B 採購")}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Award, label: tx(locale, "Certificate-first product selection", "以認證需求優先選型") },
                  { icon: Globe, label: tx(locale, "Export market experience", "出口市場經驗") },
                  { icon: Target, label: tx(locale, "MOQ and price transparency", "起訂量與價格透明") },
                  { icon: Users, label: tx(locale, "Supplier and factory coordination", "供應商與工廠協調") },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 bg-white p-4">
                    <item.icon className="mt-0.5 h-5 w-5 text-[#168C5A]" />
                    <p className="text-sm font-medium text-[#36423E]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111816] py-14 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">{tx(locale, "Ready to source battery products?", "準備採購電池產品？")}</h2>
              <p className="mt-2 max-w-2xl text-[#C9D2CE]">
                {tx(locale, "Send the product category, target quantity, and destination country. The team can help prepare a practical battery quotation.", "請提供產品分類、目標數量與目的地國家，團隊可協助準備實用的電池報價。")}
              </p>
            </div>
            <Link href={`/${locale}/contact`}>
              <Button className="bg-white text-[#111816] hover:bg-[#E8ECEA]">
                {tx(locale, "Contact Sales", "聯絡銷售")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
