/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { generatePast14Days } from './helper';

const APP_ID = 'cd0b7512fc73436295cfc61d83d86c53';

export interface HistoricalData {
  date: string;
  rate: number;
}

export interface CurrencyResponse {
  historicalData: HistoricalData[];
}

interface DefaultResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// To handle a GET request to /api/currency/historical
export async function GET(
  request: NextRequest
): Promise<NextResponse<DefaultResponse<CurrencyResponse>>> {
  const from = request.nextUrl.searchParams.get('from');
  const to = request.nextUrl.searchParams.get('to') ?? 'AUD';
  const past14Dates = generatePast14Days();

  try {
    const promises = await Promise.all(
      past14Dates.map((date) =>
        fetch(
          `https://openexchangerates.org/api/historical/${date}.json?base=${from}&app_id=${APP_ID}`
        )
      )
    );
    const datesArray = await Promise.all(promises.map((p) => p.json()));

    const filteredByCurrency = datesArray.map((date, idx) => {
      return filterByCurrency(date.rates, past14Dates[idx], to);
    });

    return NextResponse.json(
      {
        message: 'success',
        data: {
          historicalData: filteredByCurrency,
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

const filterByCurrency = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: number },
  date: string,
  currency: string
) => {
  return {
    date: date,
    rate: data[currency ?? 'AUD'],
  };
};
