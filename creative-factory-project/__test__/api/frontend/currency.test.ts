import { getCurrencyConverted, getPastHistoricalData } from '@/api/currency';
import { DefaultCurrency, Currency } from '@/app/types/currencies';

describe('currency API', () => {
  describe('getCurrencyConverted', () => {
    beforeEach(() => {
      // Clear all mocks before each test
      jest.clearAllMocks();
      // Mock the global fetch function
      global.fetch = jest.fn();
    });

    it('should throw an error if value is empty', async () => {
      await expect(
        getCurrencyConverted({
          value: undefined,
          from: 'USD' as DefaultCurrency,
        })
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
        '/api/currency/convert?value=100&from=USD'
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

  describe('getPastHistoricalData', () => {
    beforeEach(() => {
      // Clear all mocks before each test
      jest.clearAllMocks();
      // Mock the global fetch function
      global.fetch = jest.fn();
    });

    it('should call fetch with the correct URL and parameters', async () => {
      // Arrange
      const mockFrom: DefaultCurrency = 'AUD';
      const mockTo: Currency = 'EUR';
      const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({}) };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await getPastHistoricalData(mockFrom, mockTo);

      // Assert
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/currency/historical?from=AUD&to=EUR'
      );
      expect(result).toBe(mockResponse);
    });

    it('should pass through any errors from fetch', async () => {
      // Arrange
      const mockFrom: DefaultCurrency = 'AUD';
      const mockTo: Currency = 'EUR';
      const mockError = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValue(mockError);

      // Act & Assert
      await expect(getPastHistoricalData(mockFrom, mockTo)).rejects.toThrow(
        'Network error'
      );
    });
  });
});
