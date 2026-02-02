import type { BodyMeasurementHistory } from '../../../types/progress';
import { mapMeasurementsToChartPoints } from '../../../utils/workout/chart-data-utils';
import {
  getLatestMeasurements,
  getStartMeasurements,
} from '../../../utils/workout/measurement-utils';
import ChartContainer from '../../charts/ChartContainer';
import RadarChart from '../../charts/RadarChart';

interface BodyMeasurementChartProps {
  measurementHistory: BodyMeasurementHistory;
  showDetailedView?: boolean;
}

const BodyMeasurementChart: React.FC<BodyMeasurementChartProps> = ({
  measurementHistory,
  showDetailedView = false,
}) => {
  const latestMeasurements = getLatestMeasurements(measurementHistory);
  const startMeasurements = getStartMeasurements(measurementHistory);

  if (!latestMeasurements || !startMeasurements) {
    return (
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
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
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Body Measurements</h2>
        </div>

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
        </div>
      </div>
    </div>
  );
};

export default BodyMeasurementChart;
