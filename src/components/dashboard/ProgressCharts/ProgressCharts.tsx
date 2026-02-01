import clsx from 'clsx';
import type { BodyWeightTrend } from '../../../types/dashboard';
import type { VolumeTrend } from '../../../types/session';
import ChartContainer from '../../charts/ChartContainer';
import LineChart from '../../charts/LineChart';
import { Link } from 'react-router';
import {
  mapBodyWeightTrendToChartData,
  mapVolumeTrendToChartData,
} from '../../../utils/workout/chart-data-utils';

type ProgressChartsProps = {
  volumeTrend: VolumeTrend[];
  bodyWeightTrend: BodyWeightTrend[] | undefined;
};

const ProgressCharts: React.FC<ProgressChartsProps> = ({ volumeTrend, bodyWeightTrend }) => {
  const bodyWeightChartData = bodyWeightTrend
    ? mapBodyWeightTrendToChartData(bodyWeightTrend)
    : undefined;
  const volumeChartData = mapVolumeTrendToChartData(volumeTrend);

  const isDataExist = bodyWeightChartData && volumeChartData;

  if (!isDataExist) return null;

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Progress Overview</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div
          className={clsx(
            'grid grid-cols-1 gap-6 items-center',
            volumeChartData.length > 0 &&
              bodyWeightChartData &&
              bodyWeightChartData?.length > 0 &&
              'md:grid-cols-2'
          )}
        >
          {bodyWeightChartData ? (
            <div className="h-56">
              <ChartContainer title="Weight Trend">
                <LineChart
                  data={bodyWeightChartData}
                  height={192}
                  showLegend={false}
                  datasetLabel="Body Weight"
                  yAxisLabel="Weight (kg)"
                  tooltipFormatter={(value) => `${value} kg`}
                />
              </ChartContainer>
            </div>
          ) : (
            <Link
              to="/progress"
              className="inline-flex items-center w-2/5 px-3 py-2 mx-auto text-sm font-medium text-white border border-transparent rounded-md bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              Add Body Weight
            </Link>
          )}
          {volumeChartData.length > 0 && (
            <div className="h-56">
              <ChartContainer title="Weekly Volume">
                <LineChart
                  data={volumeChartData}
                  datasetLabel="Total Volume"
                  yAxisLabel="Volume"
                  tooltipFormatter={(value) => `${value} kg`}
                  lineColor="#8b5cf6"
                  fillColor="rgba(139, 92, 246, 0.1)"
                  height={192}
                />
              </ChartContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;
