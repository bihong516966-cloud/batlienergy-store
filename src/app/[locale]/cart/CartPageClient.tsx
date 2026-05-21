'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart/cart-context';

// ─── i18n helpers ────────────────────────────────────────────────────────────

const t = (locale: string, zh: string, en: string) => (locale === 'zh' ? zh : en);

// ─── Component ───────────────────────────────────────────────────────────────

interface CartPageClientProps {
  locale: string;
}

export default function CartPageClient({ locale }: CartPageClientProps) {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } =
    useCart();

  const isZh = locale === 'zh';

  // Shipping threshold
  const FREE_SHIPPING_THRESHOLD = 5000;
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 150;
  const grandTotal = totalPrice + shipping;

  // ── Empty State ──────────────────────────────────────────────────────────

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: '#0A1628' }}
      >
        <div
          className="flex flex-col items-center gap-6 p-12 rounded-2xl max-w-md w-full text-center"
          style={{ backgroundColor: '#111D2E', border: '1px solid #1E3A5F' }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 230, 118, 0.1)' }}
          >
            <ShoppingBag className="w-12 h-12" style={{ color: '#00E676' }} />
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ color: '#FFFFFF' }}
          >
            {t(locale, '您的购物车是空的', 'Your cart is empty')}
          </h1>
          <p style={{ color: '#8899AA' }}>
            {t(
              locale,
              '浏览我们的锂电池产品系列，找到适合您的解决方案',
              'Browse our lithium battery product range to find the right solution for you',
            )}
          </p>
          <Link href={`/${locale}/products`}>
            <Button
              className="mt-2 font-semibold text-black hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#00E676' }}
            >
              {t(locale, '浏览产品', 'Browse Products')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ── Cart with Items ──────────────────────────────────────────────────────

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1628' }}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        className="border-b"
        style={{ borderColor: '#1E3A5F', backgroundColor: '#0E1A2E' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
                {t(locale, '购物车', 'Shopping Cart')}
              </h1>
              <p className="mt-1" style={{ color: '#8899AA' }}>
                {t(locale, `${totalItems} 件产品`, `${totalItems} item${totalItems > 1 ? 's' : ''}`)}
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={clearCart}
              className="hover:opacity-80 transition-opacity"
              style={{ color: '#FF5252' }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t(locale, '清空购物车', 'Clear Cart')}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Cart Items (left 2 cols) ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Desktop Table Header */}
            <div
              className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 rounded-lg text-sm font-medium"
              style={{ backgroundColor: '#111D2E', color: '#8899AA' }}
            >
              <div className="col-span-5">{t(locale, '产品', 'Product')}</div>
              <div className="col-span-2 text-center">{t(locale, '单价', 'Unit Price')}</div>
              <div className="col-span-3 text-center">{t(locale, '数量', 'Quantity')}</div>
              <div className="col-span-1 text-right">{t(locale, '小计', 'Subtotal')}</div>
              <div className="col-span-1" />
            </div>

            {/* Items */}
            {items.map((item) => {
              const subtotal = item.price * item.quantity;
              return (
                <Card
                  key={item.id}
                  className="overflow-hidden transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: '#111D2E',
                    border: '1px solid #1E3A5F',
                  }}
                >
                  <CardContent className="p-0">
                    {/* Desktop Row */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center px-6 py-4">
                      {/* Product Info */}
                      <div className="col-span-5 flex items-center gap-4">
                        {item.image ? (
                          <div
                            className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
                            style={{ backgroundColor: '#0A1628' }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: '#0A1628' }}
                          >
                            <ShoppingBag className="w-6 h-6" style={{ color: '#1E3A5F' }} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <Link
                            href={`/${locale}/products/${item.slug}`}
                            className="font-medium text-sm hover:underline truncate block"
                            style={{ color: '#FFFFFF' }}
                          >
                            {item.name}
                          </Link>
                          <Badge
                            className="mt-1 text-xs"
                            style={{
                              backgroundColor: 'rgba(0, 230, 118, 0.15)',
                              color: '#00E676',
                              border: '1px solid rgba(0, 230, 118, 0.3)',
                            }}
                          >
                            {item.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div
                        className="col-span-2 text-center font-medium"
                        style={{ color: '#FFFFFF' }}
                      >
                        ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-3 flex items-center justify-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 rounded-md flex items-center justify-center transition-colors disabled:opacity-30"
                          style={{
                            backgroundColor: '#1E3A5F',
                            color: '#FFFFFF',
                          }}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span
                          className="w-12 text-center font-medium"
                          style={{ color: '#FFFFFF' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-md flex items-center justify-center transition-colors"
                          style={{
                            backgroundColor: '#1E3A5F',
                            color: '#FFFFFF',
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div
                        className="col-span-1 text-right font-semibold"
                        style={{ color: '#00E676' }}
                      >
                        ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>

                      {/* Remove */}
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 rounded-md flex items-center justify-center transition-colors hover:opacity-80"
                          style={{ color: '#FF5252' }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden p-4 space-y-4">
                      <div className="flex items-start gap-3">
                        {item.image ? (
                          <div
                            className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                            style={{ backgroundColor: '#0A1628' }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: '#0A1628' }}
                          >
                            <ShoppingBag className="w-8 h-8" style={{ color: '#1E3A5F' }} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/${locale}/products/${item.slug}`}
                            className="font-medium hover:underline truncate block"
                            style={{ color: '#FFFFFF' }}
                          >
                            {item.name}
                          </Link>
                          <Badge
                            className="mt-1 text-xs"
                            style={{
                              backgroundColor: 'rgba(0, 230, 118, 0.15)',
                              color: '#00E676',
                              border: '1px solid rgba(0, 230, 118, 0.3)',
                            }}
                          >
                            {item.category}
                          </Badge>
                          <p
                            className="mt-1 text-sm"
                            style={{ color: '#8899AA' }}
                          >
                            ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} / {t(locale, '件', 'unit')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-md flex items-center justify-center transition-colors disabled:opacity-30"
                            style={{ backgroundColor: '#1E3A5F', color: '#FFFFFF' }}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span
                            className="w-10 text-center font-medium"
                            style={{ color: '#FFFFFF' }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-md flex items-center justify-center transition-colors"
                            style={{ backgroundColor: '#1E3A5F', color: '#FFFFFF' }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span
                            className="font-semibold"
                            style={{ color: '#00E676' }}
                          >
                            ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 rounded-md flex items-center justify-center transition-colors"
                            style={{ color: '#FF5252' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* ── Order Summary Sidebar ─────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <Card
              className="sticky top-8"
              style={{
                backgroundColor: '#111D2E',
                border: '1px solid #1E3A5F',
              }}
            >
              <CardContent className="p-6 space-y-6">
                <h2
                  className="text-lg font-bold"
                  style={{ color: '#FFFFFF' }}
                >
                  {t(locale, '订单摘要', 'Order Summary')}
                </h2>

                {/* Subtotal */}
                <div className="flex justify-between">
                  <span style={{ color: '#8899AA' }}>
                    {t(locale, '小计', 'Subtotal')}
                  </span>
                  <span className="font-medium" style={{ color: '#FFFFFF' }}>
                    ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between">
                  <span style={{ color: '#8899AA' }}>
                    {t(locale, '预估运费', 'Estimated Shipping')}
                  </span>
                  {shipping === 0 ? (
                    <span className="font-medium" style={{ color: '#00E676' }}>
                      {t(locale, '免运费', 'FREE')}
                    </span>
                  ) : (
                    <span className="font-medium" style={{ color: '#FFFFFF' }}>
                      ${shipping.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </div>

                {/* Free shipping notice */}
                {shipping > 0 && (
                  <div
                    className="rounded-lg p-3 text-sm"
                    style={{
                      backgroundColor: 'rgba(0, 230, 118, 0.08)',
                      border: '1px solid rgba(0, 230, 118, 0.2)',
                      color: '#00E676',
                    }}
                  >
                    {t(
                      locale,
                      `再消费 $${(FREE_SHIPPING_THRESHOLD - totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })} 即可享受免运费`,
                      `Add $${(FREE_SHIPPING_THRESHOLD - totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })} more for free shipping`,
                    )}
                  </div>
                )}

                {/* Divider */}
                <div style={{ borderTop: '1px solid #1E3A5F' }} />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
                    {t(locale, '合计', 'Total')}
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: '#00E676' }}
                  >
                    ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link href={`/${locale}/checkout`} className="block">
                  <Button
                    className="w-full font-semibold text-black hover:opacity-90 transition-opacity py-6 text-base"
                    style={{ backgroundColor: '#00E676' }}
                  >
                    {t(locale, '去结算', 'Proceed to Checkout')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                {/* Continue Shopping */}
                <Link href={`/${locale}/products`} className="block">
                  <Button
                    variant="ghost"
                    className="w-full font-medium transition-colors"
                    style={{ color: '#8899AA' }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t(locale, '继续购物', 'Continue Shopping')}
                  </Button>
                </Link>

                {/* B2B Notice */}
                <div
                  className="rounded-lg p-4 text-xs leading-relaxed"
                  style={{
                    backgroundColor: 'rgba(30, 58, 95, 0.3)',
                    color: '#8899AA',
                  }}
                >
                  {t(
                    locale,
                    '大宗采购请联系我们的销售团队获取专属报价。支持 OEM/ODM 定制服务。',
                    'For bulk orders, contact our sales team for exclusive pricing. OEM/ODM customization available.',
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
