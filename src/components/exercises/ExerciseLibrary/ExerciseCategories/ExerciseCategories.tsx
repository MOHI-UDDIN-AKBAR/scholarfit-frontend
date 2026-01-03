import clsx from 'clsx';
import { capitalize } from '../../../../utils/helpers/formatUtils';
import { useAppDispatch, useAppState } from '../../../../store/hooks';
import { shallowEqual } from 'react-redux';
import { setExerciseCategory } from '../../../../store/slices/exercisesSlice';

const ExerciseCategories: React.FC = () => {
  const { exerciseCategories, selectedCategory } = useAppState(
    (state) => ({
      exerciseCategories: state.exercises.exerciseCategories,
      selectedCategory: state.exercises.selectedCategory,
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();

  return (
    <section className="mt-6">
      <h2 className="mb-2 text-lg font-medium text-gray-500 lg:text-xl">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {exerciseCategories.map(({ name }) => (
          <button
            className={clsx(
              'inline-flex items-center px-3 py-1.5 rounded-full text-sm md:text-base font-medium',
              name === selectedCategory ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            )}
            key={name}
            onClick={() => dispatch(setExerciseCategory(name))}
          >
            {capitalize(name)}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ExerciseCategories;
