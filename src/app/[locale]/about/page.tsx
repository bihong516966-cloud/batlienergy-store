import Link from "next/link";
import { ArrowRight, Award, Factory, Globe, Shield, Target, Truck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const stats = [
    { value: "8+", label: "Years in battery supply" },
    { value: "50+", label: "Export markets" },
    { value: "10M+", label: "Cells supplied yearly" },
    { value: "200+", label: "Factory and sourcing partners" },
  ];

  const capabilities = [
    {
      icon: Factory,
      title: "Cell and pack sourcing",
      desc: "Mainstream cylindrical cells, LiFePO4 cells, e-bike packs, tool batteries, LiPo packs, and storage systems.",
    },
    {
      icon: Shield,
      title: "Compliance support",
      desc: "UN38.3, CE, UL, IEC62619, MSDS, RoHS, and export document preparation depending on product line.",
    },
    {
      icon: Truck,
      title: "Export logistics",
      desc: "Packaging, labeling, carton planning, sea freight, air freight, and courier options for lithium batteries.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <Badge className="mb-5 border border-[#C9D2CE] bg-[#F8FAF9] text-[#36423E]">
                Battery supplier profile
              </Badge>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#111816] sm:text-5xl">
                Industrial battery sourcing for global B2B customers
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5E6A65]">
                Batlienergy helps distributors, repair businesses, OEM buyers, and project
                teams source reliable lithium battery cells and packs with clear pricing,
                MOQ, specifications, certificates, and export support.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/products`}>
                  <Button className="bg-[#111816] text-white hover:bg-[#2A3330]">
                    View Product Catalog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${locale}/contact`}>
                  <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                    Request Company Quote
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
            <h2 className="text-3xl font-bold text-[#111816]">What Batlienergy Focuses On</h2>
            <p className="mt-2 max-w-3xl text-[#5E6A65]">
              A professional battery website should quickly answer what can be sourced,
              whether export is feasible, and how buyers can request pricing.
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
              <Badge className="mb-4 bg-[#E7F4EE] text-[#126B45]">Buyer workflow</Badge>
              <h2 className="text-3xl font-bold text-[#111816]">From model selection to shipment</h2>
              <div className="mt-6 space-y-4">
                {[
                  ["1", "Share target model, quantity, destination, and certificate needs."],
                  ["2", "Confirm stock, specification, packaging, and battery transport requirements."],
                  ["3", "Receive quotation with MOQ, lead time, and shipment options."],
                  ["4", "Arrange sample, bulk order, or OEM project follow-up."],
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
              <Badge className="mb-4 bg-[#E7F4EE] text-[#126B45]">Trust signals</Badge>
              <h2 className="text-3xl font-bold text-[#111816]">Built for repeat B2B purchasing</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Award, label: "Certificate-first product selection" },
                  { icon: Globe, label: "Export market experience" },
                  { icon: Target, label: "MOQ and price transparency" },
                  { icon: Users, label: "Supplier and factory coordination" },
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
              <h2 className="text-3xl font-bold">Ready to source battery products?</h2>
              <p className="mt-2 max-w-2xl text-[#C9D2CE]">
                Send the product category, target quantity, and destination country.
                The team can help prepare a practical battery quotation.
              </p>
            </div>
            <Link href={`/${locale}/contact`}>
              <Button className="bg-white text-[#111816] hover:bg-[#E8ECEA]">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
