import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  BarElement,
  ArcElement,
  type ChartOptions,
  type ChartData,
  type ChartType,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  BarElement,
  ArcElement
);

export interface BaseChartProps {
  data: ChartData;
  options?: ChartOptions;
  height?: string | number;
  width?: string | number;
  type?: ChartType;
}

const BaseChart: React.FC<BaseChartProps> = ({
  data,
  options,
  height = '100%',
  width = '100%',
  type = 'line',
}) => {
  const defaultOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#6b7280',
          font: {
            family: 'system-ui, -apple-system, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div style={{ height, width }}>
      <Chart type={type} data={data} options={mergedOptions} />
    </div>
  );
};

export default BaseChart;
