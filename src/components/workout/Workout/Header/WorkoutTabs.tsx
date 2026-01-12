import clsx from 'clsx';
import Button from '../../../ui/Button/Button';
import { useAppDispatch, useAppState } from '../../../../store/hooks';
import { selectTab } from '../../../../store/slices/workout-slices/workoutsSlice';

const WorkoutTabs: React.FC = () => {
  const { currentTab, workoutTabs } = useAppState((state) => state.workouts);
  const dispatch = useAppDispatch();

  return (
    <div className="mt-6 border-b border-gray-200">
      <nav className="flex -mb-px space-x-2 overflow-hidden lg:space-x-8">
        {workoutTabs.map((tab) => (
          <Button
            key={tab}
            type="button"
            data-tab="library"
            onClick={() => dispatch(selectTab(tab))}
            className={clsx(
              'px-1 py-4 text-sm lg:text-base font-medium tab-link whitespace-nowrap',
              currentTab === tab ? 'text-blue-600 border-b-2 border-primary-500' : 'text-gray-600'
            )}
          >
            {tab}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default WorkoutTabs;
