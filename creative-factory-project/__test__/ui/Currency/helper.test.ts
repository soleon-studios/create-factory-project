import { HistoricalData } from '@/app/api/currency/historical/route';
import { LineChartData } from '@/app/components/lineChart/lineChart';
import { parseDataToLineChart } from '@/app/ui/Currency/helper';

describe('parseDataToLineChart', () => {
  it('should correctly parse historical data to line chart format', () => {
    const mockHistoricalData: HistoricalData[] = [
      { date: '2023-09-22', rate: 1.5 },
      { date: '2023-09-23', rate: 1.6 },
      { date: '2023-09-24', rate: 1.7 },
    ];

    const expectedOutput: LineChartData = {
      labels: ['2023-09-22', '2023-09-23', '2023-09-24'],
      data: [1.5, 1.6, 1.7],
    };
    const result = parseDataToLineChart(mockHistoricalData);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty input array', () => {
    const mockHistoricalData: HistoricalData[] = [];

    const expectedOutput: LineChartData = {
      labels: [],
      data: [],
    };

    const result = parseDataToLineChart(mockHistoricalData);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle single item input array', () => {
    const mockHistoricalData: HistoricalData[] = [
      { date: '2023-09-24', rate: 1.7 },
    ];

    const expectedOutput: LineChartData = {
      labels: ['2023-09-24'],
      data: [1.7],
    };

    const result = parseDataToLineChart(mockHistoricalData);
    expect(result).toEqual(expectedOutput);
  });

  it('should preserve the order of input data', () => {
    const mockHistoricalData: HistoricalData[] = [
      { date: '2023-09-24', rate: 1.7 },
      { date: '2023-09-22', rate: 1.5 },
      { date: '2023-09-23', rate: 1.6 },
    ];

    const expectedOutput: LineChartData = {
      labels: ['2023-09-24', '2023-09-22', '2023-09-23'],
      data: [1.7, 1.5, 1.6],
    };

    const result = parseDataToLineChart(mockHistoricalData);
    expect(result).toEqual(expectedOutput);
  });
});
