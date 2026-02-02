import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';
import type { ProgressData } from '../../../pages/Progress/Progress';
import MeasurementsChart from './MeasurementsChart';
import WeightChart from './WeightChart';

const ProgressCharts: React.FC<ProgressData> = ({ isLoading, userProgress }) => {
  if (isLoading) {
    <LoadingSpinner size="md" />;
  }

  if (!userProgress) return;

  return (
    <div className="px-4 mt-8 sm:px-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeightChart bodyWeightHistory={userProgress.bodyWeight} />
        <MeasurementsChart measurementHistory={userProgress.bodyMeasurements} />
      </div>
    </div>
  );
};

export default ProgressCharts;
