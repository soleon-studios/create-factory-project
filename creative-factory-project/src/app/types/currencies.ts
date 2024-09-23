export type DefaultCurrency = 'AUD';
export const Currencies = ['USD', 'NZD', 'EUR', 'CAD', 'GBP'] as const;
export type Currency = (typeof Currencies)[number];
