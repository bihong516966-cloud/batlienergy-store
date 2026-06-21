"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Globe, Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale, localeNames } from "@/lib/i18n/config";
import { tx } from "@/lib/i18n/display";

interface HeaderProps {
  locale: Locale;
}

const navItems = [
  { href: "/products", label: "Products", zh: "產品目錄" },
  { href: "/products/ebike", label: "E-Bike", zh: "電動自行車電池" },
  { href: "/products/home-storage", label: "Energy Storage", zh: "儲能系統" },
  { href: "/about", label: "About", zh: "關於我們" },
  { href: "/contact", label: "Contact", zh: "聯絡詢價" },
];

export function Header({ locale }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D7DDD9] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#111816]">
            <span className="text-xl font-bold text-white">B</span>
          </div>
          <div className="leading-tight">
            <span className="block text-xl font-bold text-[#111816]">Batlienergy</span>
            <span className="hidden text-[11px] uppercase tracking-wide text-[#5E6A65] sm:block">
              {tx(locale, "Lithium battery supply", "鋰電池供應")}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="text-sm font-medium text-[#5E6A65] transition-colors hover:text-[#168C5A]"
            >
              {tx(locale, item.label, item.zh)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-[#5E6A65] transition-colors hover:bg-[#E8ECEA] hover:text-[#168C5A]">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{localeNames[locale]}</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-[#D7DDD9] bg-white">
              {Object.entries(localeNames).map(([code, name]) => (
                <DropdownMenuItem
                  key={code}
                  className="cursor-pointer text-[#5E6A65] hover:bg-[#E8ECEA] hover:text-[#111816]"
                  onClick={() => {
                    window.location.href = `/${code}`;
                  }}
                >
                  {name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={`/${locale}/cart`}>
            <Button variant="ghost" size="icon" className="relative text-[#5E6A65] hover:text-[#111816]">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#111816] text-xs font-bold text-white">
                0
              </span>
            </Button>
          </Link>

          <Link href={`/${locale}/contact`}>
            <Button className="hidden bg-[#111816] text-white hover:bg-[#2A3330] sm:inline-flex">
              {tx(locale, "Get Quote", "索取報價")}
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#5E6A65] transition-colors hover:bg-[#E8ECEA] hover:text-[#111816] lg:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-[#D7DDD9] bg-white">
              <div className="mt-8 flex flex-col gap-5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-[#5E6A65] hover:text-[#168C5A]"
                  >
                    {tx(locale, item.label, item.zh)}
                  </Link>
                ))}
                <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
                  <Button className="mt-4 w-full bg-[#111816] text-white hover:bg-[#2A3330]">
                    {tx(locale, "Request Quote", "索取報價")}
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
