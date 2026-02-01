import type { ChartData } from 'chart.js';
import type { BaseChartProps } from './BaseChart';
import BaseChart from './BaseChart';

export interface RadarChartPoint {
  label: string;
  value: number;
}

export interface RadarDataset {
  label: string;
  data: RadarChartPoint[];
  borderColor: string;
  backgroundColor: string;
}

export interface RadarChartProps extends Omit<BaseChartProps, 'data'> {
  data?: RadarChartPoint[];
  datasets?: RadarDataset[];
  datasetLabel?: string;
  showGrid?: boolean;
  showLegend?: boolean;
}

const RadarChart: React.FC<RadarChartProps> = ({
  data,
  datasets,
  datasetLabel = 'Value',
  showGrid = true,
  showLegend = true,
  options,
  ...props
}) => {
  if (!data && !datasets) {
    throw new Error('RadarChart requires either data or datasets prop');
  }

  let chartData: ChartData<'radar'>;

  if (datasets && datasets.length > 0) {
    chartData = {
      labels: datasets[0].data.map((point) => point.label),
      datasets: datasets.map((dataset) => ({
        label: dataset.label,
        data: dataset.data.map((point) => point.value),
        borderColor: dataset.borderColor,
        backgroundColor: dataset.backgroundColor,
        borderWidth: 2,
        pointBackgroundColor: dataset.borderColor,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      })),
    };
  } else if (data && data.length > 0) {
    chartData = {
      labels: data.map((point) => point.label),
      datasets: [
        {
          label: datasetLabel,
          data: data.map((point) => point.value),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  } else {
    chartData = {
      labels: [],
      datasets: [],
    };
  }

  const chartOptions: BaseChartProps['options'] = {
    plugins: {
      legend: {
        display: showLegend,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.r} cm`,
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          display: showGrid,
          color: 'rgba(229, 231, 235, 0.5)',
        },
        angleLines: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        pointLabels: {
          color: '#6b7280',
          font: {
            size: 12,
            family: 'system-ui, -apple-system, sans-serif',
          },
        },
        ticks: {
          display: false,
          stepSize: 10,
        },
      },
    },
  };

  return (
    <BaseChart type="radar" data={chartData} options={{ ...chartOptions, ...options }} {...props} />
  );
};

export default RadarChart;
