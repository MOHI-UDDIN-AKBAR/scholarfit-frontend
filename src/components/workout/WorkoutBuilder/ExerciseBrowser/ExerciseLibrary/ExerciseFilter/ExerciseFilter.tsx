import type { CategoryType } from '../../../../../../types/exercise';
import { WORKOUT_CATEGORIES } from '../../../../../../utils/constants/appConstants';
import type { ExerciseSearchFilters } from '../ExerciseLibrary';

type ExerciseFilterProps = {
  setFilters: React.Dispatch<React.SetStateAction<ExerciseSearchFilters>>;
  categoryType: CategoryType;
};
const ExerciseFilter: React.FC<ExerciseFilterProps> = ({ setFilters, categoryType }) => {
  return (
    <div>
      <div className="grid">
        <div className="px-2 border border-gray-300 rounded-md shadow-sm">
          <select
            className="block w-full px-3 py-2 focus:shadow-none! border-none! focus:outline-none sm:text-sm cursor-pointer"
            name="exercise-category"
            value={categoryType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, categoryType: e.target.value as CategoryType }))
            }
          >
            {WORKOUT_CATEGORIES.map((category) => (
              <option
                value={category.name}
                key={`${category.name}-workout-category`}
                className="capitalize"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExerciseFilter;
