'use client';

import { getCurrencyConverted } from '@/api/currency';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Currency } from '../api/currency/route';

type CurrencyContextType = {
  currencyState: Currency[];
  isCurrencyConvertLoaded: boolean;
  fetchCurrencies: (value: string) => Promise<void>;
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
  const [isCurrencyConvertLoaded, setIsCurrencyConvertLoaded] =
    useState<boolean>(true);

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

  useEffect(() => {
    fetchCurrencies('1000');
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        currencyState,
        fetchCurrencies,
        isCurrencyConvertLoaded,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
