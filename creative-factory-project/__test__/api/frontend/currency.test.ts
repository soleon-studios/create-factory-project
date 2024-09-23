import { getCurrencyConverted } from '@/api/currency';
import { DefaultCurrency } from '@/app/types/currencies';

// Mock the global fetch function
global.fetch = jest.fn();

describe('getCurrencyConverted', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should throw an error if value is empty', async () => {
    await expect(
      getCurrencyConverted({ value: undefined, from: 'USD' as DefaultCurrency })
    ).rejects.toThrow('Value is empty');
  });

  it('should call fetch with correct URL', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ result: 'mocked data' }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await getCurrencyConverted({
      value: '100',
      from: 'USD' as DefaultCurrency,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/currency?value=100&from=USD'
    );
  });

  it('should return the fetch result', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ result: 'mocked data' }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getCurrencyConverted({
      value: '100',
      from: 'USD' as DefaultCurrency,
    });

    expect(result).toBe(mockResponse);
  });

  it('should handle fetch errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    await expect(
      getCurrencyConverted({ value: '100', from: 'USD' as DefaultCurrency })
    ).rejects.toThrow('Fetch error');
  });
});
