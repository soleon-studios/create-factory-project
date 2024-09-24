import { HistoricalData } from '@/app/api/currency/historical/route';
import { LineChartData } from '@/app/components/lineChart/lineChart';

export const parseDataToLineChart = (data: HistoricalData[]): LineChartData => {
  const lineData: number[] = [];
  const lineLabels: string[] = [];

  data.forEach((d) => {
    lineLabels.push(d.date);
    lineData.push(d.rate);
  });
  return {
    labels: lineLabels,
    data: lineData,
  };
};
