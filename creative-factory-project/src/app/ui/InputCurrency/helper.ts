import {
  audSvg,
  cadSvg,
  euroSvg,
  gbpSvg,
  nzdSvg,
  usdSvg,
} from '@/app/icons/index';
import { Currency, DefaultCurrency } from '@/app/types/currencies';

export const getFlagSvg = (currency: Currency | DefaultCurrency) => {
  switch (currency) {
    case 'USD':
      return usdSvg;
    case 'AUD':
      return audSvg;
    case 'CAD':
      return cadSvg;
    case 'EUR':
      return euroSvg;
    case 'GBP':
      return gbpSvg;
    case 'NZD':
      return nzdSvg;
    default:
      return audSvg;
  }
};
