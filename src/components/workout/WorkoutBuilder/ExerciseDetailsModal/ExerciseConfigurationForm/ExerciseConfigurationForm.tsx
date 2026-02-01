import { useAppDispatch } from '../../../../../store/hooks';
import {
  setExerciseSets,
  setExerciseReps,
  setExerciseRestTime,
  setExerciseNotes,
} from '../../../../../store/slices/workout-slices/workoutBuilderSlice';
import InputField from '../../../../ui/Input/InputField';
import {
  validateNotes,
  validateReps,
  validateRest,
  validateSets,
} from '../../../../../utils/helpers/validationUtils';
import { useState } from 'react';

type ConfigurationFieldType = 'sets' | 'reps' | 'rest' | 'notes';

type ErrorState = {
  setsError: string | null;
  repsError: string | null;
  restError: string | null;
  notesError: string | null;
};

const INITIAL_ERROR_STATE: ErrorState = {
  setsError: null,
  repsError: null,
  restError: null,
  notesError: null,
};
const ExerciseConfigurationForm: React.FC = () => {
  const [errorState, setErrorState] = useState<ErrorState>(() => INITIAL_ERROR_STATE);

  const dispatch = useAppDispatch();

  const handleOnChange = (inputValue: string | number, fieldType: ConfigurationFieldType) => {
    switch (fieldType) {
      case 'sets': {
        const { isValid, error } = validateSets(inputValue);
        if (!isValid) {
          setErrorState((prev) => ({ ...prev, setsError: error }));
          break;
        }
        setErrorState((prev) => ({ ...prev, setsError: null }));
        dispatch(setExerciseSets(Number(inputValue)));

        break;
      }
      case 'reps': {
        const { isValid, error } = validateReps(inputValue as string);
        if (!isValid) {
          setErrorState((prev) => ({ ...prev, repsError: error }));

          break;
        }
        setErrorState((prev) => ({ ...prev, repsError: null }));
        dispatch(setExerciseReps((inputValue as string).trim()));

        break;
      }
      case 'rest': {
        const { isValid, error } = validateRest(inputValue);
        if (!isValid) {
          setErrorState((prev) => ({ ...prev, restError: error }));

          break;
        }
        setErrorState((prev) => ({ ...prev, repsError: null }));
        dispatch(setExerciseRestTime(Number(inputValue)));

        break;
      }
      case 'notes': {
        const { isValid, error } = validateNotes(inputValue as string);
        if (!isValid) {
          setErrorState((prev) => ({ ...prev, notesError: error }));

          break;
        }
        setErrorState((prev) => ({ ...prev, repsError: null }));

        dispatch(setExerciseNotes((inputValue as string).trim()));
        break;
      }
    }
  };

  return (
    <div id="exercise-config-form" className="mt-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InputField
          name="exercise-sets"
          type="number"
          label="Sets"
          labelClassName="block text-sm font-medium text-gray-700"
          inputClassName="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          min={'1'}
          max={'10'}
          required={true}
          error={errorState.setsError}
          placeholder="e.g. 4"
          onChange={(e) => handleOnChange(e.target.value, 'sets')}
        />

        <InputField
          name="exercise-reps"
          type="text"
          label="Reps"
          labelClassName="block text-sm font-medium text-gray-700"
          inputClassName="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          required={true}
          placeholder="e.g. 8-12 or 10"
          error={errorState.repsError}
          onChange={(e) => handleOnChange(e.target.value, 'reps')}
        />

        <InputField
          name="exercise-rest"
          type="number"
          label="Rest (sec)"
          min="0"
          max="300"
          labelClassName="block text-sm font-medium text-gray-700"
          inputClassName="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          required={true}
          placeholder="e.g. 120"
          error={errorState.restError}
          onChange={(e) => handleOnChange(e.target.value, 'rest')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
        <textarea
          id="exercise-notes"
          rows={2}
          onChange={(e) => handleOnChange(e.target.value, 'notes')}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder="e.g., Focus on form, increase weight each set..."
        ></textarea>
        {errorState.notesError}
      </div>
    </div>
  );
};

export default ExerciseConfigurationForm;
