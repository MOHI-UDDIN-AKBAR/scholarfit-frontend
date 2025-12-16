import { shallowEqual } from 'react-redux';
import { useAppState } from '../../store/hooks';
import type { ProgressTab } from '../../store/slices/progressSlice';
import GoalTracker from './GoalTracker/GoalTracker';
import Header from './Header/Header';
import KeyMetrics from './KeyMetrics/KeyMetrics';
import MeasurementsTab from './MeasurementsTab/MeasurementsTab';
import ProgressCharts from './ProgressCharts/ProgressCharts';
import StrengthTab from './StrengthTab/StrengthTab';
import WeightEntryModal from './WeightEntryModal/WeightEntryModal';
import WeightTab from './WeightTab/WeightTab';
import MeasurementModal from './MeasurementModal/MeasurementModal';

const ProgressOverview: React.FC = () => {
  return (
    <div className="tab-content ">
      <KeyMetrics />
      <ProgressCharts />
      <GoalTracker />
    </div>
  );
};

const tabComponents: Record<ProgressTab['id'], React.FC> = {
  overview: ProgressOverview,
  weight: WeightTab,
  measurements: MeasurementsTab,
  strength: StrengthTab,
};

const Progress: React.FC = () => {
  const { currentTab, isWeightModalOpen, isMeasurementModalOpen } = useAppState(
    (state) => ({
      currentTab: state.progress.currentTab,
      isWeightModalOpen: state.progress.isWeightModalOpen,
      isMeasurementModalOpen: state.progress.isMeasurementModalOpen,
    }),
    shallowEqual
  );

  const Component = tabComponents[currentTab.id];

  if (!Component) return null;

  return (
    <section className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Header />
      <Component />
      {isWeightModalOpen && <WeightEntryModal />}
      {isMeasurementModalOpen && <MeasurementModal />}
    </section>
  );
};

export default Progress;
