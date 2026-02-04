import { useAppDispatch } from '../../../store/hooks';
import { toggleMeasurementModal } from '../../../store/slices/progressSlice';
import type { BodyMeasurementHistory } from '../../../types/progress';
import { MEASUREMENT_KEYS } from '../../../utils/constants/appConstants';
import ChartContainer from '../../charts/ChartContainer';
import RadarChart from '../../charts/RadarChart';
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';
import type { ProgressData } from '../../../pages/Progress/Progress';
import {
  calculateMeasurementChange,
  formatMeasurementChange,
  getLatestMeasurements,
  getStartMeasurements,
} from '../../../utils/workout/measurement-utils';
import { mapMeasurementsToChartPoints } from '../../../utils/workout/chart-data-utils';

type MeasurementsChartContainerProps = {
  bodyMeasurements: BodyMeasurementHistory | undefined;
  showDetailedView?: boolean;
};

const MeasurementsChartContainer: React.FC<MeasurementsChartContainerProps> = ({
  bodyMeasurements,
  showDetailedView = false,
}) => {
  const latestMeasurements = getLatestMeasurements(bodyMeasurements);
  const startMeasurements = getStartMeasurements(bodyMeasurements);

  if (!latestMeasurements || !startMeasurements) {
    return (
      <div className="overflow-hidden bg-white">
        <div className="px-6 py-6 sm:px-8">
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>No measurement data available</p>
          </div>
        </div>
      </div>
    );
  }

  const startData = mapMeasurementsToChartPoints(startMeasurements);
  const currentData = mapMeasurementsToChartPoints(latestMeasurements);

  const radarDatasets = [
    {
      label: 'Start',
      data: startData,
      borderColor: 'rgb(107, 114, 128)',
      backgroundColor: 'rgba(107, 114, 128, 0.2)',
    },
    {
      label: 'Current',
      data: currentData,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        <div className="h-64">
          <ChartContainer title="Measurement Comparison">
            <RadarChart
              datasets={radarDatasets}
              showLegend={true}
              height={192}
              options={{
                scales: {
                  r: {
                    suggestedMin: 30,
                    suggestedMax: 120,
                    ticks: {
                      callback: function (value) {
                        return value + ' cm';
                      },
                      display: true,
                    },
                  },
                },
              }}
            />
          </ChartContainer>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-medium text-gray-900">Current Measurements</h3>
          <div className="grid grid-cols-2 gap-4">
            {MEASUREMENT_KEYS.map((key) => {
              const currentValue = latestMeasurements[key].value;
              const startValue = startMeasurements[key].value;
              const change = calculateMeasurementChange(latestMeasurements, startMeasurements, key);
              const isPositive = key === 'waist' ? change < 0 : change > 0;

              return (
                <div key={key} className="px-4 py-3 rounded-lg bg-gray-50">
                  <dt className="text-sm font-medium text-gray-500 capitalize">{key}</dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">
                    {currentValue.toFixed(1)} cm
                  </dd>
                  <dd
                    className={`text-xs ${isPositive ? 'text-green-600' : key === 'waist' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {formatMeasurementChange(change)} from start
                  </dd>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-medium text-gray-900">Current Measurements</h3>
          <dl className="grid grid-cols-2 gap-4">
            {Object.entries(latestMeasurements).map(([measurementKey, measurement]) => (
              <div key={measurementKey} className="px-4 py-3 rounded-lg bg-gray-50">
                <dt className="text-base font-medium text-gray-500">{measurementKey}</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{measurement.value} cm</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {showDetailedView && (
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Measurement History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full! divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase">
                    Date
                  </th>
                  {MEASUREMENT_KEYS.map((key) => (
                    <th
                      key={key}
                      className="px-3 py-2 text-xs font-medium text-left text-gray-500 capitalize"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bodyMeasurements &&
                  bodyMeasurements.entries.length !== 0 &&
                  bodyMeasurements.entries.slice(0, 5).map((entry, index) => (
                    <tr key={entry.id}>
                      <td className="px-3 py-2 text-sm text-gray-900">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </td>
                      {MEASUREMENT_KEYS.map((key) => (
                        <td key={key} className="px-3 py-2 text-sm text-gray-900">
                          {entry.measurements[key].value.toFixed(1)} cm
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

const MeasurementsTab: React.FC<ProgressData & { showDetailedView?: boolean }> = ({
  userProgress,
  isLoading,
  showDetailedView = true,
}) => {
  if (isLoading) {
    <LoadingSpinner size="md" />;
  }

  const dispatch = useAppDispatch();
  const bodyMeasurements = userProgress?.bodyMeasurements;

  return (
    <div className="tab-content">
      <div className="px-4 mt-8 sm:px-0">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Body Measurements</h2>
              <Button onClick={() => dispatch(toggleMeasurementModal(true))}>
                <Icon name="plus" className="mr-1"></Icon>
                Add Measurements
              </Button>
            </div>
            <MeasurementsChartContainer
              bodyMeasurements={bodyMeasurements}
              showDetailedView={showDetailedView}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementsTab;
