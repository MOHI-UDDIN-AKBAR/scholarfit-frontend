import { useState } from 'react';
import { useAppDispatch, useAppState } from '../../../../../../store/hooks';
import {
  setWorkoutProgramName,
  setWorkoutProgramDescription,
  setWorkoutProgramDayNumber,
  setWorkoutProgramDuration,
  setWorkoutProgramMuscleGroup,
  setWorkoutProgramRestDays,
  toggleWorkoutProgramModal,
  addWorkoutProgram,
} from '../../../../../../store/slices/workout-slices/workoutBuilderSlice';
import Button from '../../../../../ui/Button/Button';
import Icon from '../../../../../ui/Icon/Icon';
import InputField from '../../../../../ui/Input/InputField';
import { validateNumberInRange } from '../../../../../../utils/helpers/validationUtils';
import type { MuscleGroup } from '../../../../../../types/workout';
import { doesProgramExistForDay } from '../../../../../../utils/workout/program-utils';

const MIN_PROGRAM_DAY_NUMBER = 1;
const MAX_PROGRAM_DAY_NUMBER = 7;
const MIN_PROGRAM_REST_DAYS = 1;
const MAX_PROGRAM_REST_DAYS = 3;
const MIN_PROGRAM_DURATION = 10;
const MAX_PROGRAM_DURATION = 180;

type ErrorState = {
  errorForProgramName?: string | null;
  errorForProgramDescription?: string | null;
  errorForMuscleGroup?: string | null;
  errorForProgramDayNumber?: string | null;
  errorForProgramRestDay?: string | null;
  errorForProgramDuration?: string | null;
};

const ProgramHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900" id="program-modal-title">
          Add Program/Day
        </h3>
        <Button
          className="text-primary-400 hover:text-primary-500"
          type="button"
          onClick={() => dispatch(toggleWorkoutProgramModal(false))}
        >
          <Icon name="close" className="w-8 h-8 md:w-8 md:h-8"></Icon>
        </Button>
      </div>
    </div>
  );
};

const ProgramController: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
        >
          Cancel
        </Button>
        <Button type="button" onClick={() => dispatch(addWorkoutProgram())}>
          Save Program
        </Button>
      </div>
    </div>
  );
};

