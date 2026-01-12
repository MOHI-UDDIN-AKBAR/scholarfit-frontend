import { memo } from 'react';
import { capitalize } from '../../../../utils/helpers/formatUtils';
import Icon from '../../../ui/Icon/Icon';
import type { ExerciseConfiguration } from '../../../../types/workout';

const ExerciseCard: React.FC<{ workoutExercise: ExerciseConfiguration }> = memo(
  ({ workoutExercise: { exercise, sets, reps, rest } }) => (
    <div className="overflow-hidden border border-gray-200 rounded-lg workout-detail-exercise-item">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-md shrink-0">
              <Icon name="dumbbell" className="text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{exercise?.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {exercise?.bodyParts.map((bodyPart) => (
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    key={bodyPart}
                  >
                    {capitalize(bodyPart)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4">
        <ul className="grid grid-cols-5 gap-2 text-sm">
          {Array.from({ length: sets ?? 0 }).map((_, index) => (
            <li className="py-2 text-center rounded bg-gray-50" key={index}>
              <div className="font-medium text-gray-900">Set {index + 1}</div>
              <div className="text-gray-500">{reps} reps</div>
            </li>
          ))}

          <li className="flex flex-col justify-center py-2 text-center bg-gray-100 border-2 border-gray-300 border-dashed rounded">
            <div className="text-xs font-medium text-gray-400">+ Set</div>
          </li>
        </ul>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <div className="flex items-center">
            <Icon name="clock" className="mr-1"></Icon>
            <p>
              <span className="mr-1 font-medium text-gray-500">{rest}s</span>
              rest between sets
            </p>
          </div>
          <div className="flex items-center">
            <Icon name="weightHanging" className="mr-1"></Icon>
            <p>
              Start with
              <span className="ml-1 font-medium text-gray-500">60kg</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
);

const ExerciseList: React.FC<{ workoutExercises: ExerciseConfiguration[] }> = ({
  workoutExercises,
}) => {
  if (workoutExercises.length <= 0) return null;

  return (
    <section className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Workout Exercises</h2>
          <span className="text-sm text-gray-500">
            {workoutExercises.length ?? 0} exercises • Estimated 65 minutes
          </span>
        </div>

        <div className="mt-6 space-y-6">
          {workoutExercises.map((workoutExercise) => (
            <ExerciseCard workoutExercise={workoutExercise} key={workoutExercise.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExerciseList;
