import type { BaseChartProps } from './BaseChart';
import type { ChartData } from 'chart.js';
import BaseChart from './BaseChart';
import { bodyWeightStatsMock, type MonthlyBodyWeightStat } from '../../store/slices/dashboardSlice';

export interface BodyWeightChartProps extends Omit<BaseChartProps, 'data'> {
  data?: MonthlyBodyWeightStat[];
  showGrid?: boolean;
  showLegend?: boolean;
  lineColor?: string;
  fillColor?: string;
}

const LineChart: React.FC<BodyWeightChartProps> = ({
  data = bodyWeightStatsMock,
  showGrid = true,
  showLegend = true,
  lineColor = '#3b82f6',
  fillColor = 'rgba(59, 130, 246, 0.1)',
  options,
  ...props
}) => {
  const chartData: ChartData<'line'> = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Body Weight (kg)',
        data: data.map((item) => item.value),
        borderColor: lineColor,
        backgroundColor: fillColor,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: lineColor,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions: BaseChartProps['options'] = {
    plugins: {
      legend: {
        display: showLegend,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Weight: ${context.parsed.y} kg`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: showGrid,
        },
        title: {
          display: true,
          text: 'Weight (kg)',
          color: '#6b7280',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
          color: '#6b7280',
        },
      },
    },
  };

  const mergedOptions = { ...chartOptions, ...options };

  return <BaseChart data={chartData} options={mergedOptions} {...props} />;
};

export default LineChart;
