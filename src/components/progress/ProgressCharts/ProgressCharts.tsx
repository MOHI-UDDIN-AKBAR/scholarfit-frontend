import StrengthChart from './StrengthChart';
import WeightChart from './WeightChart';

const ProgressCharts: React.FC = () => {
  return (
    <div className="px-4 mt-8 sm:px-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeightChart />
        <StrengthChart />
      </div>
    </div>
  );
};

export default ProgressCharts;
