import clsx from 'clsx';
import Icon from '../../../../ui/Icon/Icon';
import { useActionState, useState } from 'react';
import { saveSessionDetails } from '../../../../../actions/workout-action';
import { useAppDispatch, useAppState } from '../../../../../store/hooks';
import { LoadingSpinner } from '../../../../shared/LoadingSpinner/LoadingSpinner';
import Button from '../../../../ui/Button/Button';
import { shallowEqual } from 'react-redux';
import { moveOnNextExercise } from '../../../../../store/slices/workout-slices/workoutSessionSlice';
import type { ExerciseConfiguration } from '../../../../../types/workout';

type SetLoggingInterfaceProps = {
  workoutExercise: ExerciseConfiguration;
  exerciseNumber: number;
  programId: string;
  programName: string;
};

export type ErrorState = {
  errorForWeight: string | null;
  errorForReps: string | null;
  errorForNotes: string | null;
  errorForRPE: string | null;
};

export const initialErrorState: ErrorState = {
  errorForWeight: null,
  errorForReps: null,
  errorForNotes: null,
  errorForRPE: null,
};

const SetLoggingInterface: React.FC<SetLoggingInterfaceProps> = ({
  workoutExercise,
  exerciseNumber,
  programId,
  programName,
}) => {
  const [errorState, setErrorState] = useState<ErrorState>(() => initialErrorState);

  const { currentSet, isReadyForNextExercise, userId } = useAppState(
    (state) => ({
      currentSet: state.workoutSession.currentProgramExercise?.currentSet ?? 1,
      isReadyForNextExercise: state.workoutSession.isReadyForNextExercise,
      userId: state.auth.userInfo!.id,
    }),
    shallowEqual
  );

  const dispatch = useAppDispatch();

  const sessionAction = (prevState: unknown, formData: FormData) =>
    saveSessionDetails(prevState, formData, setErrorState, dispatch, {
      maxReps: Number(workoutExercise.reps),
      exerciseId: workoutExercise.id,
      programId,
      programName,
      currentSet: currentSet,
      restTime: workoutExercise.rest,
    });

  const [_, action, isPending] = useActionState(sessionAction, null);

  return (
    <>
      <form action={action}>
        <div className="space-y-4">
          <div className="p-4 transition-all duration-300 border-2 set-card rounded-xl border-primary-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 mr-3 font-bold text-white bg-blue-500 rounded-full">
                  {exerciseNumber}
                </div>
                <div>
                  <div className="text-sm text-primary-600">IN PROGRESS</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 ">
              <div className="set-input">
                <label className="block mb-1 text-sm text-gray-600">
                  Weight (kg)
                  <span aria-hidden="true" className="ml-1 text-fitness-red">
                    *
                  </span>
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <input
                    type="number"
                    name="weightLifted"
                    className="flex-1 py-2 text-xl font-bold text-center bg-transparent border-none! shadow-none!"
                  />
                </div>
                {errorState.errorForWeight && (
                  <p className="mt-2 text-sm text-fitness-red">{errorState.errorForWeight}</p>
                )}
              </div>

              <div className="set-input">
                <label className="block mb-1 text-sm text-gray-600">
                  Reps
                  <span aria-hidden="true" className="ml-1 text-fitness-red">
                    *
                  </span>
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <input
                    type="number"
                    name="repsCompleted"
                    className="flex-1 py-2 text-xl font-bold text-center bg-transparent border-none! shadow-none!"
                    min="0"
                    max="50"
                  />
                </div>
                {errorState.errorForReps && (
                  <p className="mt-2 text-sm text-fitness-red">{errorState.errorForReps}</p>
                )}
              </div>
              <div className="set-input">
                <label className="block mb-1 text-sm text-gray-700">
                  RPE
                  <span aria-hidden="true" className="ml-1 text-fitness-red">
                    *
                  </span>
                </label>
                <select
                  name="RPE"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-700 rounded-lg"
                >
                  <option value="7">7 - Hard</option>
                  <option value="8">8 - Very Hard</option>
                  <option value="9">9 - Extremely Hard</option>
                </select>
              </div>
              {errorState.errorForRPE && (
                <p className="mt-2 text-sm text-fitness-red">{errorState.errorForRPE}</p>
              )}
            </div>
            <div className="mt-4">
              <textarea
                name="setNotes"
                className="w-full px-3 py-2 text-base bg-gray-700 border border-gray-600 rounded-lg notes-input"
                rows={2}
                placeholder="Add notes for this set..."
              ></textarea>
              {errorState.errorForNotes && (
                <p className="mt-2 text-sm text-fitness-red">{errorState.errorForNotes}</p>
              )}
            </div>
          </div>
        </div>
        <section className="pt-6 mt-8 border-t border-gray-700">
          <div className="flex items-center justify-end space-x-3">
            {currentSet ? (
              <span className="flex items-center text-sm text-gray-500">
                Set
                <span className="mx-1">{currentSet}</span>/
                <span className="mx-1">{workoutExercise.sets}</span>
                running
              </span>
            ) : null}
            <div className="flex items-center">
              {isReadyForNextExercise ? (
                <button
                  type="button"
                  formAction={undefined}
                  onClick={() => dispatch(moveOnNextExercise({ userId }))}
                  className="flex items-center px-4 py-2 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  <Icon name="arrowRight" size={5} className="mr-2"></Icon>
                  <span> Complete & Move On</span>
                </button>
              ) : (
                <Button
                  type="submit"
                  className={clsx(
                    'flex items-center px-4 py-2 font-medium transition-all rounded-lg    hover:cursor-pointer bg-primary-500 text-gray-50 hover:bg-primary-600',
                    isPending && 'hover:cursor-not-allowed!'
                  )}
                  disabled={isPending}
                >
                  {isPending ? (
                    <LoadingSpinner
                      text="loading ..."
                      showText={true}
                      variant="white"
                      size="sm"
                      textClassName="text-white!"
                    />
                  ) : (
                    <>
                      <span>Next Set</span>
                      <Icon name="arrowRight" size={5} className="ml-2"></Icon>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default SetLoggingInterface;
