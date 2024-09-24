import { loadingSvg } from '@/app/icons';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import styles from './linechart.module.css';

export interface LineChartData {
  labels: string[];
  data: number[];
}

interface Props {
  data: LineChartData;
}

export const LineChart = ({ data }: Props) => {
  if (data.data.length === 0 || data.labels.length === 0)
    return (
      <div className={styles.loadingContainer}>
        <Image src={loadingSvg} alt='calc-svg' width={20} height={20} />
        <p>Fetching data, please wait...</p>
      </div>
    );

  const dataObject = {
    labels: data.labels,
    datasets: [
      {
        label: 'Foreign Exchange',
        data: data.data,
        borderWidth: 2,
        fill: {
          target: 'origin',
          above: 'rgb(75, 192, 192, 0.3)',
        },
        borderColor: 'rgb(75, 192, 192)',
        pointStyle: false,
        lineTension: 0.5,
      },
    ],
  };

  return (
    <div>
      <Line
        data={dataObject}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
