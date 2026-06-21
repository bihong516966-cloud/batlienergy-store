import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { tx } from "@/lib/i18n/display";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const productCategories = [
    tx(locale, "18650 / 21700 cylindrical cells", "18650 / 21700 圓柱電芯"),
    tx(locale, "32650 / 32700 LiFePO4 cells", "32650 / 32700 磷酸鐵鋰電芯"),
    tx(locale, "LiFePO4 prismatic cells", "磷酸鐵鋰方形電芯"),
    tx(locale, "E-bike battery packs", "電動自行車電池包"),
    tx(locale, "Power tool batteries", "電動工具電池"),
    tx(locale, "FPV / LiPo packs", "FPV / LiPo 電池包"),
    tx(locale, "Portable power stations", "便攜式儲能電源"),
    tx(locale, "Home energy storage", "家用儲能"),
    tx(locale, "OEM / ODM project", "OEM / ODM 項目"),
  ];

  const faqs = [
    {
      question: tx(locale, "What information should I send for a quote?", "詢價時需要提供哪些資料？"),
      answer: tx(locale, "Model, quantity, destination country, preferred shipping method, certificate requirements, and whether you need samples or bulk supply.", "請提供型號、數量、目的地國家、偏好的運輸方式、認證需求，以及是否需要樣品或批量供應。"),
    },
    {
      question: tx(locale, "Can you support OEM or custom packs?", "可以支援 OEM 或客製化電池包嗎？"),
      answer: tx(locale, "Yes. For custom packs, provide voltage, capacity, dimensions, discharge current, connector, BMS, casing, and target application.", "可以。客製化電池包請提供電壓、容量、尺寸、放電電流、接頭、BMS、外殼與目標應用。"),
    },
    {
      question: tx(locale, "Can you arrange lithium battery shipping?", "可以安排鋰電池出口運輸嗎？"),
      answer: tx(locale, "Yes. Lithium battery shipping depends on product type, destination, quantity, and certificate documents. Sea freight, air freight, and courier options can be reviewed.", "可以。鋰電池運輸取決於產品類型、目的地、數量與認證文件，可評估海運、空運與快遞方案。"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <section className="border-b border-[#D7DDD9] bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-5 border border-[#C9D2CE] bg-[#F8FAF9] text-[#36423E]">
              {tx(locale, "Sales inquiry", "銷售詢價")}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-[#111816] sm:text-5xl">
              {tx(locale, "Request a battery quote", "索取電池報價")}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5E6A65]">
              {tx(locale, "Send your product model, quantity, application, destination country, and certificate needs. Batlienergy will reply with available options and practical next steps.", "請提供產品型號、數量、用途、目的地國家與認證需求。Batlienergy 會回覆可供方案與下一步建議。")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://wa.me/8613800138000" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#111816] text-white hover:bg-[#2A3330]">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp {tx(locale, "Sales", "銷售")}
                </Button>
              </a>
              <a href="mailto:julian@batelithium.com">
                <Button variant="outline" className="border-[#C9D2CE] bg-white text-[#111816] hover:bg-[#E8ECEA]">
                  <Mail className="mr-2 h-4 w-4" />
                  {tx(locale, "Email Inquiry", "電郵詢價")}
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
                  <h2 className="text-2xl font-bold text-[#111816]">{tx(locale, "Inquiry Details", "詢價資料")}</h2>
                  <p className="mt-2 text-sm text-[#5E6A65]">
                    {tx(locale, "This form prepares the information a battery salesperson needs to quote correctly.", "此表單會整理銷售報價所需的基本資料。")}
                  </p>
                </div>
                <form action={`mailto:julian@batelithium.com`} method="post" encType="text/plain" className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={tx(locale, "Full name", "姓名")} name="name" placeholder="John Smith" required />
                    <Field label={tx(locale, "Email", "電郵")} name="email" placeholder="john@company.com" required type="email" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={tx(locale, "Company", "公司")} name="company" placeholder={tx(locale, "Your company", "您的公司")} />
                    <Field label="Phone / WhatsApp" name="phone" placeholder="+1 555 000 0000" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#36423E]">{tx(locale, "Product category", "產品分類")}</label>
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
                    <Field label={tx(locale, "Target quantity", "目標數量")} name="quantity" placeholder={tx(locale, "Example: 500 pcs", "例如：500 pcs")} required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={tx(locale, "Destination country", "目的地國家")} name="country" placeholder={tx(locale, "Example: United States", "例如：United States")} required />
                    <Field label={tx(locale, "Certificate needs", "認證需求")} name="certificates" placeholder="UN38.3, CE, UL, MSDS..." />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#36423E]">{tx(locale, "Message", "留言內容")}</label>
                    <Textarea
                      name="message"
                      rows={6}
                      required
                      placeholder={tx(locale, "Model, application, voltage/capacity, packaging, shipping method, sample needs, or OEM requirements...", "型號、用途、電壓/容量、包裝、運輸方式、樣品需求或 OEM 要求...")}
                      className="border-[#C9D2CE] bg-white text-[#111816] placeholder:text-[#6B7671] focus:border-[#168C5A] focus:ring-[#168C5A]"
                    />
                  </div>
                  <Button type="submit" className="bg-[#111816] text-white hover:bg-[#2A3330]">
                    <Send className="mr-2 h-4 w-4" />
                    {tx(locale, "Send Inquiry", "發送詢價")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-5">
              {[
                { icon: Phone, title: "WhatsApp", text: "+86 138 0013 8000", href: "https://wa.me/8613800138000" },
                { icon: Mail, title: "Email", text: "julian@batelithium.com", href: "mailto:julian@batelithium.com" },
                { icon: MapPin, title: tx(locale, "Location", "地點"), text: tx(locale, "Shenzhen, Guangdong, China", "中國廣東深圳") },
                { icon: Clock, title: tx(locale, "Response time", "回覆時間"), text: tx(locale, "Sales follow-up within 24 hours", "銷售通常於 24 小時內跟進") },
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
            <h2 className="text-2xl font-bold text-[#111816]">{tx(locale, "Quote FAQ", "詢價常見問題")}</h2>
            <p className="mt-2 text-[#5E6A65]">{tx(locale, "Common questions before sending a battery sourcing request.", "發送電池採購需求前常見問題。")}</p>
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
