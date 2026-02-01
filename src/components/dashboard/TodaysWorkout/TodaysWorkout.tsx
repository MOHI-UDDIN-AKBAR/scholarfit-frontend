import type { ScheduledProgram } from '../../../types/dashboard';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';

const TodaysWorkout: React.FC<{ scheduledProgram: ScheduledProgram | null }> = ({
  scheduledProgram,
}) => {
  if (!scheduledProgram) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center">No program found</div>
      </section>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize">
          {scheduledProgram.schedulePeriod} Program
        </h3>
        <p className="mt-1 text-sm text-gray-500">{scheduledProgram.name}</p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium text-gray-900 capitalize xl:text-xl">
              {scheduledProgram.name}
            </h4>
            <p className="text-sm text-gray-500 xl:text-base">{scheduledProgram.description}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Icon name="clock" className="mr-1"></Icon>
              <span>Estimated: {scheduledProgram.duration} minutes</span>
              <Icon name="dumbbell" className="ml-4 mr-1 -mt-1"></Icon>
              <span>{scheduledProgram.exercises.length} exercises</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              <Icon name="play" className="mr-2"></Icon>
              Start Workout
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <h5 className="mb-2 text-base font-medium text-gray-700">Exercises Preview</h5>
          <div className="space-y-2">
            {scheduledProgram.exercises.map((exercise) => (
              <div
                key={exercise.exercise.exerciseId}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 bg-blue-100 rounded-md shrink-0`}
                  >
                    <Icon name="dumbbell" className="text-sm text-blue-600"></Icon>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {exercise.exercise.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {exercise.sets} sets x {exercise.reps} reps
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysWorkout;
