import { shallowEqual } from 'react-redux';
import { useAppState } from '../../store/hooks';
import type { ProgressTab } from '../../store/slices/progressSlice';
import Header from '../../components/progress/Header/Header';
import KeyMetrics from '../../components/progress/KeyMetrics/KeyMetrics';
import MeasurementsTab from '../../components/progress/MeasurementsTab/MeasurementsTab';
import ProgressCharts from '../../components/progress/ProgressCharts/ProgressCharts';
import WeightEntryModal from '../../components/progress/WeightEntryModal/WeightEntryModal';
import WeightTab from '../../components/progress/WeightTab/WeightTab';
import MeasurementModal from '../../components/progress/MeasurementModal/MeasurementModal';
import { useGetUserProgress } from '../../services/queries/progress';
import type { UserProgress } from '../../types/progress';
import EmptyState from '../../components/shared/EmptyState/EmptyState';
import { Link } from 'react-router';
import Icon from '../../components/ui/Icon/Icon';

export type ProgressData = {
  userProgress?: UserProgress | undefined;
  isLoading: boolean;
};

const ProgressOverview: React.FC<ProgressData> = ({ userProgress, isLoading }) => {
  if (!userProgress) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0 flex justify-center">
        <EmptyState
          title="Progress Data Not Found"
          description="You haven not done any workout yet!"
          wrapperClassName="max-w-md space-y-3"
          action={
            <div className="grid grid-cols-1 gap-4 pt-2">
              <Link
                to="/workouts/create-workout"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
              >
                <Icon name="arrowLeft" className="mr-2" />
                Back To Workout
              </Link>
            </div>
          }
        />
      </section>
    );
  }

  return (
    <div className="tab-content ">
      <KeyMetrics />
      <ProgressCharts userProgress={userProgress} isLoading={isLoading} />
    </div>
  );
};

const TAB_COMPONENTS: Record<ProgressTab['id'], React.FC<ProgressData>> = {
  overview: ProgressOverview,
  weight: WeightTab,
  measurements: MeasurementsTab,
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

  const { data: userProgress, isLoading } = useGetUserProgress();

  const ActiveTab = TAB_COMPONENTS[currentTab.id];

  if (!ActiveTab) return null;

  return (
    <section className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Header />
      <ActiveTab userProgress={userProgress} isLoading={isLoading} />
      {isWeightModalOpen && <WeightEntryModal />}
      {isMeasurementModalOpen && <MeasurementModal />}
    </section>
  );
};

export default Progress;
