'use client';

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Package, Truck, FileText, Mail, MessageCircle, ArrowRight, Copy, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderDetails {
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingMethod: string;
  estimatedDelivery: string;
}

export default function OrderConfirmPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Try to get order details from localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    } else {
      // Demo order details
      setOrderDetails({
        orderId: `BL${Date.now()}`,
        items: [
          { name: "Samsung 25R 18650 2500mAh", quantity: 100, price: 0.95 },
          { name: "Samsung 30Q 18650 3000mAh", quantity: 50, price: 1.20 },
        ],
        total: 170.50,
        shippingMethod: "Sea Freight",
        estimatedDelivery: "15-25 business days",
      });
    }
  }, []);

  const copyOrderId = () => {
    if (orderDetails?.orderId) {
      navigator.clipboard.writeText(orderDetails.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-white">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00E676]/20 mb-6">
            <CheckCircle className="w-10 h-10 text-[#00E676]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Order Submitted Successfully!
          </h1>
          <p className="text-[#94A3B8] text-lg">
            Thank you for your order. Our team will contact you within 24 hours to confirm the details.
          </p>
        </div>

        {/* Order ID */}
        <Card className="border-[#1E3A5F] bg-[#111D2E] mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-sm text-[#94A3B8]">Order Number</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-white">{orderDetails.orderId}</span>
                  <button
                    onClick={copyOrderId}
                    className="p-2 rounded-md hover:bg-[#1E3A5F] transition-colors"
                    title="Copy order ID"
                  >
                    <Copy className="w-4 h-4 text-[#94A3B8]" />
                  </button>
                  {copied && (
                    <Badge className="bg-[#00E676]/20 text-[#00E676] border-0">Copied!</Badge>
                  )}
                </div>
              </div>
              <Badge className="bg-[#00E676]/20 text-[#00E676] border-0 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Pending Confirmation
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Items */}
          <div className="lg:col-span-2">
            <Card className="border-[#1E3A5F] bg-[#111D2E]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-[#00E676]" />
                  <h2 className="text-lg font-semibold text-white">Order Items</h2>
                </div>
                <div className="space-y-4">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-[#1E3A5F] last:border-0">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-sm text-[#94A3B8]">Qty: {item.quantity} units</p>
                      </div>
                      <p className="text-white font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#1E3A5F] flex justify-between items-center">
                  <span className="text-[#94A3B8]">Total</span>
                  <span className="text-2xl font-bold text-[#00E676]">
                    ${orderDetails.total.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Info */}
          <div>
            <Card className="border-[#1E3A5F] bg-[#111D2E]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Truck className="w-5 h-5 text-[#00E676]" />
                  <h2 className="text-lg font-semibold text-white">Shipping</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-[#94A3B8]">Method</span>
                    <p className="text-white font-medium">{orderDetails.shippingMethod}</p>
                  </div>
                  <div>
                    <span className="text-sm text-[#94A3B8]">Estimated Delivery</span>
                    <p className="text-white font-medium">{orderDetails.estimatedDelivery}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-[#1E3A5F] bg-[#111D2E] mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-[#00E676]" />
                  <h2 className="text-lg font-semibold text-white">Next Steps</h2>
                </div>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00E676]/20 text-[#00E676] flex items-center justify-center text-xs font-bold">1</span>
                    <span className="text-[#94A3B8]">Our sales team will review your order within 24 hours</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00E676]/20 text-[#00E676] flex items-center justify-center text-xs font-bold">2</span>
                    <span className="text-[#94A3B8]">You will receive a detailed quotation with shipping options</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00E676]/20 text-[#00E676] flex items-center justify-center text-xs font-bold">3</span>
                    <span className="text-[#94A3B8]">After confirmation, we will arrange production</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Options */}
        <Card className="border-[#1E3A5F] bg-[#111D2E]">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 text-center">
              Need Immediate Assistance?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <a
                href={`https://wa.me/8613800138000?text=${encodeURIComponent(`Hi, I just placed order ${orderDetails.orderId}. Can you help me confirm the details?`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 h-12"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Support
                </Button>
              </a>
              <a href="mailto:julian@batelithium.com">
                <Button
                  variant="outline"
                  className="w-full border-[#1E3A5F] text-white hover:bg-[#1E3A5F] h-12"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link href={`/${locale}`}>
            <Button
              variant="outline"
              className="border-[#1E3A5F] text-white hover:bg-[#1E3A5F]"
            >
              Return to Home
            </Button>
          </Link>
          <Link href={`/${locale}/products`}>
            <Button className="bg-[#00E676] text-[#0A1628] hover:bg-[#00C853]">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Security Notice */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-[#94A3B8]">
          <Shield className="w-4 h-4" />
          <span>Your order is protected by SSL encryption</span>
        </div>
      </div>
    </div>
  );
}
