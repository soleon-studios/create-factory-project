'use client';
import Image from 'next/image';
import styles from './InputCurrency.module.css';
import { getFlagSvg } from './helper';
import { calcSvg, loadingSvg } from '@/app/icons';
import { DefaultCurrency } from '@/app/types/currencies';
import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useCurrency } from '@/app/context/CurrencyContext';
import { debounce } from '@/app/util/debounce';

interface Props {
  currency: DefaultCurrency;
  value: string;
}

export const InputCurrency = ({
  currency,
  value = '1000',
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
            <CurrencyInput
              className={styles.input}
              id='input-example'
              name='input-name'
              prefix='$'
              defaultValue={1000}
              decimalsLimit={2}
              onValueChange={async (value) => {
                setConvertingValue(value ?? '0');
                const debouncedApiCall = debounce(
                  () => fetchCurrencies(value ?? '0'),
                  500
                );
                await debouncedApiCall();
              }}
            />
          </div>
        </div>
        <div className={styles.calc}>
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
        </div>
      </div>
    </>
  );
};
