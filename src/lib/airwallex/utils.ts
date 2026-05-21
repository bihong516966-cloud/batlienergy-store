/**
 * Airwallex Payment Utilities
 * Utility functions for Airwallex payment integration
 */

/**
 * Generate mock payment intent for demo mode
 * In production, this should come from your backend API
 */
export function createMockPaymentIntent(
  amount: number,
  currency: string = 'USD'
): {
  clientSecret: string;
  paymentIntentId: string;
} {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 11);
  
  return {
    clientSecret: `pi_${timestamp}_secret_${randomStr}`,
    paymentIntentId: `pi_${timestamp}`,
  };
}

/**
 * Format currency amount for display
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Validate card number using Luhn algorithm
 */
export function validateCardNumber(cardNumber: string): boolean {
  // Remove spaces and non-digit characters
  const cleaned = cardNumber.replace(/\D/g, '');
  
  // Check length (13-19 digits)
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Validate expiry date (MM/YY format)
 */
export function validateExpiry(expiry: string): boolean {
  // Clean the input
  const cleaned = expiry.replace(/\D/g, '');
  
  // Check if we have 4 digits (MMYY)
  if (cleaned.length !== 4) {
    return false;
  }
  
  const month = parseInt(cleaned.substring(0, 2), 10);
  const year = parseInt(cleaned.substring(2, 4), 10);
  
  // Validate month (01-12)
  if (month < 1 || month > 12) {
    return false;
  }
  
  // Get current date
  const now = new Date();
  const currentYear = now.getFullYear() % 100; // Last 2 digits
  const currentMonth = now.getMonth() + 1;
  
  // Check if card is expired
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }
  
  // Card should not be more than 20 years in the future
  if (year > currentYear + 20) {
    return false;
  }
  
  return true;
}

/**
 * Validate CVC (Card Verification Code)
 */
export function validateCVC(cvc: string): boolean {
  const cleaned = cvc.replace(/\D/g, '');
  // CVC is typically 3-4 digits
  return cleaned.length >= 3 && cleaned.length <= 4;
}

/**
 * Detect card type from card number
 */
export function getCardType(cardNumber: string): string | null {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (!cleaned) return null;
  
  // Card type patterns
  const patterns: { [key: string]: RegExp } = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    diners: /^3(?:0[0-5]|[68])/,
    jcb: /^(?:2131|1800|35)/,
    unionpay: /^(?:62|81)/,
  };
  
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleaned)) {
      return type;
    }
  }
  
  return null;
}

/**
 * Format card number with spaces (every 4 digits)
 */
export function formatCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '');
  const parts = [];
  
  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.substring(i, i + 4));
  }
  
  return parts.join(' ');
}

/**
 * Format expiry date (MM/YY)
 */
export function formatExpiryDate(expiry: string): string {
  const cleaned = expiry.replace(/\D/g, '');
  
  if (cleaned.length >= 2) {
    return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
  }
  
  return cleaned;
}

/**
 * Mask card number for display (show only last 4 digits)
 */
export function maskCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 4) {
    return cleaned;
  }
  
  const lastFour = cleaned.slice(-4);
  const maskedPart = '*'.repeat(cleaned.length - 4);
  
  return formatCardNumber(maskedPart + lastFour);
}

/**
 * Calculate processing fee (Airwallex standard rates)
 */
export function calculateProcessingFee(
  amount: number,
  rate: number = 0.029, // 2.9% default
  fixedFee: number = 0.30 // $0.30 fixed fee
): {
  fee: number;
  total: number;
} {
  const fee = amount * rate + fixedFee;
  return {
    fee: Math.round(fee * 100) / 100,
    total: Math.round((amount + fee) * 100) / 100,
  };
}

/**
 * Currency codes supported by Airwallex
 */
export const SUPPORTED_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'SGD', 'HKD', 'JPY', 'CNY', 'NZD',
  'SEK', 'NOK', 'DKK', 'CHF', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'INR',
  'MYR', 'THB', 'PHP', 'IDR', 'VND', 'KRW', 'TWD', 'AED', 'SAR', 'ILS',
];

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: string): string {
  const symbols: { [key: string]: string } = {
    USD: '$',
    EUR: '\u20AC',
    GBP: '\u00A3',
    AUD: 'A$',
    CAD: 'C$',
    SGD: 'S$',
    HKD: 'HK$',
    JPY: '\u00A5',
    CNY: '\u00A5',
    NZD: 'NZ$',
    INR: '\u20B9',
    MYR: 'RM',
    THB: '\u0E3F',
    PHP: '\u20B1',
    IDR: 'Rp',
    VND: '\u20AB',
    KRW: '\u20A9',
    TWD: 'NT$',
    AED: 'AED',
    SAR: 'SAR',
    ILS: '\u20AA',
  };
  
  return symbols[currency.toUpperCase()] || currency;
}

/**
 * Validate payment amount
 */
export function validateAmount(
  amount: number,
  minAmount: number = 0.5,
  maxAmount: number = 999999.99
): { valid: boolean; error?: string } {
  if (isNaN(amount)) {
    return { valid: false, error: 'Invalid amount' };
  }
  
  if (amount < minAmount) {
    return { valid: false, error: `Minimum amount is ${formatCurrency(minAmount)}` };
  }
  
  if (amount > maxAmount) {
    return { valid: false, error: `Maximum amount is ${formatCurrency(maxAmount)}` };
  }
  
  return { valid: true };
}

/**
 * Parse client secret to extract payment intent ID
 */
export function parseClientSecret(clientSecret: string): {
  paymentIntentId: string;
  isValid: boolean;
} {
  const parts = clientSecret.split('_secret_');
  
  if (parts.length !== 2) {
    return { paymentIntentId: '', isValid: false };
  }
  
  return {
    paymentIntentId: parts[0],
    isValid: true,
  };
}

/**
 * Generate unique order ID
 */
export function generateOrderId(prefix: string = 'ORD'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
}

/**
 * Airwallex API configuration
 */
export interface AirwallexConfig {
  clientId: string;
  environment: 'production' | 'staging' | 'demo';
}

export const DEFAULT_CONFIG: AirwallexConfig = {
  clientId: 'your_client_id',
  environment: 'demo',
};

/**
 * Payment status types
 */
export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'refunded';

/**
 * Get human-readable payment status
 */
export function getPaymentStatusLabel(status: PaymentStatus): string {
  const labels: { [key in PaymentStatus]: string } = {
    pending: 'Pending',
    processing: 'Processing',
    succeeded: 'Payment Successful',
    failed: 'Payment Failed',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  };
  
  return labels[status];
}

/**
 * Get payment status color for UI
 */
export function getPaymentStatusColor(status: PaymentStatus): string {
  const colors: { [key in PaymentStatus]: string } = {
    pending: '#F59E0B',
    processing: '#3B82F6',
    succeeded: '#10B981',
    failed: '#EF4444',
    cancelled: '#6B7280',
    refunded: '#8B5CF6',
  };
  
  return colors[status];
}

export default {
  createMockPaymentIntent,
  formatCurrency,
  validateCardNumber,
  validateExpiry,
  validateCVC,
  getCardType,
  formatCardNumber,
  formatExpiryDate,
  maskCardNumber,
  calculateProcessingFee,
  SUPPORTED_CURRENCIES,
  getCurrencySymbol,
  validateAmount,
  parseClientSecret,
  generateOrderId,
  getPaymentStatusLabel,
  getPaymentStatusColor,
};
