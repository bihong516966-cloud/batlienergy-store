'use client';

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Truck,
  CreditCard,
  Building2,
  CheckCircle,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart/cart-context";

const COUNTRIES = [
  { value: "", label: "Select Country / 选择国家" },
  { value: "CN", label: "China / 中国" },
  { value: "US", label: "United States / 美国" },
  { value: "DE", label: "Germany / 德国" },
  { value: "UK", label: "United Kingdom / 英国" },
  { value: "JP", label: "Japan / 日本" },
  { value: "KR", label: "South Korea / 韩国" },
  { value: "AU", label: "Australia / 澳大利亚" },
  { value: "CA", label: "Canada / 加拿大" },
  { value: "FR", label: "France / 法国" },
  { value: "IN", label: "India / 印度" },
  { value: "BR", label: "Brazil / 巴西" },
  { value: "SG", label: "Singapore / 新加坡" },
  { value: "AE", label: "UAE / 阿联酋" },
  { value: "ZA", label: "South Africa / 南非" },
  { value: "MX", label: "Mexico / 墨西哥" },
  { value: "NL", label: "Netherlands / 荷兰" },
  { value: "IT", label: "Italy / 意大利" },
  { value: "ES", label: "Spain / 西班牙" },
  { value: "TH", label: "Thailand / 泰国" },
  { value: "MY", label: "Malaysia / 马来西亚" },
  { value: "ID", label: "Indonesia / 印度尼西亚" },
  { value: "PH", label: "Philippines / 菲律宾" },
  { value: "VN", label: "Vietnam / 越南" },
  { value: "PL", label: "Poland / 波兰" },
  { value: "RU", label: "Russia / 俄罗斯" },
  { value: "SA", label: "Saudi Arabia / 沙特阿拉伯" },
  { value: "NG", label: "Nigeria / 尼日利亚" },
  { value: "EG", label: "Egypt / 埃及" },
  { value: "OTHER", label: "Other / 其他" },
];

const SHIPPING_METHODS = [
  {
    id: "sea",
    name: "Sea Freight / 海运",
    description: "15-30 business days",
    price: "Free / 免费",
    icon: Truck,
  },
  {
    id: "air",
    name: "Air Freight / 空运",
    description: "5-10 business days",
    price: "Calculated / 计算中",
    icon: Plane,
  },
  {
    id: "express",
    name: "Express / 快递",
    description: "3-5 business days",
    price: "Calculated / 计算中",
    icon: Zap,
  },
] as const;

/* ---------- tiny helper icons for shipping methods ---------- */
import { Plane, Zap } from "lucide-react";

