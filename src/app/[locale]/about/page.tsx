import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Globe,
  Users,
  Zap,
  Factory,
  Award,
  Target,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const stats = [
    {
      icon: Zap,
      value: "8+",
      label: "Years Experience",
      description: "Industry-leading expertise since 2016",
    },
    {
      icon: Globe,
      value: "50+",
      label: "Countries Served",
      description: "Global presence across six continents",
    },
    {
      icon: Factory,
      value: "10M+",
      label: "Cells/Year",
      description: "High-capacity automated production",
    },
    {
      icon: Users,
      value: "200+",
      label: "Staff Members",
      description: "Dedicated team of professionals",
    },
  ];

  const certifications = [
    "UN38.3",
    "CE",
    "UL",
    "IEC 62619",
    "ISO 9001",
    "MSDS",
    "RoHS",
  ];

  const capabilities = [
    {
      icon: Factory,
      title: "Automated Production Lines",
      description:
        "State-of-the-art automated manufacturing facilities with an annual output exceeding 10 million lithium battery cells. Our production lines feature precision assembly, automated optical inspection, and real-time process monitoring to ensure every cell meets the highest quality standards.",
    },
    {
      icon: Shield,
      title: "Strict Quality Control",
      description:
        "Every battery undergoes rigorous multi-stage testing including capacity grading, cycle life testing, safety stress tests, and environmental reliability assessments. Our quality management system is ISO 9001 certified, ensuring consistent excellence from raw materials to finished products.",
    },
    {
      icon: Award,
      title: "Professional R&D Team",
      description:
        "Our dedicated R&D department consists of senior battery engineers and material scientists with decades of combined experience. We continuously innovate in cell chemistry, BMS design, and pack engineering to deliver cutting-edge energy storage solutions tailored to diverse industry needs.",
    },
  ];

  const markets = [
    { region: "Europe", countries: "Germany, UK, France, Italy, Spain, Netherlands" },
    { region: "North America", countries: "USA, Canada, Mexico" },
    { region: "Southeast Asia", countries: "Vietnam, Thailand, Indonesia, Philippines, Malaysia" },
    { region: "Middle East", countries: "UAE, Saudi Arabia, Qatar, Oman" },
    { region: "Africa", countries: "South Africa, Nigeria, Kenya, Egypt" },
    { region: "South America", countries: "Brazil, Chile, Colombia, Argentina" },
  ];

  return (
    <div style={{ backgroundColor: "#0A1628" }} className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#111D2E] to-[#0A1628]" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, #00E676 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge
            className="mb-6 px-4 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: "rgba(0, 230, 118, 0.15)",
              color: "#00E676",
              border: "1px solid rgba(0, 230, 118, 0.3)",
            }}
          >
            Since 2016
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About{" "}
            <span style={{ color: "#00E676" }}>Batlienergy</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Powering the future with professional lithium battery solutions.
            Shenzhen Batlienergy Technology Co., Ltd. is your trusted partner
            for high-performance energy storage worldwide.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Who We Are
            </h2>
            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full"
              style={{ backgroundColor: "#00E676" }}
            />
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Shenzhen Batlienergy Technology Co., Ltd., founded in 2016, is a
              professional lithium battery manufacturer integrating research,
              development, production, and sales. Headquartered in Shenzhen,
              China, we specialize in lithium iron phosphate (LiFePO4) cells,
              lithium-ion battery packs, and customized energy storage systems
              for a wide range of applications including solar energy storage,
              electric vehicles, telecom base stations, marine, and industrial
              equipment.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              With a strong commitment to innovation, quality, and customer
              satisfaction, Batlienergy has grown into a globally recognized
              brand serving clients across more than 50 countries. We take pride
              in delivering reliable, safe, and cost-effective battery solutions
              that empower businesses and communities around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="text-center transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundColor: "#111D2E",
                  border: "1px solid #1E3A5F",
                }}
              >
                <CardContent className="p-8">
                  <div
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(0, 230, 118, 0.1)" }}
                  >
                    <stat.icon className="h-7 w-7" style={{ color: "#00E676" }} />
                  </div>
                  <p
                    className="mt-4 text-4xl font-bold"
                    style={{ color: "#00E676" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Our Mission &amp; Vision
            </h2>
            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full"
              style={{ backgroundColor: "#00E676" }}
            />
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Mission */}
            <Card
              className="transition-transform duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "#111D2E",
                border: "1px solid #1E3A5F",
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(0, 230, 118, 0.1)" }}
                  >
                    <Target className="h-6 w-6" style={{ color: "#00E676" }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="mt-6 text-gray-300 leading-7">
                  To provide the world with safe, reliable, and innovative
                  lithium battery solutions that accelerate the global transition
                  to clean energy. We are committed to delivering products of the
                  highest quality at competitive prices, while maintaining
                  exceptional customer service and long-term partnerships with
                  businesses worldwide.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Deliver industry-leading product quality and safety",
                    "Provide customized battery solutions for diverse applications",
                    "Build lasting partnerships through trust and transparency",
                    "Drive innovation in energy storage technology",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-300">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: "#00E676" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card
              className="transition-transform duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "#111D2E",
                border: "1px solid #1E3A5F",
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(0, 230, 118, 0.1)" }}
                  >
                    <Eye className="h-6 w-6" style={{ color: "#00E676" }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="mt-6 text-gray-300 leading-7">
                  To become a global leader in lithium battery manufacturing and
                  energy storage solutions, recognized for our technological
                  excellence, environmental responsibility, and unwavering
                  commitment to customer success. We envision a future powered by
                  clean, efficient, and accessible energy storage for all.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Become a top-10 global lithium battery manufacturer",
                    "Expand to 100+ countries by 2030",
                    "Pioneer next-generation solid-state battery technology",
                    "Achieve carbon-neutral manufacturing operations",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-300">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: "#00E676" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Certifications &amp; Compliance
            </h2>
            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full"
              style={{ backgroundColor: "#00E676" }}
            />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              Our products meet the most stringent international safety and
              quality standards, giving you confidence in every battery we
              deliver.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 rounded-xl px-6 py-4 transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundColor: "#111D2E",
                  border: "1px solid #1E3A5F",
                }}
              >
                <Shield className="h-5 w-5" style={{ color: "#00E676" }} />
                <span className="text-lg font-semibold text-white">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Capabilities */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Production Capabilities
            </h2>
            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full"
              style={{ backgroundColor: "#00E676" }}
            />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              Equipped with cutting-edge technology and a skilled workforce, our
              manufacturing capabilities are designed to meet the demands of
              global markets.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <Card
                key={cap.title}
                className="transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#111D2E",
                  border: "1px solid #1E3A5F",
                }}
              >
                <CardContent className="p-8">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(0, 230, 118, 0.1)" }}
                  >
                    <cap.icon className="h-6 w-6" style={{ color: "#00E676" }} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-gray-300 leading-7">
                    {cap.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Global Reach
            </h2>
            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full"
              style={{ backgroundColor: "#00E676" }}
            />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              Batlienergy products are trusted by businesses and organizations
              across six continents, delivering reliable power solutions wherever
              they are needed.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((market) => (
              <Card
                key={market.region}
                className="transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#111D2E",
                  border: "1px solid #1E3A5F",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5" style={{ color: "#00E676" }} />
                    <h3 className="text-lg font-bold text-white">
                      {market.region}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    {market.countries}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card
            className="relative overflow-hidden"
            style={{
              backgroundColor: "#111D2E",
              border: "1px solid #1E3A5F",
            }}
          >
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full -translate-y-1/2 translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(circle, #00E676 0%, transparent 70%)",
                }}
              />
            </div>
            <CardContent className="relative p-12 text-center lg:p-16">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Partner with Us?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
                Whether you need custom battery solutions, bulk orders, or
                technical consultation, our team is ready to help. Let us power
                your business with reliable lithium battery technology.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={`/${locale}/contact`}>
                  <Button
                    size="lg"
                    className="font-semibold text-black transition-transform duration-200 hover:scale-105"
                    style={{ backgroundColor: "#00E676" }}
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${locale}/products`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-semibold text-white transition-transform duration-200 hover:scale-105"
                    style={{
                      borderColor: "#00E676",
                      backgroundColor: "transparent",
                    }}
                  >
                    Browse Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
