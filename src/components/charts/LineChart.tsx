import type { BaseChartProps } from './BaseChart';
import type { ChartData } from 'chart.js';
import BaseChart from './BaseChart';
import type {
  BodyWeightChartPoint,
  LineChartPoint,
  VolumeTrendChartPoint,
} from '../../types/dashboard';

export interface BodyWeightChartProps extends Omit<BaseChartProps, 'data'> {
  data?: BodyWeightChartPoint[] | VolumeTrendChartPoint[];
  showGrid?: boolean;
  showLegend?: boolean;
  lineColor?: string;
  fillColor?: string;
}

export interface LineChartProps extends Omit<BaseChartProps, 'data'> {
  data: LineChartPoint[];
  datasetLabel?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  lineColor?: string;
  fillColor?: string;
  tooltipFormatter?: (value: number) => string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  datasetLabel = 'Value',
  showGrid = true,
  showLegend = true,
  lineColor = '#3b82f6',
  fillColor = 'rgba(59, 130, 246, 0.1)',
  options,
  xAxisLabel = '',
  yAxisLabel = '',
  tooltipFormatter,
  ...props
}) => {
  const chartData: ChartData<'line'> = {
    labels: data.map((point) => point.label),
    datasets: [
      {
        label: datasetLabel,
        data: data.map((point) => point.value),
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
          label: (context) =>
            tooltipFormatter && context.parsed.y
              ? tooltipFormatter(context.parsed.y)
              : `${context.parsed.y}`,
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
          display: Boolean(yAxisLabel),
          text: yAxisLabel,
          color: '#6b7280',
        },
      },
      x: {
        title: {
          display: Boolean(xAxisLabel),
          text: xAxisLabel,
          color: '#6b7280',
        },
      },
    },
  };

  return <BaseChart data={chartData} options={{ ...chartOptions, ...options }} {...props} />;
};

export default LineChart;
