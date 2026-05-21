'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { CreditCard, Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useAirwallexSDK } from '@/lib/airwallex/airwallex-provider';
import { 
  createMockPaymentIntent, 
  formatCurrency, 
  validateCardNumber,
  validateExpiry,
  validateCVC,
  getCardType
} from '@/lib/airwallex/utils';

interface AirwallexPaymentProps {
  amount: number;
  currency?: string;
  clientSecret?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
  onReady?: () => void;
  env?: 'production' | 'staging' | 'demo';
  demoMode?: boolean;
}

type PaymentStatus = 'idle' | 'ready' | 'processing' | 'success' | 'error';

export function AirwallexPayment({
  amount,
  currency = 'USD',
  clientSecret: externalClientSecret,
  onSuccess,
  onError,
  onReady,
  env = 'production',
  demoMode = true
}: AirwallexPaymentProps) {
  const { isReady: sdkReady } = useAirwallexSDK(env);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Demo mode card form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  
  // Payment state
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Generate client secret for demo
  const [clientSecret, setClientSecret] = useState<string | null>(
    externalClientSecret || null
  );

  // Initialize Airwallex or set up demo mode
  useEffect(() => {
    if (env === 'demo' || demoMode) {
      setClientSecret(createMockPaymentIntent(amount, currency).clientSecret);
      setStatus('ready');
      onReady?.();
    } else if (sdkReady && externalClientSecret && containerRef.current) {
      initializeAirwallex();
    }
  }, [sdkReady, externalClientSecret, amount, currency, env, demoMode]);

  const initializeAirwallex = useCallback(async () => {
    if (!window.airwallex || !containerRef.current || !externalClientSecret) {
      return;
    }

    try {
      await window.airwallex.createPayment({
        intent: {
          id: externalClientSecret.split('_secret_')[0],
          client_secret: externalClientSecret,
        },
        domElement: '#airwallex-card-element',
        styles: {
          base: {
            color: '#E5E7EB',
            fontSize: '16px',
            fontFamily: 'Inter, system-ui, sans-serif',
            '::placeholder': {
              color: '#6B7280',
            },
          },
          invalid: {
            color: '#EF4444',
          },
        },
        onReady: () => {
          setStatus('ready');
          onReady?.();
        },
        onSuccess: (result: any) => {
          setStatus('success');
          onSuccess?.(result?.paymentIntentId || result?.id);
        },
        onError: (error: any) => {
          setStatus('error');
          setErrorMessage(error?.message || 'Payment failed');
          onError?.(error?.message || 'Payment failed');
        },
      });
    } catch (error: any) {
      console.error('Airwallex initialization error:', error);
      setErrorMessage('Failed to initialize payment form');
    }
  }, [externalClientSecret, onReady, onSuccess, onError]);

  // Handle demo mode payment
  const handleDemoPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    // Validate card details
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    
    if (!validateCardNumber(cleanCardNumber)) {
      setErrorMessage('Invalid card number');
      setIsProcessing(false);
      return;
    }

    if (!validateExpiry(expiry)) {
      setErrorMessage('Invalid expiry date');
      setIsProcessing(false);
      return;
    }

    if (!validateCVC(cvc)) {
      setErrorMessage('Invalid CVC');
      setIsProcessing(false);
      return;
    }

    if (!cardholderName.trim()) {
      setErrorMessage('Please enter cardholder name');
      setIsProcessing(false);
      return;
    }

    // Simulate payment processing
    setStatus('processing');
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success (in demo mode)
    const paymentId = `pi_demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setStatus('success');
    setIsProcessing(false);
    onSuccess?.(paymentId);
  };

  // Handle real payment via Airwallex SDK
  const handleAirwallexPayment = async () => {
    if (!window.airwallex) return;
    
    setIsProcessing(true);
    setStatus('processing');

    try {
      // Trigger payment with Airwallex SDK
      await (window.airwallex as any).confirmPayment({
        paymentIntentId: externalClientSecret?.split('_secret_')[0],
      });
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error?.message || 'Payment failed');
      setIsProcessing(false);
      onError?.(error?.message || 'Payment failed');
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Card type detection
  const cardType = getCardType(cardNumber.replace(/\s/g, ''));

  // Render demo mode payment form
  if (env === 'demo' || demoMode) {
    return (
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <CreditCard size={20} color="#00E676" />
            <span style={styles.headerTitle}>Secure Payment</span>
          </div>
          <div style={styles.amount}>
            {formatCurrency(amount, currency)}
          </div>
        </div>

        {/* Success State */}
        {status === 'success' ? (
          <div style={styles.successContainer}>
            <div style={styles.successIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#00E676" strokeWidth="2" />
                <path d="M8 12l2 2 4-4" stroke="#00E676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={styles.successTitle}>Payment Successful</h3>
            <p style={styles.successMessage}>Your order has been processed successfully.</p>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handleDemoPayment} style={styles.form}>
            {/* Card Number */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Card Number</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  style={styles.input}
                  disabled={isProcessing}
                />
                {cardType && (
                  <div style={styles.cardTypeIcon}>
                    {cardType.toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Expiry and CVC Row */}
            <div style={styles.row}>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>Expiry Date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  style={styles.input}
                  disabled={isProcessing}
                />
              </div>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>CVC</label>
                <div style={styles.inputWrapper}>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    style={styles.input}
                    disabled={isProcessing}
                  />
                  <Lock size={16} color="#6B7280" style={styles.cvcIcon} />
                </div>
              </div>
            </div>

            {/* Cardholder Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Cardholder Name</label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="John Doe"
                style={styles.input}
                disabled={isProcessing}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div style={styles.errorContainer}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                  <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
                  <path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || status === 'processing'}
              style={{
                ...styles.submitButton,
                opacity: isProcessing ? 0.7 : 1,
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? (
                <span style={styles.loadingText}>
                  <span style={styles.spinner}></span>
                  Processing...
                </span>
              ) : (
                <span style={styles.buttonContent}>
                  <Lock size={18} />
                  Pay {formatCurrency(amount, currency)}
                </span>
              )}
            </button>

            {/* Demo Notice */}
            <div style={styles.demoNotice}>
              Demo Mode - No real payment will be processed
            </div>
          </form>
        )}

        {/* Security Footer */}
        <div style={styles.securityFooter}>
          <div style={styles.securityBadge}>
            <Shield size={14} color="#00E676" />
            <span>SSL Encrypted</span>
          </div>
          <div style={styles.securityBadge}>
            <Lock size={14} color="#00E676" />
            <span>Secure Checkout</span>
          </div>
          <div style={styles.securityBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#00E676" strokeWidth="2" fill="none" />
            </svg>
            <span>PCI Compliant</span>
          </div>
        </div>
      </div>
    );
  }

  // Render Airwallex embedded form (production mode)
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <CreditCard size={20} color="#00E676" />
          <span style={styles.headerTitle}>Secure Payment</span>
        </div>
        <div style={styles.amount}>
          {formatCurrency(amount, currency)}
        </div>
      </div>

      {/* Airwallex Card Element Container */}
      <div 
        ref={containerRef}
        id="airwallex-card-element"
        style={styles.airwallexContainer}
      >
        {status === 'idle' && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <span>Loading payment form...</span>
          </div>
        )}
      </div>

      {errorMessage && (
        <div style={styles.errorContainer}>
          {errorMessage}
        </div>
      )}

      <div style={styles.securityFooter}>
        <div style={styles.securityBadge}>
          <Shield size={14} color="#00E676" />
          <span>SSL Encrypted</span>
        </div>
        <div style={styles.securityBadge}>
          <Lock size={14} color="#00E676" />
          <span>Powered by Airwallex</span>
        </div>
      </div>
    </div>
  );
}

// Styles matching Batlienergy dark theme
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#111D2E',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '480px',
    margin: '0 auto',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #1E3A5F',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  headerTitle: {
    color: '#E5E7EB',
    fontSize: '16px',
    fontWeight: '600',
  },
  amount: {
    color: '#00E676',
    fontSize: '24px',
    fontWeight: '700',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  row: {
    display: 'flex',
    gap: '12px',
  },
  label: {
    color: '#9CA3AF',
    fontSize: '13px',
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    backgroundColor: '#0A1628',
    border: '1px solid #1E3A5F',
    borderRadius: '8px',
    color: '#E5E7EB',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  cardTypeIcon: {
    position: 'absolute',
    right: '12px',
    backgroundColor: '#1E3A5F',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#00E676',
  },
  cvcIcon: {
    position: 'absolute',
    right: '12px',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    color: '#EF4444',
    fontSize: '14px',
  },
  submitButton: {
    width: '100%',
    padding: '16px 24px',
    backgroundColor: '#00E676',
    border: 'none',
    borderRadius: '8px',
    color: '#0A1628',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '8px',
    transition: 'all 0.2s',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  loadingText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid transparent',
    borderTopColor: '#0A1628',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  demoNotice: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: '12px',
    marginTop: '8px',
  },
  successContainer: {
    textAlign: 'center',
    padding: '32px 16px',
  },
  successIcon: {
    marginBottom: '16px',
  },
  successTitle: {
    color: '#00E676',
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 8px 0',
  },
  successMessage: {
    color: '#9CA3AF',
    fontSize: '14px',
    margin: 0,
  },
  securityFooter: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: '1px solid #1E3A5F',
  },
  securityBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#9CA3AF',
    fontSize: '12px',
  },
  airwallexContainer: {
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    color: '#9CA3AF',
    fontSize: '14px',
  },
};

export default AirwallexPayment;
