import Link from "next/link";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const productCategories = [
    "Cylindrical 18650 Battery",
    "Cylindrical 21700 Battery",
    "LiFePO4 Battery",
    "E-Bike Battery",
    "Tricycle Battery",
    "FPV/Drone Battery",
    "Power Tool Battery",
    "Portable Power Station",
    "Large Cylindrical Battery",
    "LiPo Battery",
    "4680 Battery",
    "Home Energy Storage",
  ];

  const quantityRanges = [
    "100-500",
    "500-1,000",
    "1,000-5,000",
    "5,000-10,000",
    "10,000+",
  ];

  const faqs = [
    {
      question: "What is the minimum order quantity (MOQ)?",
      answer:
        "Our standard MOQ varies by product category. For most cylindrical cells (18650/21700), the MOQ is 100 pieces. For battery packs and energy storage systems, the MOQ is typically 10 units. We can discuss flexible arrangements for new partnerships.",
    },
    {
      question: "Do you offer OEM/ODM services?",
      answer:
        "Yes, we provide full OEM and ODM services. Our engineering team can customize battery specifications, dimensions, capacity, and branding to meet your exact requirements. Lead times for custom orders are typically 15-25 business days.",
    },
    {
      question: "What certifications do your batteries carry?",
      answer:
        "Our products are certified with CE, UN38.3, MSDS, IEC62133, and RoHS. Additional certifications such as UL, KC, and PSE are available for specific markets and product lines upon request.",
    },
    {
      question: "What is the typical lead time for orders?",
      answer:
        "Standard in-stock items ship within 3-7 business days. Custom or large orders typically require 15-25 business days for production. We provide real-time tracking and updates throughout the fulfillment process.",
    },
    {
      question: "Do you provide samples before bulk orders?",
      answer:
        "Yes, we offer sample orders for evaluation purposes. Sample fees may apply depending on the product and quantity, but these are typically credited toward your first bulk order. Contact us to request samples.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept T/T (Telegraphic Transfer), L/C (Letter of Credit), PayPal, and Western Union. Standard payment terms are 30% deposit with 70% before shipment. We can negotiate terms for established partnerships.",
    },
    {
      question: "Do you offer warranty on your products?",
      answer:
        "All Batlienergy products come with a warranty. Cylindrical cells carry a 12-month warranty, while battery packs and energy storage systems include a 24-36 month warranty depending on the product line. Extended warranty options are available.",
    },
    {
      question: "Can you arrange shipping and logistics?",
      answer:
        "Absolutely. We handle international shipping via sea freight, air freight, and express courier (DHL, FedEx, UPS). We manage all export documentation, customs declarations, and can arrange door-to-door delivery to your facility.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#0A1628" }}>
      {/* Hero Banner */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: "#0A1628" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #00E676 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge
            className="mb-6 text-sm font-medium px-4 py-1.5"
            style={{
              backgroundColor: "rgba(0, 230, 118, 0.15)",
              color: "#00E676",
              border: "1px solid rgba(0, 230, 118, 0.3)",
            }}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            We&apos;d Love to Hear From You
          </Badge>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: "#FFFFFF" }}
          >
            Get in{" "}
            <span style={{ color: "#00E676" }}>Touch</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            style={{ color: "#94A3B8" }}
          >
            Whether you need a custom battery solution, bulk pricing, or
            technical consultation, our team is ready to help. Reach out today
            and let&apos;s power your business together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#contact-form">
              <Button
                size="lg"
                className="font-semibold text-base px-8 py-3"
                style={{
                  backgroundColor: "#00E676",
                  color: "#0A1628",
                }}
              >
                <Send className="w-5 h-5 mr-2" />
                Send an Inquiry
              </Button>
            </Link>
            <Link href="https://wa.me/8613800138000" target="_blank">
              <Button
                size="lg"
                variant="outline"
                className="font-semibold text-base px-8 py-3"
                style={{
                  borderColor: "#1E3A5F",
                  color: "#00E676",
                  backgroundColor: "transparent",
                }}
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact-form"
        className="py-20 md:py-28"
        style={{ backgroundColor: "#0A1628" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="mb-10">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: "#FFFFFF" }}
                >
                  Send Us an{" "}
                  <span style={{ color: "#00E676" }}>Inquiry</span>
                </h2>
                <p style={{ color: "#94A3B8" }} className="text-lg">
                  Fill out the form below and our sales team will get back to
                  you within 24 hours with a detailed quotation.
                </p>
              </div>

              <Card
                className="p-0 overflow-hidden"
                style={{
                  backgroundColor: "#111D2E",
                  border: "1px solid #1E3A5F",
                }}
              >
                <CardContent className="p-6 md:p-8">
                  <form
                    action="#"
                    className="space-y-6"
                  >
                    {/* Row 1: Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium"
                          style={{ color: "#CBD5E1" }}
                        >
                          Full Name <span style={{ color: "#00E676" }}>*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Smith"
                          required
                          className="h-11"
                          style={{
                            backgroundColor: "#0A1628",
                            border: "1px solid #1E3A5F",
                            color: "#FFFFFF",
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium"
                          style={{ color: "#CBD5E1" }}
                        >
                          Email Address{" "}
                          <span style={{ color: "#00E676" }}>*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@company.com"
                          required
                          className="h-11"
                          style={{
                            backgroundColor: "#0A1628",
                            border: "1px solid #1E3A5F",
                            color: "#FFFFFF",
                          }}
                        />
                      </div>
                    </div>

                    {/* Row 2: Company & Phone */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="company"
                          className="text-sm font-medium"
                          style={{ color: "#CBD5E1" }}
                        >
                          Company Name{" "}
                          <span style={{ color: "#00E676" }}>*</span>
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Your Company Ltd."
                          required
                          className="h-11"
                          style={{
                            backgroundColor: "#0A1628",
                            border: "1px solid #1E3A5F",
                            color: "#FFFFFF",
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium"
                          style={{ color: "#CBD5E1" }}
                        >
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="h-11"
                          style={{
                            backgroundColor: "#0A1628",
                            border: "1px solid #1E3A5F",
                            color: "#FFFFFF",
                          }}
                        />
                      </div>
                    </div>

                    {/* Row 3: Product Interest & Quantity */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="product"
                          className="text-sm font-medium"
                          style={{ color: "#CBD5E1" }}
                        >
                          Product Interest{" "}
                          <span style={{ color: "#00E676" }}>*</span>
                        </label>
                        <Select name="product" required>
                          <SelectTrigger
                            className="h-11"
                            style={{
                              backgroundColor: "#0A1628",
                              border: "1px solid #1E3A5F",
                              color: "#FFFFFF",
                            }}
                          >
                            <SelectValue placeholder="Select a product category" />
                          </SelectTrigger>
                          <SelectContent
                            style={{
                              backgroundColor: "#111D2E",
                              border: "1px solid #1E3A5F",
                            }}
                          >
                            {productCategories.map((category) => (
                              <SelectItem
                                key={category}
                                value={category}
                                style={{ color: "#FFFFFF" }}
                              >
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="quantity"
                          className="text-sm font-medium"
                          style={{ color: "#CBD5E1" }}
                        >
                          Estimated Quantity{" "}
                          <span style={{ color: "#00E676" }}>*</span>
                        </label>
                        <Select name="quantity" required>
                          <SelectTrigger
                            className="h-11"
                            style={{
                              backgroundColor: "#0A1628",
                              border: "1px solid #1E3A5F",
                              color: "#FFFFFF",
                            }}
                          >
                            <SelectValue placeholder="Select quantity range" />
                          </SelectTrigger>
                          <SelectContent
                            style={{
                              backgroundColor: "#111D2E",
                              border: "1px solid #1E3A5F",
                            }}
                          >
                            {quantityRanges.map((range) => (
                              <SelectItem
                                key={range}
                                value={range}
                                style={{ color: "#FFFFFF" }}
                              >
                                {range} units
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium"
                        style={{ color: "#CBD5E1" }}
                      >
                        Your Message{" "}
                        <span style={{ color: "#00E676" }}>*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your requirements, specifications, application, timeline, and any other details that will help us provide an accurate quotation..."
                        required
                        rows={6}
                        className="resize-y"
                        style={{
                          backgroundColor: "#0A1628",
                          border: "1px solid #1E3A5F",
                          color: "#FFFFFF",
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-semibold text-base h-12"
                      style={{
                        backgroundColor: "#00E676",
                        color: "#0A1628",
                      }}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Submit Inquiry
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar: Contact Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="mb-10 lg:mb-6">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: "#FFFFFF" }}
                >
                  Contact{" "}
                  <span style={{ color: "#00E676" }}>Info</span>
                </h2>
                <p style={{ color: "#94A3B8" }} className="text-lg">
                  Reach us directly through any of the channels below.
                </p>
              </div>

              {/* WhatsApp Card */}
              <Card
                className="transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#111D2E",
                  border: "1px solid #1E3A5F",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(0, 230, 118, 0.15)",
                      }}
                    >
                      <Phone
                        className="w-6 h-6"
                        style={{ color: "#00E676" }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-semibold text-lg mb-1"
                        style={{ color: "#FFFFFF" }}
                      >
                        WhatsApp
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{ color: "#94A3B8" }}
                      >
                        Quick response, available 24/7
                      </p>
                      <Link
                        href="https://wa.me/8613800138000"
                        target="_blank"
                      >
                        <Button
                          variant="outline"
                          className="text-sm"
                          style={{
                            borderColor: "#1E3A5F",
                            color: "#00E676",
                            backgroundColor: "transparent",
                          }}
                        >
                          +86 138 0013 8000
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card
                className="transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#111D2E",
                  border: "1px solid #1E3A5F",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(0, 230, 118, 0.15)",
                      }}
                    >
                      <Mail
                        className="w-6 h-6"
                        style={{ color: "#00E676" }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-semibold text-lg mb-1"
                        style={{ color: "#FFFFFF" }}
                      >
                        Email
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{ color: "#94A3B8" }}
                      >
                        For detailed inquiries and quotations
                      </p>
                      <Link href="mailto:julian@batelithium.com">
                        <Button
                          variant="outline"
                          className="text-sm"
                          style={{
                            borderColor: "#1E3A5F",
                            color: "#00E676",
                            backgroundColor: "transparent",
                          }}
                        >
                          julian@batelithium.com
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Card */}
              <Card
                className="transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#111D2E",
                  border: "1px solid #1E3A5F",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(0, 230, 118, 0.15)",
                      }}
                    >
                      <MapPin
                        className="w-6 h-6"
                        style={{ color: "#00E676" }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-semibold text-lg mb-1"
                        style={{ color: "#FFFFFF" }}
                      >
                        Office Address
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{ color: "#94A3B8" }}
                      >
                        Visit us or send samples to our facility
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#FFFFFF" }}
                      >
                        Shenzhen, Guangdong, China
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours Card */}
              <Card
                style={{
                  backgroundColor: "#111D2E",
                  border: "1px solid #1E3A5F",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(0, 230, 118, 0.15)",
                      }}
                    >
                      <Clock
                        className="w-6 h-6"
                        style={{ color: "#00E676" }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-semibold text-lg mb-3"
                        style={{ color: "#FFFFFF" }}
                      >
                        Business Hours
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "#94A3B8" }}>
                            Monday - Friday
                          </span>
                          <span style={{ color: "#FFFFFF" }}>
                            9:00 AM - 6:00 PM (CST)
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "#94A3B8" }}>
                            Saturday
                          </span>
                          <span style={{ color: "#FFFFFF" }}>
                            9:00 AM - 1:00 PM (CST)
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "#94A3B8" }}>
                            Sunday
                          </span>
                          <span style={{ color: "#FFFFFF" }}>Closed</span>
                        </div>
                        <div
                          className="pt-2 mt-2"
                          style={{
                            borderTop: "1px solid #1E3A5F",
                          }}
                        >
                          <p
                            className="text-xs"
                            style={{ color: "#00E676" }}
                          >
                            WhatsApp support is available 24/7 for urgent
                            inquiries.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours Detail Section */}
      <section
        className="py-20"
        style={{
          backgroundColor: "#111D2E",
          borderTop: "1px solid #1E3A5F",
          borderBottom: "1px solid #1E3A5F",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge
              className="mb-4 text-sm font-medium px-4 py-1.5"
              style={{
                backgroundColor: "rgba(0, 230, 118, 0.15)",
                color: "#00E676",
                border: "1px solid rgba(0, 230, 118, 0.3)",
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Availability
            </Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Our{" "}
              <span style={{ color: "#00E676" }}>Business</span> Hours
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#94A3B8" }}
            >
              We operate on China Standard Time (UTC+8). Our team is also
              available outside business hours via WhatsApp for urgent matters.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                day: "Monday - Friday",
                hours: "9:00 AM - 6:00 PM",
                status: "Open",
                note: "Full operations",
              },
              {
                day: "Saturday",
                hours: "9:00 AM - 1:00 PM",
                status: "Limited",
                note: "Sales & support only",
              },
              {
                day: "Sunday",
                hours: "Closed",
                status: "Closed",
                note: "WhatsApp available",
              },
              {
                day: "Public Holidays",
                hours: "Varies",
                status: "Check",
                note: "Announced in advance",
              },
            ].map((item) => (
              <Card
                key={item.day}
                className="text-center"
                style={{
                  backgroundColor: "#0A1628",
                  border: "1px solid #1E3A5F",
                }}
              >
                <CardContent className="p-6">
                  <h3
                    className="font-semibold text-lg mb-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    {item.day}
                  </h3>
                  <p
                    className="text-2xl font-bold mb-2"
                    style={{ color: "#00E676" }}
                  >
                    {item.hours}
                  </p>
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor:
                        item.status === "Open"
                          ? "rgba(0, 230, 118, 0.15)"
                          : item.status === "Limited"
                            ? "rgba(251, 191, 36, 0.15)"
                            : "rgba(239, 68, 68, 0.15)",
                      color:
                        item.status === "Open"
                          ? "#00E676"
                          : item.status === "Limited"
                            ? "#FBBF24"
                            : "#EF4444",
                      border: `1px solid ${
                        item.status === "Open"
                          ? "rgba(0, 230, 118, 0.3)"
                          : item.status === "Limited"
                            ? "rgba(251, 191, 36, 0.3)"
                            : "rgba(239, 68, 68, 0.3)"
                      }`,
                    }}
                  >
                    {item.status}
                  </Badge>
                  <p
                    className="text-xs mt-2"
                    style={{ color: "#94A3B8" }}
                  >
                    {item.note}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "#0A1628" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge
              className="mb-4 text-sm font-medium px-4 py-1.5"
              style={{
                backgroundColor: "rgba(0, 230, 118, 0.15)",
                color: "#00E676",
                border: "1px solid rgba(0, 230, 118, 0.3)",
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              FAQ
            </Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Frequently Asked{" "}
              <span style={{ color: "#00E676" }}>Questions</span>
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#94A3B8" }}
            >
              Find answers to the most common questions about our products,
              services, and ordering process.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="transition-all duration-200 hover:border-opacity-60"
                style={{
                  backgroundColor: "#111D2E",
                  border: "1px solid #1E3A5F",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: "rgba(0, 230, 118, 0.15)",
                        color: "#00E676",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-base mb-2"
                        style={{ color: "#FFFFFF" }}
                      >
                        {faq.question}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#94A3B8" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA after FAQ */}
          <div className="text-center mt-14">
            <p
              className="text-lg mb-6"
              style={{ color: "#94A3B8" }}
            >
              Still have questions? Our team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#contact-form">
                <Button
                  size="lg"
                  className="font-semibold text-base px-8 py-3"
                  style={{
                    backgroundColor: "#00E676",
                    color: "#0A1628",
                  }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Contact Us Now
                </Button>
              </Link>
              <Link
                href="https://wa.me/8613800138000"
                target="_blank"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold text-base px-8 py-3"
                  style={{
                    borderColor: "#1E3A5F",
                    color: "#00E676",
                    backgroundColor: "transparent",
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
