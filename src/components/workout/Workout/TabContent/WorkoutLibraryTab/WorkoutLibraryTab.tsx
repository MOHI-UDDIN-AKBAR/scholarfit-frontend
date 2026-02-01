import InputField from '../../../../ui/Input/InputField';
import Search from '../../../../ui/Search/Search';
import WorkoutGrid from '../../WorkoutGrid/WorkoutGrid';
import { Link } from 'react-router';
import Icon from '../../../../ui/Icon/Icon';
import { LoadingSpinner } from '../../../../shared/LoadingSpinner/LoadingSpinner';
import { useGetWorkoutList } from '../../../../../services/queries/workout';
import EmptyState from '../../../../shared/EmptyState/EmptyState';

export const FILTER_OPTIONS = [
  { label: 'All Goals', value: 'All Goals' },
  { label: 'Muscle Building', value: 'Muscle Building' },
  { label: 'Strength', value: 'Strength' },
  { label: 'Fat Loss', value: 'Fat Loss' },
  { label: 'General Fitness', value: 'General Fitness' },
];

const WorkoutLibraryTab: React.FC = () => {
  const { data: workouts, isLoading, isError, error } = useGetWorkoutList();

  if (isLoading) {
    return (
      <section className="px-4 mt-8 sm:px-0 h-60">
        <div className="grid h-full">
          <LoadingSpinner size="xl" variant="primary" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center">
          {error?.message || 'Failed to load workouts'}
        </div>
      </section>
    );
  }

  if (!workouts || workouts.length === 0) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <EmptyState
          title="No workouts yet"
          description="You haven’t created any workouts yet. Start by creating your first workout."
          wrapperClassName="max-w-md space-y-3"
          action={
            <div className="pt-2">
              <Link
                to="/workouts/create-workout"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
              >
                <Icon name="plus" className="mr-2" />
                Create Workout
              </Link>
            </div>
          }
        />
      </section>
    );
  }
  return (
    <section className="tab-content active">
      <div className="flex flex-col mt-6 md:flex-row md:items-center md:justify-between">
        <Search containerClassName="w-full sm:max-w-xs">
          <InputField
            name="workout"
            type="text"
            className="block w-full py-2 pl-12! pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500  text-sm md:text-base"
            placeholder="Search workouts..."
          />
        </Search>
        <div className="flex items-center mt-4! space-x-4 md:mt-0! max-md:ml-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Filter by :
            </span>
            <div className="px-2 border-2 border-gray-300 rounded-md ">
              <select className="block w-full py-2 pl-3 pr-10 text-base border-transparent! focus:outline-none focus:border-transparent! focus:shadow-none! sm:text-sm">
                {FILTER_OPTIONS.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <WorkoutGrid workouts={workouts} />
    </section>
  );
};

export default WorkoutLibraryTab;
