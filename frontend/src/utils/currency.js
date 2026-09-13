
export const INR_TO_USD_RATE = 83.12;

export const CURRENCIES = {
  INR: { code: 'INR', locale: 'en-IN', symbol: '₹' },
  USD: { code: 'USD', locale: 'en-US', symbol: '$' },
};

export const convertAmount = (amountInr, currency) => {
  const value = Number(amountInr) || 0;
  if (currency === 'USD') return value / INR_TO_USD_RATE;
  return value;
};

export const formatCurrency = (amountInr, currency = 'INR', options = {}) => {
  const { maximumFractionDigits = 0 } = options;
  const converted = convertAmount(amountInr, currency);
  const { code, locale } = CURRENCIES[currency] || CURRENCIES.INR;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits,
  }).format(converted);
};

export const formatCompactCurrency = (amountInr, currency = 'INR') => {
  const converted = convertAmount(amountInr, currency);
  const { symbol } = CURRENCIES[currency] || CURRENCIES.INR;

  if (converted >= 1000) return `${symbol}${(converted / 1000).toFixed(0)}k`;
  return `${symbol}${converted.toFixed(0)}`;
};
