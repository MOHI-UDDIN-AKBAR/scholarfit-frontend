import Icon from '../../../ui/Icon/Icon';
import WorkoutTabs from './WorkoutTabs';
import { Link } from 'react-router';

const Header: React.FC = () => {
  return (
    <header className="px-4 sm:px-0">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="py-1 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Workouts
          </h1>
          <p className="mt-1 text-base text-gray-500">
            Browse programs, create custom workouts, and track your training.
          </p>
        </div>
        <div className="flex mt-4 md:mt-0 md:ml-4">
          <Link
            to="/workouts/create-workout"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
          >
            <Icon name="plus" className="mr-2" />
            Create Workout
          </Link>
        </div>
      </div>

      <WorkoutTabs />
    </header>
  );
};

export default Header;
