'use client';
import Image from 'next/image';
import styles from './InputCurrency.module.css';
import { getFlagSvg } from './helper';
import { calcSvg, loadingSvg } from '@/app/icons';
import { Currency, DefaultCurrency } from '@/app/types/currencies';
import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useCurrency } from '@/app/context/CurrencyContext';
import { debounce } from '@/app/util/debounce';

interface Props {
  isTargetCurrency?: boolean;
  currency: Currency | DefaultCurrency;
  rate?: string;
  value?: string;
  symbol?: string;
}

export const InputCurrency = ({
  isTargetCurrency = false,
  currency,
  value = '1000',
  rate,
  symbol = '$',
}: Props): React.ReactNode => {
  const [convertingValue, setConvertingValue] = useState<string>(value);
  const { fetchCurrencies, isCurrencyConvertLoaded } = useCurrency();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.flagCurrencyContainer}>
          <div className={styles.flagCurrency}>
            <Image
              className={styles.flag}
              src={getFlagSvg(currency)}
              alt={`${currency}-svg`}
              width={30}
              height={30}
            />
            <p>{currency}</p>
          </div>
          <div className={styles.currency}>
            {isTargetCurrency ? (
              <CurrencyInput
                className={styles.input}
                id='input-example'
                name='input-name'
                prefix='$'
                defaultValue={1000}
                decimalsLimit={2}
                onValueChange={async (value) => {
                  setConvertingValue(value ?? '');
                  const debouncedApiCall = debounce(
                    () => fetchCurrencies(value ?? ''),
                    500
                  );
                  await debouncedApiCall();
                }}
              />
            ) : (
              <p className={styles.currencyAmount}>{`${symbol}${parseFloat(
                value
              ).toFixed(2)}`}</p>
            )}
            {!isTargetCurrency && rate && (
              <p className={styles.currencyRate}>{`1 AUD = ${parseFloat(
                rate
              ).toFixed(4)} ${currency}`}</p>
            )}
          </div>
        </div>
        <div className={styles.calc}>
          {isTargetCurrency && (
            <div
              className={styles.convertButton}
              onClick={() => fetchCurrencies(convertingValue)}
            >
              {isCurrencyConvertLoaded ? (
                <Image src={calcSvg} alt='calc-svg' width={30} height={30} />
              ) : (
                <Image src={loadingSvg} alt='calc-svg' width={30} height={30} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
