import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Locale } from "@/lib/i18n/config";
import { tx } from "@/lib/i18n/display";

interface FooterProps {
  locale: Locale;
}

const productLinks = [
  { label: "Cylindrical Cells", zh: "圓柱電芯", href: "/products/cylindrical" },
  { label: "LiFePO4 Prismatic", zh: "磷酸鐵鋰方形電芯", href: "/products/lifepo4" },
  { label: "E-Bike Batteries", zh: "電動自行車電池", href: "/products/ebike" },
  { label: "32650/32700 LiFePO4", zh: "32650 / 32700 磷酸鐵鋰", href: "/products/large-cylindrical" },
  { label: "Home Storage", zh: "家用儲能系統", href: "/products/home-storage" },
];

const companyLinks = [
  { label: "About Batlienergy", zh: "關於 Batlienergy", href: "/about" },
  { label: "Product Catalog", zh: "產品目錄", href: "/products" },
  { label: "Bulk Quote", zh: "批發詢價", href: "/contact" },
  { label: "Contact", zh: "聯絡我們", href: "/contact" },
];

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D7DDD9] bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#111816]">
                <span className="text-xl font-bold text-white">B</span>
              </div>
              <span className="text-xl font-bold text-[#111816]">Batlienergy</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#5E6A65]">
              {tx(
                locale,
                "Industrial lithium battery supplier for cells, packs, storage systems, wholesale projects, and export orders.",
                "工業鋰電池供應商，提供電芯、電池組、儲能系統、批發項目與出口訂單支援。"
              )}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#5E6A65]">
                <Mail className="h-4 w-4 text-[#168C5A]" />
                <span>julian@batelithium.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5E6A65]">
                <Phone className="h-4 w-4 text-[#168C5A]" />
                <span>+86 138 0013 8000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5E6A65]">
                <MapPin className="h-4 w-4 text-[#168C5A]" />
                <span>{tx(locale, "Shenzhen, China", "中國深圳")}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#111816]">
              {tx(locale, "Products", "產品")}
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={`/${locale}${link.href}`} className="text-sm text-[#5E6A65] hover:text-[#168C5A]">
                    {tx(locale, link.label, link.zh)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#111816]">
              {tx(locale, "Company", "公司")}
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link href={`/${locale}${link.href}`} className="text-sm text-[#5E6A65] hover:text-[#168C5A]">
                    {tx(locale, link.label, link.zh)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#111816]">
              {tx(locale, "Buyer Notes", "買家提示")}
            </h3>
            <div className="space-y-3 text-sm text-[#5E6A65]">
              <p>
                {tx(
                  locale,
                  "Send model, quantity, destination country, and certificate needs for a faster quote.",
                  "請提供型號、數量、目的地國家與認證需求，可更快取得報價。"
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {["UN38.3", "CE", "UL", "MSDS", "RoHS"].map((cert) => (
                  <span key={cert} className="rounded border border-[#D7DDD9] bg-[#F8FAF9] px-2 py-1 text-xs text-[#36423E]">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#D7DDD9] pt-6">
          <div className="flex flex-col gap-3 text-sm text-[#5E6A65] md:flex-row md:items-center md:justify-between">
            <p>&copy; {currentYear} Shenzhen Batlienergy Technology Co., Ltd. {tx(locale, "All rights reserved.", "版權所有。")}</p>
            <p>{tx(locale, "Battery cells, packs, OEM projects, and export sourcing.", "電芯、電池組、OEM 項目與出口採購支援。")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