const WorkoutProgramModal: React.FC = () => {
  const [errorState, setErrorState] = useState<ErrorState | null>(null);
  const dispatch = useAppDispatch();
  const workoutPrograms = useAppState((state) => state.workoutBuilder.workoutPrograms);

  const getSelectedValues = (select: HTMLSelectElement): string[] => {
    return Array.from(select.selectedOptions).map((opt) => opt.value);
  };

  const handleProgramModal = (
    value: unknown,
    type: 'name' | 'description' | 'muscleGroup' | 'dayNumber' | 'restDay' | 'duration'
  ) => {
    switch (type) {
      case 'name': {
        const rawValue = (value as string).trim();
        if (!rawValue) {
          setErrorState((prev) => ({
            ...prev,
            errorForProgramName: `${type} can not be empty`,
          }));
          break;
        }
        setErrorState((prev) => ({
          ...prev,
          errorForProgramName: null,
        }));
        dispatch(setWorkoutProgramName(rawValue));
        break;
      }
      case 'description': {
        const rawValue = (value as string).trim();
        if (!rawValue) {
          setErrorState((prev) => ({
            ...prev,
            errorForProgramDescription: `${type} can not be empty`,
          }));
          break;
        }
        setErrorState((prev) => ({
          ...prev,
          errorForProgramDescription: null,
        }));
        dispatch(setWorkoutProgramDescription(rawValue));
        break;
      }
      case 'muscleGroup': {
        const selectedGroups = value as MuscleGroup[];
        dispatch(setWorkoutProgramMuscleGroup(selectedGroups));
        break;
      }

      case 'dayNumber': {
        const { isValid, error } = validateNumberInRange(
          value as number,
          MIN_PROGRAM_DAY_NUMBER,
          MAX_PROGRAM_DAY_NUMBER,
          type
        );
        if (!isValid) {
          setErrorState((prev) => ({
            ...prev,
            errorForProgramDayNumber: error,
          }));
          break;
        }

        if (doesProgramExistForDay(workoutPrograms, Number(value))) {
          setErrorState((prev) => ({
            ...prev,
            errorForProgramDayNumber: `A program already exists for day ${value}`,
          }));
          break;
        }
        setErrorState((prev) => ({
          ...prev,
          errorForProgramDayNumber: null,
        }));

        dispatch(setWorkoutProgramDayNumber(Number(value)));
        break;
      }
      case 'restDay': {
        const { isValid, error } = validateNumberInRange(
          value as number,
          MIN_PROGRAM_REST_DAYS,
          MAX_PROGRAM_REST_DAYS,
          type
        );

        if (!isValid) {
          setErrorState((prev) => ({
            ...prev,
            errorForProgramRestDay: error,
          }));
          break;
        }
        setErrorState((prev) => ({
          ...prev,
          errorForProgramRestDay: null,
        }));
        dispatch(setWorkoutProgramRestDays(Number(value)));
        break;
      }
      case 'duration': {
        const { isValid, error } = validateNumberInRange(
          value as number,
          MIN_PROGRAM_DURATION,
          MAX_PROGRAM_DURATION,
          type
        );
        if (!isValid) {
          setErrorState((prev) => ({
            ...prev,
            errorForProgramDuration: error,
          }));
          break;
        }
        setErrorState((prev) => ({
          ...prev,
          errorForProgramDuration: null,
        }));
        dispatch(setWorkoutProgramDuration(Number(value)));
        break;
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 pt-22 max-xl:pt-16">
      <div className="w-full max-w-3xl mx-4 bg-white rounded-lg shadow-xl">
        <ProgramHeader />

        <div className="px-6 py-4">
          <div className="space-y-4">
            <InputField
              name="name"
              label="Program/Day Name"
              labelClassName="block text-sm font-medium text-gray-700"
              required={true}
              type="text"
              id="program-name"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="e.g., Push Day A, Leg Day A, Chest & Back A"
              onChange={(e) => handleProgramModal(e.target.value, 'name')}
              error={errorState?.errorForProgramName}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
                <span aria-hidden="true" className="ml-1 text-fitness-red">
                  *
                </span>
              </label>
              <textarea
                name="description"
                id="program-description"
                rows={2}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Brief description of this training day..."
                onChange={(e) => handleProgramModal(e.target.value, 'description')}
              ></textarea>
              <span className="mt-2 text-sm text-fitness-red">
                {errorState?.errorForProgramDescription}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Muscle Groups
                <span aria-hidden="true" className="ml-1 text-fitness-red">
                  *
                </span>
              </label>
              <select
                id="program-muscles"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                multiple
                onChange={(e) => handleProgramModal(getSelectedValues(e.target), 'muscleGroup')}
              >
                <option value="chest">Chest</option>
                <option value="back">Back</option>
                <option value="legs">Legs</option>
                <option value="shoulders">Shoulders</option>
                <option value="triceps">Triceps</option>
                <option value="biceps">Biceps</option>
                <option value="core">Core</option>
                <option value="full_body">Full Body</option>
              </select>
              <small className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</small>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="dayNumber"
                type="number"
                label="Day Number"
                id="program-day-number"
                required={true}
                labelClassName="block text-sm font-medium text-gray-700"
                inputClassName="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                onChange={(e) => handleProgramModal(e.target.value, 'dayNumber')}
                error={errorState?.errorForProgramDayNumber}
              />
              <InputField
                name="restDay"
                type="number"
                id="program-rest-days"
                labelClassName="block text-sm font-medium text-gray-700"
                label="Rest After (days)"
                required={true}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                onChange={(e) => handleProgramModal(e.target.value, 'restDay')}
                error={errorState?.errorForProgramRestDay}
              />
            </div>

            <InputField
              name="duration"
              type="number"
              id="program-duration"
              label="Estimated Duration (minutes)"
              required={true}
              labelClassName="block text-sm font-medium text-gray-700"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              onChange={(e) => handleProgramModal(e.target.value, 'duration')}
              error={errorState?.errorForProgramDuration}
            />
          </div>
        </div>

        <ProgramController />
      </div>
    </div>
  );
};

export default WorkoutProgramModal;
