import { Link } from 'react-router';
import InputField from '../../../../ui/Input/InputField';
import Search from '../../../../ui/Search/Search';
import ExerciseFilter from './ExerciseFilter/ExerciseFilter';
import ExerciseLibraryList from './ExerciseLibraryList/ExerciseLibraryList';
import Icon from '../../../../ui/Icon/Icon';
import Button from '../../../../ui/Button/Button';
import { useAppDispatch } from '../../../../../store/hooks';
import {
  setExerciseFilterOptions,
  toggleExerciseBrowserModal,
} from '../../../../../store/slices/workout-slices/workoutBuilderSlice';
import { useState } from 'react';
import type { CategoryType } from '../../../../../types/exercise';

export type ExerciseSearchFilters = {
  exerciseName: string;
  categoryType: CategoryType;
};

const DEFAULT_FILTERS: ExerciseSearchFilters = {
  exerciseName: '',
  categoryType: 'STRENGTH',
};

const ExerciseLibrary: React.FC = () => {
  const [filters, setFilters] = useState<{
    exerciseName: string;
    categoryType: CategoryType;
  }>(() => DEFAULT_FILTERS);

  const dispatch = useAppDispatch();

  const handleApplyFilters = () => {
    if (!filters.exerciseName.trim()) return;
    dispatch(setExerciseFilterOptions(filters));
  };

  const handleCloseLibrary = () => {
    dispatch(toggleExerciseBrowserModal(false));
  };

  const handleExerciseNameChange = (value: string) => {
    setFilters((prev) => ({ ...prev, exerciseName: value }));
  };

  return (
    <section className="sticky p-6 mb-6 bg-white rounded-lg shadow top-6">
      <div className="grid items-center grid-cols-2 mb-4 place-content-between">
        <h2 className="self-center text-lg font-medium text-gray-900">Add Exercises</h2>
        <Button className="justify-self-end" onClick={handleCloseLibrary}>
          <Icon name="close" className="w-7 h-7 md:w-8 md:h-8" />
        </Button>
      </div>

      <div className="mb-4">
        <div className="mb-4">
          <Search containerClassName="relative rounded-md shadow-sm w-full">
            <InputField
              name="exercise-search"
              type="text"
              className="block w-full py-2 pl-12! pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500  text-sm md:text-base"
              placeholder="Search exercises..."
              value={filters.exerciseName}
              onChange={(e) => handleExerciseNameChange(e.target.value)}
            />
          </Search>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ExerciseFilter categoryType={filters.categoryType} setFilters={setFilters} />
          <Button
            className="flex items-center text-sm font-medium text-white border border-transparent rounded-md bg-primary-600 hover:bg-primary-700 focus:outline-none  justify-center"
            onClick={handleApplyFilters}
          >
            Search
          </Button>
        </div>
      </div>

      <ExerciseLibraryList />
      <div className="mt-4 text-center">
        <Link
          to="/exercises"
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          View more exercises in library →
        </Link>
      </div>
    </section>
  );
};

export default ExerciseLibrary;
