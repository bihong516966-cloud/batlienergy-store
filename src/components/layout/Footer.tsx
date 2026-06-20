import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Locale } from "@/lib/i18n/config";

interface FooterProps {
  locale: Locale;
}

const productLinks = [
  { label: "Cylindrical Cells", href: "/products/cylindrical" },
  { label: "LiFePO4 Prismatic", href: "/products/lifepo4" },
  { label: "E-Bike Batteries", href: "/products/ebike" },
  { label: "32650/32700 LiFePO4", href: "/products/large-cylindrical" },
  { label: "Home Storage", href: "/products/home-storage" },
];

const companyLinks = [
  { label: "About Batlienergy", href: "/about" },
  { label: "Product Catalog", href: "/products" },
  { label: "Bulk Quote", href: "/contact" },
  { label: "Contact", href: "/contact" },
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
              Industrial lithium battery supplier for cells, packs, storage systems,
              wholesale projects, and export orders.
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
                <span>Shenzhen, China</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#111816]">Products</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={`/${locale}${link.href}`} className="text-sm text-[#5E6A65] hover:text-[#168C5A]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#111816]">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link href={`/${locale}${link.href}`} className="text-sm text-[#5E6A65] hover:text-[#168C5A]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#111816]">Buyer Notes</h3>
            <div className="space-y-3 text-sm text-[#5E6A65]">
              <p>Send model, quantity, destination country, and certificate needs for a faster quote.</p>
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
            <p>&copy; {currentYear} Shenzhen Batlienergy Technology Co., Ltd. All rights reserved.</p>
            <p>Battery cells, packs, OEM projects, and export sourcing.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
