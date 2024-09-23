/* eslint-disable @typescript-eslint/no-unused-vars */
import { Currencies, Currency as CurrencyType } from '@/app/types/currencies';
import { NextRequest, NextResponse } from 'next/server';

const APP_ID = 'cd0b7512fc73436295cfc61d83d86c53';

export interface Currency {
  currency: CurrencyType;
  value: string;
  rate: string;
  symbol: string;
}

export interface CurrencyResponse {
  currencies: Currency[];
}

interface DefaultResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// To handle a GET request to /api
export async function GET(
  request: NextRequest
): Promise<NextResponse<DefaultResponse<CurrencyResponse>>> {
  const value = request.nextUrl.searchParams.get('value') ?? '1000.00';
  const from = request.nextUrl.searchParams.get('from');

  try {
    const result = await fetch(
      `https://openexchangerates.org/api/latest.json?base=${from}&app_id=${APP_ID}`
    ).then((data) => data.json());

    const response = buildReponse(result.rates, value);

    return NextResponse.json(
      {
        message: 'success',
        data: {
          currencies: response,
        },
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}

const currencySymbolMapping: Record<CurrencyType, string> = {
  CAD: '$',
  EUR: '€',
  GBP: '£',
  NZD: '$',
  USD: '$',
};

const buildReponse = (data: { [key: string]: number }, value: string) => {
  return Currencies.map((currency) => {
    const rate = data[currency];

    return {
      currency,
      value: (rate * Number(value)).toString(),
      rate: rate.toString(),
      symbol: currencySymbolMapping[currency],
    };
  });
};
