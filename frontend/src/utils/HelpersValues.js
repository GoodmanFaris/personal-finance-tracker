export const CURRENCIES = [
  { code: "BAM", label: "BAM — Bosnia and Herzegovina Mark" },
  { code: "USD", label: "USD — US Dollar" },
  { code: "EUR", label: "EUR — Euro" },
  { code: "GBP", label: "GBP — British Pound" },
  { code: "CHF", label: "CHF — Swiss Franc" },
  { code: "CAD", label: "CAD — Canadian Dollar" },
  { code: "AUD", label: "AUD — Australian Dollar" },
  { code: "JPY", label: "JPY — Japanese Yen" },
  { code: "CNY", label: "CNY — Chinese Yuan" },
  { code: "SEK", label: "SEK — Swedish Krona" },
  { code: "NOK", label: "NOK — Norwegian Krone" },
];



export const CURRENCY_META = {
  BAM: { symbol: "KM", name: "Bosnia and Herzegovina Mark" },
  USD: { symbol: "$", name: "US Dollar" },
  EUR: { symbol: "€", name: "Euro" },
  GBP: { symbol: "£", name: "British Pound" },
  CHF: { symbol: "CHF", name: "Swiss Franc" },
  CAD: { symbol: "C$", name: "Canadian Dollar" },
  AUD: { symbol: "A$", name: "Australian Dollar" },
  JPY: { symbol: "¥", name: "Japanese Yen" },
  CNY: { symbol: "¥", name: "Chinese Yuan" },
  SEK: { symbol: "kr", name: "Swedish Krona" },
  NOK: { symbol: "kr", name: "Norwegian Krone" },
};

export function getCurrencySymbol(code) {
  if (!code) return "";
  return CURRENCY_META[code]?.symbol || code; // fallback: show code
}

export function formatCurrencyLabel(code) {
  if (!code) return "";
  const meta = CURRENCY_META[code];
  if (!meta) return code;
  return `${meta.symbol} (${code})`;
}
