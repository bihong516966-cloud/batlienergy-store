import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Locale } from '@/lib/i18n/config';

interface FooterProps {
  locale: Locale;
}

const footerLinks = {
  products: [
    { label: 'Cylindrical Cells', href: '/products/cylindrical' },
    { label: 'LiFePO4 Prismatic', href: '/products/lifepo4' },
    { label: 'E-Bike Batteries', href: '/products/ebike' },
    { label: 'FPV Batteries', href: '/products/fpv' },
    { label: 'Power Tool Batteries', href: '/products/powertool' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Factory Tour', href: '/factory' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D7DDD9] bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111816]">
                <span className="text-xl font-bold text-white">B</span>
              </div>
              <span className="text-xl font-bold text-[#111816]">Batlienergy</span>
            </Link>
            <p className="text-sm text-[#5E6A65]">
              Professional lithium battery manufacturer serving global B2B customers with premium quality cells and packs.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#5E6A65]">
                <Mail className="h-4 w-4" />
                <span>julian@batelithium.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5E6A65]">
                <Phone className="h-4 w-4" />
                <span>+86 138 0013 8000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5E6A65]">
                <MapPin className="h-4 w-4" />
                <span>Shenzhen, China</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#111816]">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-[#5E6A65] hover:text-[#168C5A]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#111816]">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-[#5E6A65] hover:text-[#168C5A]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#111816]">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-[#5E6A65] hover:text-[#168C5A]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-[#D7DDD9] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-[#5E6A65]">
              &copy; {currentYear} Shenzhen Batelithium Technology Co., Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#5E6A65]">Certified:</span>
              <div className="flex gap-2">
                {['UN38.3', 'CE', 'UL', 'RoHS'].map((cert) => (
                  <span
                    key={cert}
                    className="rounded bg-[#E8ECEA] px-2 py-1 text-xs text-[#36423E]"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
