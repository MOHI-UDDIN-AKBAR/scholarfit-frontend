import { useAppDispatch } from '../../../store/hooks';
import { toggleWeightModal } from '../../../store/slices/progressSlice';
import ChartContainer from '../../charts/ChartContainer';
import LineChart from '../../charts/LineChart';
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';
import type { ProgressData } from '../../../pages/Progress/Progress';
import { mapBodyWeightEntriesToChartData } from '../../../utils/workout/chart-data-utils';
import { mapRecentWeightEntries } from '../../../utils/workout/measurement-utils';

const WeightTab: React.FC<ProgressData> = ({ userProgress, isLoading }) => {
  if (isLoading) {
    <LoadingSpinner size="md" />;
  }

  const dispatch = useAppDispatch();

  const bodyWeight = userProgress?.bodyWeight;

  const bodyWeightChartData = mapBodyWeightEntriesToChartData(bodyWeight);
  const recentWeightEntries = mapRecentWeightEntries(bodyWeight);

  return (
    <div className="tab-content">
      <div className="px-4 mt-8 sm:px-0">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Weight Tracking</h2>
              <Button onClick={() => dispatch(toggleWeightModal(true))}>
                <Icon name="plus" className="mr-1"></Icon>
                Add Weight Entry
              </Button>
            </div>
            <div className="mt-6 h-80">
              {bodyWeightChartData ? (
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
              ) : (
                <div className="overflow-hidden bg-white">
                  <div className="px-6 py-6 sm:px-8">
                    <div className="flex items-center justify-center text-gray-500 h-80">
                      <p>No body weight data available</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {recentWeightEntries && (
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-medium text-gray-900">Recent Entries</h3>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full! divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Weight
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Notes
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentWeightEntries.map((weightEntry) => (
                        <tr key={weightEntry.weight}>
                          <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                            {weightEntry.date}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {`${weightEntry.weight} kg`}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {weightEntry.notes ?? ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightTab;
