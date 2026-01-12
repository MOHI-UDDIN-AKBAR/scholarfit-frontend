import {
  DIFFICULTIES,
  PRIMARY_EQUIPMENTS,
  WORKOUT_CATEGORIES,
} from '../../../../../utils/constants/appConstants';
import { capitalize } from '../../../../../utils/helpers/formatUtils';
import FrequencyOptionsGroup from '../../../../auth/Onboarding/steps/ScheduleStep/WorkoutFrequencySelector/FrequencyOptionsGroup';
import InputField from '../../../../ui/Input/InputField';

const WorkoutDetailsCard: React.FC = () => {
  return (
    <section className="p-6 mb-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-lg font-medium text-gray-900">Workout Details</h2>

      <div className="space-y-4">
        <InputField
          name="name"
          labelClassName="block text-sm font-medium text-gray-700"
          label="Workout Name"
          type="text"
          id="workoutName"
          placeholder="e.g., Upper Body Strength, Leg Day Blast"
          inputClassName="block w-full px-3 py-3! mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          required={true}
        />

        <div>
          <label htmlFor="workoutDescription" className="block text-sm font-medium text-gray-700">
            Description
            <span aria-hidden="true" className="ml-1 text-fitness-red">
              *
            </span>
          </label>

          <textarea
            required
            id="workoutDescription"
            name="description"
            rows={3}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Describe your workout goals, focus areas, or notes..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="workoutCategoryType"
              className="block text-sm font-medium text-gray-700"
            >
              Workout Type
            </label>
            <div className="px-2 border border-gray-300 rounded-md shadow-sm">
              <select
                id="workoutCategoryType"
                name="category"
                className="block w-full px-3 border-none! focus:shadow-none! py-3!  focus:outline-none sm:text-sm"
              >
                {WORKOUT_CATEGORIES.map((category) => (
                  <option value={category.name} key={`${category.id}-workoutCategoryType`}>
                    {capitalize(category.name)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <InputField
            name="duration"
            labelClassName="block text-sm font-medium text-gray-700"
            label="Duration (Weeks)"
            type="number"
            id="workoutDuration"
            placeholder="12"
            inputClassName="block w-full px-3 py-3! mt-.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            required={true}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Difficulty Level</label>

            <div className="flex space-x-4">
              {DIFFICULTIES.map((difficulty) => (
                <label
                  key={difficulty.value}
                  className="flex justify-center flex-1 transition-all duration-200 rounded-md cursor-pointer "
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={difficulty.value}
                    className="sr-only peer"
                  />

                  <div
                    className={`
            w-full px-3 py-3! text-sm font-medium rounded-md
            flex justify-center
            transition-all duration-200
            ${difficulty.textColor} ${difficulty.bgColor}

            peer-checked:scale-105
            peer-checked:shadow-[0_0_0_2px_currentColor]
          `}
                  >
                    <span className="capitalize">{difficulty.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="primaryEquipment"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Primary Equipment
            </label>
            <div className="px-2 border border-gray-300 rounded-md shadow-sm">
              <select
                id="primaryEquipment"
                name="primaryEquipment"
                className="block w-full px-3 border-none! focus:shadow-none! py-3! focus:outline-none sm:text-sm"
              >
                {PRIMARY_EQUIPMENTS.map((equipment) => (
                  <option value={equipment.name} key={equipment.name}>
                    {capitalize(equipment.name)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <FrequencyOptionsGroup
            wrapperClassName="block text-sm font-semibold mb-1 text-gray-700!"
            labelClassName="block text-sm font-medium text-gray-700"
          />
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetailsCard;
