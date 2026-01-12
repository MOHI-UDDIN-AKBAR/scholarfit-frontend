import { WorkoutLibraryTab, MyWorkoutsTab, CompletedTab } from './index';
import { useAppState } from '../../../../store/hooks';
import type { WorkoutTab } from '../../../../store/slices/workout-slices/workoutsSlice';

const tabComponents: Record<WorkoutTab, React.FC> = {
  'Workout Library': WorkoutLibraryTab,
  'My Workouts': MyWorkoutsTab,
  Completed: CompletedTab,
};

const TabContent: React.FC = () => {
  const currentTab = useAppState((state) => state.workouts.currentTab) as WorkoutTab;

  const Component = tabComponents[currentTab];

  if (!Component) return null;

  return <Component />;
};

export default TabContent;
