import { NextRequest } from 'next/server';
import { GET } from '@/app/api/currency/route';
import { routeMockData } from './mockData';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body) => ({
      json: async () => body,
    })),
  },
  NextRequest: jest.fn().mockImplementation((url, init) => ({
    url,
    ...init,
  })),
}));

describe('GET Currency API', () => {
  it('should return currency data when the API call is successful', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(routeMockData),
      })
    );

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ value: '1000', from: 'AUD' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    expect(responseData.success).toBe(true);
    expect(responseData.data?.currencies).toHaveLength(5);
  });

  it('should return success is false when an error is thrown', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error('API Error')));

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ value: '1000' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    await expect(responseData.success).toBe(false);
  });
});
