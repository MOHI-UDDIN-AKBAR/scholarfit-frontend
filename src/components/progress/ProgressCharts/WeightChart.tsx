import type { BodyWeightHistory } from '../../../types/progress';
import { mapBodyWeightEntriesToChartData } from '../../../utils/workout/chart-data-utils';
import ChartContainer from '../../charts/ChartContainer';
import LineChart from '../../charts/LineChart';

const WeightChart: React.FC<{ bodyWeightHistory: BodyWeightHistory }> = ({ bodyWeightHistory }) => {
  const bodyWeightChartData = mapBodyWeightEntriesToChartData(bodyWeightHistory);

  if (!bodyWeightChartData) return null;

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Weight Progress</h2>
        <div className="h-64">
          <ChartContainer title="Body Weight History">
            <LineChart
              data={bodyWeightChartData}
              height={192}
              showLegend={false}
              datasetLabel="Body Weight History"
              yAxisLabel="Weight (kg)"
              tooltipFormatter={(value) => `${value} kg`}
            />
          </ChartContainer>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">Goal:</span> 70 kg by March 2025
          </div>
          <button className="text-sm font-medium text-primary-600 hover:text-primary-500">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeightChart;
