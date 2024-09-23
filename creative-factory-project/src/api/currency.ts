import { DefaultCurrency } from '@/app/types/currencies';

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
    '/api/currency?' +
      new URLSearchParams({
        value,
        from,
      }).toString()
  );

  return convertedResult;
};
