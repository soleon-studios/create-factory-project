'use client';
import Image from 'next/image';
import styles from './Currency.module.css';
import { Currency as CurrencyType } from '@/app/types/currencies';
import React, { useState } from 'react';
import { getFlagSvg } from '../InputCurrency/helper';
import { Modal } from '../Modal/Modal';
import { LineChart } from '@/app/components';
import { useCurrency } from '@/app/context/CurrencyContext';

import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { parseDataToLineChart } from './helper';

Chart.register(CategoryScale);

interface Props {
  currency: CurrencyType;
  rate: string;
  value: string;
  symbol: string;
}

export const Currency = ({
  currency,
  value = '1000',
  rate,
  symbol = '$',
}: Props): React.ReactNode => {
  const [showModal, setShowModal] = useState(false);
  const formatedValue = Number(value).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  const { historicalData, fetchHistoricalData, resetHistoricalData } =
    useCurrency();

  const onClickHandler = () => {
    fetchHistoricalData(currency);
    setShowModal(true);
  };

  const onClickModalClose = () => {
    setShowModal(false);
    resetHistoricalData();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.flagCurrencyContainer} onClick={onClickHandler}>
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
            <p
              className={styles.currencyAmount}
            >{`${symbol}${formatedValue}`}</p>

            <p className={styles.currencyRate}>{`1 AUD = ${parseFloat(
              rate
            ).toFixed(4)} ${currency}`}</p>
          </div>
        </div>
        <div className={styles.calc}></div>
      </div>
      {showModal && (
        <Modal onClose={onClickModalClose} title={`AUD/${currency}`}>
          <LineChart data={parseDataToLineChart(historicalData)} />
        </Modal>
      )}
    </>
  );
};
