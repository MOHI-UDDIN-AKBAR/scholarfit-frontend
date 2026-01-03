import { shallowEqual } from 'react-redux';
import { useAppState } from '../../../store/hooks';
import type { RootState } from '../../../store/store';
import Pagination from '../../sections/Pagination/Pagination';
import ExerciseGrid from '../ExerciseGrid/ExerciseGrid';
import ExerciseCategories from './ExerciseCategories/ExerciseCategories';
import Header from './Header/Header';
import SearchExercise from './SearchExercise/SearchExercise';
import { useGetExercises } from '../../../services/queries/exercise';
import { getCursor } from '../../../utils/helpers/exerciseUtils';

const selectExerciseFilters = (state: RootState) => ({
  selectedCategory: state.exercises.selectedCategory,
  exerciseName: state.exercises.exerciseName,
  paginationDirection: state.exercises.paginationDirection,
  cursor: state.exercises.queryCursor,
});

const ExerciseLibrary: React.FC = () => {
  const { selectedCategory, cursor, exerciseName, paginationDirection } = useAppState(
    (state) => selectExerciseFilters(state),
    shallowEqual
  );

  const {
    data: response,
    isLoading,
    isError,
    error,
    isPlaceholderData,
  } = useGetExercises(
    paginationDirection,
    exerciseName,
    selectedCategory,
    cursor ? getCursor({ direction: paginationDirection, cursor }) : undefined
  );

  return (
    <section className="max-w-full py-6 mx-auto sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <Header />
        <SearchExercise />
        <ExerciseCategories />
      </div>
      <ExerciseGrid response={response} isLoading={isLoading} isError={isError} error={error} />
      {response?.meta && (
        <Pagination
          paginationMeta={response.meta.pagination}
          isPlaceholderData={isPlaceholderData}
          currentExerciseCount={response.data ? response.data.length : undefined}
        />
      )}
    </section>
  );
};

export default ExerciseLibrary;
