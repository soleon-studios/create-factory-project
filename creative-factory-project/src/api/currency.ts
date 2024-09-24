import { Currency, DefaultCurrency } from '@/app/types/currencies';

interface GetCurrencyConverted {
  value: string | undefined;
  from: DefaultCurrency;
}

export const getCurrencyConverted = async ({
  value,
  from,
}: GetCurrencyConverted) => {
  if (!value) {
    throw new Error('Value is empty');
  }
  const convertedResult = fetch(
    '/api/currency/convert?' +
      new URLSearchParams({
        value,
        from,
      }).toString()
  );

  return convertedResult;
};

export const getPastHistoricalData = async (
  from: DefaultCurrency,
  to: Currency
) => {
  const convertedResult = fetch(
    '/api/currency/historical?' +
      new URLSearchParams({
        from,
        to,
      }).toString()
  );

  return convertedResult;
};
