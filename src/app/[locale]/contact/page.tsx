import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const productCategories = [
    "18650 / 21700 cylindrical cells",
    "32650 / 32700 LiFePO4 cells",
    "LiFePO4 prismatic cells",
    "E-bike battery packs",
    "Power tool batteries",
    "FPV / LiPo packs",
    "Portable power stations",
    "Home energy storage",
    "OEM / ODM project",
  ];

  const faqs = [
    {
      question: "What information should I send for a quote?",
      answer: "Model, quantity, destination country, preferred shipping method, certificate requirements, and whether you need samples or bulk supply.",
    },
    {
      question: "Can you support OEM or custom packs?",
      answer: "Yes. For custom packs, provide voltage, capacity, dimensions, discharge current, connector, BMS, casing, and target application.",
    },
    {
      question: "Can you arrange lithium battery shipping?",
      answer: "Yes. Lithium battery shipping depends on product type, destination, quantity, and certificate documents. Sea freight, air freight, and courier options can be reviewed.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-5 border border-[#C9D2CE] bg-[#F8FAF9] text-[#36423E]">
              Sales inquiry
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-[#111816] sm:text-5xl">
              Request a battery quote
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5E6A65]">
              Send your product model, quantity, application, destination country, and
              certificate needs. Batlienergy will reply with available options and
              practical next steps.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://wa.me/8613800138000" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#111816] text-white hover:bg-[#2A3330]">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Sales
                </Button>
              </a>
              <a href="mailto:julian@batelithium.com">
                <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Inquiry
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <Card className="border-[#D7DDD9] bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#111816]">Inquiry Details</h2>
                  <p className="mt-2 text-sm text-[#5E6A65]">
                    This form prepares the information a battery salesperson needs to quote correctly.
                  </p>
                </div>
                <form action={`mailto:julian@batelithium.com`} method="post" encType="text/plain" className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="John Smith" required />
                    <Field label="Email" name="email" placeholder="john@company.com" required type="email" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Company" name="company" placeholder="Your company" />
                    <Field label="Phone / WhatsApp" name="phone" placeholder="+1 555 000 0000" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#36423E]">Product category</label>
                      <select
                        name="category"
                        className="h-11 w-full rounded-md border border-[#C9D2CE] bg-white px-3 text-sm text-[#111816] focus:border-[#168C5A] focus:outline-none focus:ring-1 focus:ring-[#168C5A]"
                      >
                        {productCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Field label="Target quantity" name="quantity" placeholder="Example: 500 pcs" required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Destination country" name="country" placeholder="Example: United States" required />
                    <Field label="Certificate needs" name="certificates" placeholder="UN38.3, CE, UL, MSDS..." />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#36423E]">Message</label>
                    <Textarea
                      name="message"
                      rows={6}
                      required
                      placeholder="Model, application, voltage/capacity, packaging, shipping method, sample needs, or OEM requirements..."
                      className="border-[#C9D2CE] bg-white text-[#111816] placeholder:text-[#6B7671] focus:border-[#168C5A] focus:ring-[#168C5A]"
                    />
                  </div>
                  <Button type="submit" className="bg-[#111816] text-white hover:bg-[#2A3330]">
                    <Send className="mr-2 h-4 w-4" />
                    Send Inquiry
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-5">
              {[
                { icon: Phone, title: "WhatsApp", text: "+86 138 0013 8000", href: "https://wa.me/8613800138000" },
                { icon: Mail, title: "Email", text: "julian@batelithium.com", href: "mailto:julian@batelithium.com" },
                { icon: MapPin, title: "Location", text: "Shenzhen, Guangdong, China" },
                { icon: Clock, title: "Response time", text: "Sales follow-up within 24 hours" },
              ].map((item) => (
                <Card key={item.title} className="border-[#D7DDD9] bg-white shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex gap-3">
                      <item.icon className="mt-0.5 h-5 w-5 text-[#168C5A]" />
                      <div>
                        <h3 className="font-semibold text-[#111816]">{item.title}</h3>
                        {item.href ? (
                          <Link href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} className="mt-1 block text-sm text-[#5E6A65] hover:text-[#168C5A]">
                            {item.text}
                          </Link>
                        ) : (
                          <p className="mt-1 text-sm text-[#5E6A65]">{item.text}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#D7DDD9] bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#111816]">Quote FAQ</h2>
            <p className="mt-2 text-[#5E6A65]">Common questions before sending a battery sourcing request.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <Card key={faq.question} className="border-[#D7DDD9] bg-[#F8FAF9] shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-[#111816]">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5E6A65]">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
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
