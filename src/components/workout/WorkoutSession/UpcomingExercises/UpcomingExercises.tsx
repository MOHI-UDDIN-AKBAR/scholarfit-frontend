import { useAppState } from '../../../../store/hooks';
import type { ExerciseConfiguration } from '../../../../types/workout';
import Icon from '../../../ui/Icon/Icon';

const UpcomingExercises: React.FC<{ upcomingExercises: ExerciseConfiguration[] }> = ({
  upcomingExercises,
}) => {
  const currentExerciseIndex = useAppState(
    (state) => state.workoutSession.currentProgramExercise?.exerciseNumber
  );

  if (upcomingExercises.length === 0 || !currentExerciseIndex) return null;

  const upcomingExercisesList = upcomingExercises.slice(currentExerciseIndex);

  if (upcomingExercisesList.length === 0) return null;

  const nextExercise = upcomingExercisesList[0];
  const remainingExercises = upcomingExercisesList.slice(1);

  return (
    <section className="p-6 bg-white shadow-xl rounded-xl">
      <h3 className="mb-4 text-lg font-bold text-gray-600">Upcoming Exercises</h3>
      <div className="space-y-3">
        <div className="p-4 border-l-4 rounded-lg upcoming-exercise bg-primary-50 border-primary-500">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium text-gray-900">{nextExercise.exercise?.name}</div>
              <div className="text-sm text-gray-800">
                {nextExercise.sets} sets x {nextExercise.reps} reps
              </div>
            </div>
            <span className="px-2 py-1 text-xs text-gray-100 rounded bg-primary-700">NEXT</span>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-800">
            <Icon name="clock" className="mr-1" />
            <span>{nextExercise.rest}s rest between sets</span>
          </div>
        </div>

        {remainingExercises.slice(1).length > 0 && (
          <div className="p-4 rounded-lg upcoming-exercise bg-primary-50 opacity-70">
            {remainingExercises.slice(currentExerciseIndex).map((upcomingExercise) => (
              <div className="flex items-start justify-between" key={upcomingExercise.id}>
                <div>
                  <div className="font-medium text-gray-900">{upcomingExercise.exercise?.name}</div>
                  <div className="text-sm text-gray-800">
                    {upcomingExercise.sets} sets x {upcomingExercise.reps} reps
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingExercises;
