export const locales = [
  'en', 'es', 'pt', 'de', 'fr', 'it', 'ru', 'ja', 'ko', 'ar',
  'hi', 'tr', 'vi', 'th', 'id', 'pl', 'nl', 'sv', 'zh', 'bn',
  'ur', 'sw', 'fa', 'he'
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
  hi: 'हिन्दी',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
  pl: 'Polski',
  nl: 'Nederlands',
  sv: 'Svenska',
  zh: '中文',
  bn: 'বাংলা',
  ur: 'اردو',
  sw: 'Kiswahili',
  fa: 'فارسی',
  he: 'עברית',
};

export const rtlLocales: Locale[] = ['ar', 'ur', 'he', 'fa'];

export const currencyMap: Record<Locale, string> = {
  en: 'USD',
  es: 'USD',
  pt: 'BRL',
  de: 'EUR',
  fr: 'EUR',
  it: 'EUR',
  ru: 'RUB',
  ja: 'JPY',
  ko: 'KRW',
  ar: 'SAR',
  hi: 'INR',
  tr: 'TRY',
  vi: 'VND',
  th: 'THB',
  id: 'IDR',
  pl: 'PLN',
  nl: 'EUR',
  sv: 'SEK',
  zh: 'CNY',
  bn: 'BDT',
  ur: 'PKR',
  sw: 'TZS',
  fa: 'IRR',
  he: 'ILS',
};
