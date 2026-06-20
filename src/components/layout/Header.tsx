'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, ShoppingCart, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Locale, localeNames } from '@/lib/i18n/config';

interface HeaderProps {
  locale: Locale;
}

const navItems = [
  { href: '/products', label: 'Products', labelKey: 'nav.products' },
  { href: '/solutions', label: 'Solutions', labelKey: 'nav.solutions' },
  { href: '/about', label: 'About', labelKey: 'nav.about' },
  { href: '/contact', label: 'Contact', labelKey: 'nav.contact' },
];

export function Header({ locale }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D7DDD9] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111816]">
            <span className="text-xl font-bold text-white">B</span>
          </div>
          <span className="text-xl font-bold text-[#111816]">Batlienergy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="text-sm font-medium text-[#5E6A65] transition-colors hover:text-[#168C5A]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#5E6A65] hover:text-[#168C5A] hover:bg-[#E8ECEA] transition-colors cursor-pointer"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{localeNames[locale]}</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-[#D7DDD9]">
              {Object.entries(localeNames).map(([code, name]) => (
                <DropdownMenuItem
                  key={code}
                  className="text-[#5E6A65] hover:text-[#111816] hover:bg-[#E8ECEA] cursor-pointer"
                  onClick={() => {
                    window.location.href = `/${code}`;
                  }}
                >
                  {name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative text-[#5E6A65] hover:text-[#111816]">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#111816] text-xs font-bold text-white">
              0
            </span>
          </Button>

          {/* CTA Button */}
          <Link href={`/${locale}/contact`}>
            <Button className="hidden bg-[#111816] text-white hover:bg-[#2A3330] sm:inline-flex">
              Get Quote
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md h-10 w-10 text-[#5E6A65] hover:text-[#111816] hover:bg-[#E8ECEA] transition-colors cursor-pointer md:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white border-[#D7DDD9]">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-[#5E6A65] hover:text-[#168C5A]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
                  <Button className="mt-4 w-full bg-[#111816] text-white hover:bg-[#2A3330]">
                    Get Quote
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
