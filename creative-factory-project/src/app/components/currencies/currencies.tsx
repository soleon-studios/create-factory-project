'use client';

import { InputCurrency } from '@/app/ui';
import { useCurrency } from '@/app/context/CurrencyContext';

export const Currencies = () => {
  const { currencyState } = useCurrency();
  return (
    <>
      {currencyState.length > 0 ? (
        currencyState.map((currency, idx) => (
          <InputCurrency
            key={`${idx}-${currency}`}
            currency={currency.currency}
            rate={currency.rate}
            value={currency.value}
            symbol={currency.symbol}
          />
        ))
      ) : (
        <p>Fetching currency data...</p>
      )}
    </>
  );
};
