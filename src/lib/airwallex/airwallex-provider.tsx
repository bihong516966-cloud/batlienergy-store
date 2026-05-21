'use client';

import { useEffect, useState } from 'react';

// Extend Window interface for Airwallex SDK
interface AirwallexSDK {
  init: (config: { env: string }) => Promise<void>;
  createPayment: (config: any) => Promise<any>;
  destroy: () => void;
}

declare global {
  interface Window {
    airwallex?: AirwallexSDK;
  }
}

/**
 * Airwallex SDK Provider
 * Loads the Airwallex SDK script and provides SDK instance to child components
 * 
 * @param children - Child components that need access to Airwallex SDK
 * @param env - Environment: 'production' | 'staging' | 'demo'
 */
export function AirwallexProvider({ 
  children,
  env = 'production' 
}: { 
  children: React.ReactNode;
  env?: 'production' | 'staging' | 'demo';
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Demo mode: skip SDK loading
    if (env === 'demo') {
      setIsLoaded(true);
      return;
    }

    // Check if SDK is already loaded
    if (typeof window !== 'undefined' && window.airwallex) {
      setIsLoaded(true);
      return;
    }

    const loadSDK = async () => {
      try {
        // Load Airwallex SDK script
        const script = document.createElement('script');
        script.src = 'https://checkout.airwallex.com/assets/card-element.bundle.min.js';
        script.async = true;
        
        script.onload = async () => {
          if (window.airwallex) {
            await window.airwallex.init({
              env: env === 'staging' ? 'staging' : 'production',
            });
            setIsLoaded(true);
          }
        };

        script.onerror = () => {
          setError('Failed to load Airwallex SDK');
          console.error('Airwallex SDK failed to load');
        };

        document.body.appendChild(script);
      } catch (err) {
        setError('Failed to initialize Airwallex SDK');
        console.error('Airwallex SDK initialization error:', err);
      }
    };

    loadSDK();

    return () => {
      // Cleanup: remove script on unmount
      const script = document.querySelector('script[src*="airwallex"]');
      if (script) {
        script.remove();
      }
    };
  }, [env]);

  // Provide loading state and error to children via context
  if (error) {
    return (
      <div style={{
        padding: '2rem',
        backgroundColor: '#1a0a0a',
        border: '1px solid #5f1e1e',
        borderRadius: '8px',
        color: '#ff6b6b'
      }}>
        <p>Payment SDK Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#00E676',
            color: '#0A1628',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div data-airwallex-loaded={isLoaded} data-env={env}>
      {children}
    </div>
  );
}

/**
 * Hook to check if Airwallex SDK is loaded and ready
 */
export function useAirwallexSDK(env: 'production' | 'staging' | 'demo' = 'production') {
  const [isReady, setIsReady] = useState(env === 'demo');
  const [sdk, setSdk] = useState<AirwallexSDK | null>(null);

  useEffect(() => {
    if (env === 'demo') {
      setIsReady(true);
      return;
    }

    const checkSDK = () => {
      if (typeof window !== 'undefined' && window.airwallex) {
        setSdk(window.airwallex);
        setIsReady(true);
      }
    };

    // Check immediately
    checkSDK();

    // Poll for SDK if not loaded
    if (!sdk) {
      const interval = setInterval(checkSDK, 500);
      return () => clearInterval(interval);
    }
  }, [env, sdk]);

  return { isReady, sdk };
}

export default AirwallexProvider;
