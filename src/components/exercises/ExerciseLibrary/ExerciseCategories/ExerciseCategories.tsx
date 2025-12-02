import clsx from 'clsx';
import { exerciseCategories } from '../../exercise-mock-data';
import { capitalize } from '../../../../utils/helpers/formatUtils';

const ExerciseCategories: React.FC = () => {
  const selectedCategory = 'ALL';
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-lg font-medium text-gray-500 lg:text-xl">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {exerciseCategories.map((category) => (
          <button
            className={clsx(
              'inline-flex items-center px-3 py-1.5 rounded-full text-sm md:text-base font-medium',
              category === selectedCategory
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            )}
            key={category}
          >
            {capitalize(category)}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ExerciseCategories;
