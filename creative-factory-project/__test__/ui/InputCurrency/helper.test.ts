import { Currency } from '@/app/types/currencies';
import { getFlagSvg } from '@/app/ui/InputCurrency/helper';

// Mock SVG imports
jest.mock('../../../src/app/icons/index', () => ({
  usdSvg: 'usd.svg',
  audSvg: 'aud.svg',
  cadSvg: 'cad.svg',
  euroSvg: 'euro.svg',
  gbpSvg: 'gbp.svg',
  nzdSvg: 'nzd.svg',
}));

describe('getFlagSvg', () => {
  it('should return the correct SVG for USD', () => {
    expect(getFlagSvg('USD')).toBe('usd.svg');
  });

  it('should return the correct SVG for AUD', () => {
    expect(getFlagSvg('AUD')).toBe('aud.svg');
  });

  it('should return the correct SVG for CAD', () => {
    expect(getFlagSvg('CAD')).toBe('cad.svg');
  });

  it('should return the correct SVG for EUR', () => {
    expect(getFlagSvg('EUR')).toBe('euro.svg');
  });

  it('should return the correct SVG for GBP', () => {
    expect(getFlagSvg('GBP')).toBe('gbp.svg');
  });

  it('should return the correct SVG for NZD', () => {
    expect(getFlagSvg('NZD')).toBe('nzd.svg');
  });

  it('should return undefined for an unsupported currency', () => {
    expect(getFlagSvg('JPY' as Currency)).toBe('aud.svg');
  });
});
