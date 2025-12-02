import Button from '../../../ui/Button/Button';
import Icon from '../../../ui/Icon/Icon';
import InputField from '../../../ui/Input/InputField';
import { workoutOptions } from '../../exercise-mock-data';

const AddToWorkoutPanel: React.FC = () => {
  return (
    <section className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Add to Workout</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="workout-select" className="block text-sm font-medium text-gray-700">
              Select Workout
              <span aria-hidden="true" className="ml-1 text-fitness-red">
                *
              </span>
            </label>
            <select
              id="workout-select"
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              {workoutOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              type="number"
              required={true}
              name="sets"
              label="Sets"
              inputClassName="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              labelClassName="block text-sm font-medium text-gray-700"
              id="sets"
              value="4"
            />
            <InputField
              type="number"
              required={true}
              name="reps"
              label="Reps"
              inputClassName="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              labelClassName="block text-sm font-medium text-gray-700"
              id="reps"
              value="8"
            />
          </div>

          <InputField
            type="number"
            required={true}
            name="rest"
            id="rest"
            label="Rest (seconds)"
            inputClassName="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            labelClassName="block text-sm font-medium text-gray-700"
            value="120"
          />

          <Button
            type="button"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
          >
            <Icon name="plus" className="mr-2" />
            Add to Workout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddToWorkoutPanel;
