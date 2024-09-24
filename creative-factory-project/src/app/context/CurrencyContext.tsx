'use client';

import { getCurrencyConverted, getPastHistoricalData } from '@/api/currency';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Currency } from '../api/currency/convert/route';
import { Currency as CurrencyType } from '../types/currencies';
import { HistoricalData } from '../api/currency/historical/route';

type CurrencyContextType = {
  currencyState: Currency[];
  isCurrencyConvertLoaded: boolean;
  fetchCurrencies: (value: string) => Promise<void>;
  fetchHistoricalData: (toCurrency: CurrencyType) => Promise<void>;
  historicalData: HistoricalData[];
  resetHistoricalData: () => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

type CurrencyProviderProps = {
  children: ReactNode;
};

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [currencyState, setCurrencyState] = useState<Currency[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [isCurrencyConvertLoaded, setIsCurrencyConvertLoaded] =
    useState<boolean>(true);

  const resetHistoricalData = () => setHistoricalData([]);

  const fetchCurrencies = async (value: string) => {
    setIsCurrencyConvertLoaded(false);
    try {
      const convertedCurrencies = await getCurrencyConverted({
        value,
        from: 'AUD',
      }).then((data) => data.json());

      if (!convertedCurrencies.success) {
        return;
      }

      setCurrencyState(convertedCurrencies.data.currencies);
    } catch (error) {
      console.error('Failed to fetch converted currencies', error);
    } finally {
      setIsCurrencyConvertLoaded(true);
    }
  };

  const fetchHistoricalData = async (toCurrency: CurrencyType) => {
    try {
      const convertedCurrencies = await getPastHistoricalData(
        'AUD',
        toCurrency
      ).then((data) => data.json());

      if (!convertedCurrencies.success) {
        throw new Error('Could not fetch historical data');
      }

      setHistoricalData(convertedCurrencies.data.historicalData);
    } catch (error) {
      console.error('Failed to fetch historical data', error);
    }
  };

  useEffect(() => {
    fetchCurrencies('1000');
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        currencyState,
        fetchCurrencies,
        isCurrencyConvertLoaded,
        fetchHistoricalData,
        historicalData,
        resetHistoricalData,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