/* ============================================================ */
/*  CheckoutPageClient                                          */
/* ============================================================ */
export default function CheckoutPageClient({ locale }: { locale: string }) {
  const { items, totalPrice } = useCart();
  const isZh = locale === "zh";

  /* ---- empty cart ---- */
  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <Package className="mx-auto mb-6 text-gray-500" size={64} />
          <h1 className="text-2xl font-bold text-white mb-3">
            {isZh ? "购物车为空" : "Your cart is empty"}
          </h1>
          <p className="text-gray-400 mb-8">
            {isZh
              ? "请先浏览产品页面，将需要的产品加入购物车后再进行结账。"
              : "Please browse our products and add items to your cart before checking out."}
          </p>
          <Link href={`/${locale}/products`}>
            <Button
              style={{
                backgroundColor: "#00E676",
                color: "#0A1628",
                fontWeight: 600,
              }}
            >
              <ArrowLeft className="mr-2" size={16} />
              {isZh ? "返回产品页" : "Back to Products"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ---- helpers ---- */
  const fmtPrice = (val: number) =>
    new Intl.NumberFormat(isZh ? "zh-CN" : "en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);

  const subtotal = totalPrice ?? 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      {/* ==================== HEADER ==================== */}
      <header className="border-b" style={{ borderColor: "#1E3A5F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-white font-bold text-xl tracking-tight">
            Batlienergy
          </Link>

          {/* Step indicator */}
          <nav className="hidden sm:flex items-center gap-2 text-sm">
            {[
              { step: 1, label: isZh ? "配送" : "Shipping" },
              { step: 2, label: isZh ? "支付" : "Payment" },
              { step: 3, label: isZh ? "确认" : "Confirm" },
            ].map((s, i) => (
              <span key={s.step} className="flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: i === 0 ? "#00E676" : "#1E3A5F",
                    color: i === 0 ? "#0A1628" : "#64748B",
                  }}
                >
                  {s.step}
                </span>
                <span
                  className="font-medium"
                  style={{ color: i === 0 ? "#00E676" : "#64748B" }}
                >
                  {s.label}
                </span>
                {i < 2 && (
                  <ArrowRight className="text-gray-600 mx-1" size={14} />
                )}
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* ==================== BODY ==================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-white mb-8">
          {isZh ? "结账" : "Checkout"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ========== LEFT: Order Summary (1/3) ========== */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <Card
              className="rounded-xl"
              style={{ backgroundColor: "#111D2E", borderColor: "#1E3A5F" }}
            >
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">
                  {isZh ? "订单摘要" : "Order Summary"}
                </h2>

                {/* Cart items */}
                <ul className="space-y-4 mb-6">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start gap-3"
                    >
                      {/* Thumbnail placeholder */}
                      <div
                        className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: "#1E3A5F" }}
                      >
                        <Package className="text-gray-500" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {isZh ? "数量" : "Qty"}: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold mt-1" style={{ color: "#00E676" }}>
                          {fmtPrice((item.price ?? 0) * item.quantity)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2" style={{ borderColor: "#1E3A5F" }}>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{isZh ? "小计" : "Subtotal"}</span>
                    <span>{fmtPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{isZh ? "运费" : "Shipping"}</span>
                    <span className="text-green-400">
                      {isZh ? "待确认" : "TBD"}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t" style={{ borderColor: "#1E3A5F" }}>
                    <span>{isZh ? "合计" : "Total"}</span>
                    <span style={{ color: "#00E676" }}>{fmtPrice(subtotal)}</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
                  <Shield size={16} />
                  <span>{isZh ? "安全结账保障" : "Secure checkout guaranteed"}</span>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* ========== RIGHT: Main form area (2/3) ========== */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-8">
            {/* ---------- Shipping Information ---------- */}
            <Card
              className="rounded-xl"
              style={{ backgroundColor: "#111D2E", borderColor: "#1E3A5F" }}
            >
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Truck size={20} style={{ color: "#00E676" }} />
                  {isZh ? "配送信息" : "Shipping Information"}
                </h2>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {/* Row: Name / Email / Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">
                        {isZh ? "姓名" : "Full Name"} <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="fullName"
                        placeholder={isZh ? "请输入姓名" : "John Doe"}
                        className="rounded-lg"
                        style={{
                          backgroundColor: "#0A1628",
                          borderColor: "#1E3A5F",
                          color: "#fff",
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        className="rounded-lg"
                        style={{
                          backgroundColor: "#0A1628",
                          borderColor: "#1E3A5F",
                          color: "#fff",
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">
                        {isZh ? "电话" : "Phone"} <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        className="rounded-lg"
                        style={{
                          backgroundColor: "#0A1628",
                          borderColor: "#1E3A5F",
                          color: "#fff",
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">
                        {isZh ? "公司名称" : "Company Name"}
                      </label>
                      <Input
                        name="company"
                        placeholder={isZh ? "请输入公司名称" : "Company Inc."}
                        className="rounded-lg"
                        style={{
                          backgroundColor: "#0A1628",
                          borderColor: "#1E3A5F",
                          color: "#fff",
                        }}
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      {isZh ? "国家/地区" : "Country"} <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="country"
                      defaultValue=""
                      className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      style={{
                        backgroundColor: "#0A1628",
                        borderColor: "#1E3A5F",
                        color: "#fff",
                        border: "1px solid #1E3A5F",
                      }}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State / City / Zip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">
                        {isZh ? "省/州" : "State / Province"} <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="state"
                        placeholder={isZh ? "省/州" : "State"}
                        className="rounded-lg"
                        style={{
                          backgroundColor: "#0A1628",
                          borderColor: "#1E3A5F",
                          color: "#fff",
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">
                        {isZh ? "城市" : "City"} <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="city"
                        placeholder={isZh ? "城市" : "City"}
                        className="rounded-lg"
                        style={{
                          backgroundColor: "#0A1628",
                          borderColor: "#1E3A5F",
                          color: "#fff",
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">
                        {isZh ? "邮编" : "Zip Code"} <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="zip"
                        placeholder="100000"
                        className="rounded-lg"
                        style={{
                          backgroundColor: "#0A1628",
                          borderColor: "#1E3A5F",
                          color: "#fff",
                        }}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      {isZh ? "详细地址" : "Address"} <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="address"
                      placeholder={isZh ? "街道地址、门牌号等" : "Street address, suite, etc."}
                      className="rounded-lg"
                      style={{
                        backgroundColor: "#0A1628",
                        borderColor: "#1E3A5F",
                        color: "#fff",
                      }}
                    />
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-3">
                      {isZh ? "配送方式" : "Shipping Method"} <span className="text-red-400">*</span>
                    </label>
                    <div className="space-y-3">
                      {SHIPPING_METHODS.map((method) => {
                        const Icon = method.icon;
                        return (
                          <label
                            key={method.id}
                            className="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors"
                            style={{
                              backgroundColor: "#0A1628",
                              border: "1px solid #1E3A5F",
                            }}
                          >
                            <input
                              type="radio"
                              name="shippingMethod"
                              value={method.id}
                              defaultChecked={method.id === "sea"}
                              className="accent-green-500 w-4 h-4"
                            />
                            <Icon size={20} style={{ color: "#00E676" }} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">
                                {method.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {method.description}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{
                                borderColor: "#1E3A5F",
                                color: method.id === "sea" ? "#00E676" : "#94A3B8",
                              }}
                            >
                              {method.price}
                            </Badge>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Continue to Payment */}
                  <div className="pt-2">
                    <Button
                      type="button"
                      className="w-full sm:w-auto rounded-lg px-8 py-3 text-base font-semibold"
                      style={{
                        backgroundColor: "#00E676",
                        color: "#0A1628",
                      }}
                    >
                      {isZh ? "继续到支付" : "Continue to Payment"}
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* ---------- Payment Section ---------- */}
            <Card
              className="rounded-xl"
              style={{ backgroundColor: "#111D2E", borderColor: "#1E3A5F" }}
            >
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <CreditCard size={20} style={{ color: "#00E676" }} />
                  {isZh ? "支付方式" : "Payment Method"}
                </h2>

                {/* Card payment placeholder */}
                <div
                  className="rounded-lg p-6 mb-6 text-center"
                  style={{
                    backgroundColor: "#0A1628",
                    border: "2px dashed #1E3A5F",
                  }}
                >
                  <CreditCard className="mx-auto mb-3 text-gray-600" size={40} />
                  <p className="text-gray-400 text-sm">
                    {isZh
                      ? "信用卡 / 借记卡支付区域（即将上线）"
                      : "Credit / Debit card payment area (coming soon)"}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    Airwallex {isZh ? "支付集成即将推出" : "integration coming soon"}
                  </p>
                </div>

                {/* Bank Transfer */}
                <div
                  className="rounded-lg p-5"
                  style={{
                    backgroundColor: "#0A1628",
                    border: "1px solid #1E3A5F",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 size={18} style={{ color: "#00E676" }} />
                    <h3 className="text-sm font-semibold text-white">
                      {isZh ? "银行转账信息" : "Bank Transfer Information"}
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{isZh ? "银行名称" : "Bank Name"}</span>
                      <span className="text-white">Bank of China / 中国银行</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SWIFT</span>
                      <span className="text-white">BKCHCNBJ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{isZh ? "账户名称" : "Account Name"}</span>
                      <span className="text-white">Batlienergy Technology Co., Ltd.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{isZh ? "账户号码" : "Account Number"}</span>
                      <span className="text-white">**** **** **** 8888</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4">
                    {isZh
                      ? "请在汇款备注中注明您的订单号。"
                      : "Please include your order number in the payment reference."}
                  </p>
                </div>

                {/* Place Order */}
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <Button
                    type="button"
                    className="w-full sm:w-auto rounded-lg px-10 py-3 text-base font-semibold"
                    style={{
                      backgroundColor: "#00E676",
                      color: "#0A1628",
                    }}
                  >
                    <CheckCircle className="mr-2" size={18} />
                    {isZh ? "提交订单" : "Place Order"}
                  </Button>
                  <span className="text-xs text-gray-600">
                    {isZh
                      ? "提交订单即表示您同意我们的服务条款和隐私政策。"
                      : "By placing an order you agree to our Terms of Service and Privacy Policy."}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer
        className="mt-16 border-t py-8"
        style={{ borderColor: "#1E3A5F" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Batlienergy. {isZh ? "版权所有" : "All rights reserved"}.
        </div>
      </footer>
    </div>
  );
}
