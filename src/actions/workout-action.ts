import {
  initialErrorState,
  type ErrorState,
} from '../components/workout/WorkoutSession/CurrentExerciseCard/SetLoggingInterface/SetLoggingInterface';
import {
  addWorkoutPayload,
  type WorkoutProgramWithExercises,
} from '../store/slices/workout-slices/workoutBuilderSlice';
import { saveSetData } from '../store/slices/workout-slices/workoutSessionSlice';
import type { AppDispatch } from '../store/store';
import type { CategoryType } from '../types/exercise';
import type { WorkoutDifficulty, WorkoutInput } from '../types/workout';
import { getString } from '../utils/helpers/common-utils';
import { isObjectComplete, validateNumberInRange } from '../utils/helpers/validationUtils';

const getNumber = (data: FormData, key: string): number | null => {
  const raw = data.get(key);
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) ? parsed : null;
};

export const saveWorkout = async (
  _: unknown,
  formData: FormData,
  programs: WorkoutProgramWithExercises[],
  dispatch: AppDispatch
) => {
  const name = getString(formData, 'name');
  const description = getString(formData, 'description');
  const category = getString(formData, 'category') as CategoryType;
  const difficulty = getString(formData, 'difficulty') as WorkoutDifficulty;
  const primaryEquipment = getString(formData, 'primaryEquipment');
  const notes = getString(formData, 'notes');
  const duration = getNumber(formData, 'duration');
  const frequency = getNumber(formData, 'frequency');

  const formValues = {
    name,
    description,
    category,
    duration,
    difficulty,
    primaryEquipment,
    notes,
    frequency,
  };

  if (!isObjectComplete(formValues, { ignoreFields: ['notes'] })) {
    return;
  }

  const workoutPayload = {
    ...formValues,
    programs,
  } as WorkoutInput;

  dispatch(addWorkoutPayload(workoutPayload));
};

export const saveSessionDetails = async (
  _: unknown,
  formData: FormData,
  setErrorState: React.Dispatch<React.SetStateAction<ErrorState>>,
  dispatch: AppDispatch,
  additionalData: {
    maxReps: number;
    exerciseId: string;
    programId: string;
    currentSet: number;
    restTime: number;
  }
): Promise<{ isReadyToGo: boolean }> => {
  const weightLifted = getNumber(formData, 'weightLifted');
  const repsCompleted = getNumber(formData, 'repsCompleted');
  const RPE = getString(formData, 'RPE');
  const setNotes = getString(formData, 'setNotes');

  let errors: ErrorState = { ...initialErrorState };
  let hasError = false;

  if (!weightLifted || weightLifted <= 0) {
    errors.errorForWeight = 'Weight must be a positive number.';
    hasError = true;
  }

  const repsValidation = validateNumberInRange(repsCompleted, 1, additionalData.maxReps, 'reps');
  if (!repsValidation.isValid) {
    errors.errorForReps = repsValidation.error;
    hasError = true;
  }

  if (!RPE) {
    errors.errorForRPE = 'Please select an RPE value.';
    hasError = true;
  }

  if (setNotes.length > 350) {
    errors.errorForNotes = 'Notes must be less than 350 characters.';
    hasError = true;
  }

  setErrorState(errors);

  if (hasError) {
    return { isReadyToGo: false };
  }

  const newExerciseHistoryPayload = {
    exerciseHistory: {
      id: crypto.randomUUID() as string,
      set: additionalData.currentSet,
      reps: repsCompleted!.toString(),
      restTime: additionalData.restTime,
      weight: weightLifted!,
      RPE,
      setNotes,
    },
    exerciseId: additionalData.exerciseId,
    programId: additionalData.programId,
  };

  dispatch(saveSetData(newExerciseHistoryPayload));

  return { isReadyToGo: true };
};
