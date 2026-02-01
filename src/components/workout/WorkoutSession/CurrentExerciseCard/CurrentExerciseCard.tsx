import { shallowEqual } from 'react-redux';
import { useAppState } from '../../../../store/hooks';
import SetLoggingInterface from './SetLoggingInterface/SetLoggingInterface';
import type { WorkoutProgram } from '../../../../types/workout';
import ExerciseInstructionsPanel from '../ExerciseInstructionsPanel/ExerciseInstructionsPanel';

const CurrentExerciseCard: React.FC<{
  todayProgram: WorkoutProgram;
}> = ({ todayProgram }) => {
  const { workoutExercise, exerciseNumber } = useAppState(
    (state) => ({
      workoutExercise: state.workoutSession.currentProgramExercise?.workoutExercise,
      exerciseNumber: state.workoutSession.currentProgramExercise?.exerciseNumber,
    }),
    shallowEqual
  );

  if (!workoutExercise || !exerciseNumber) return null;

  return (
    <section className="p-6 mb-6 border border-gray-200 shadow-sm rounded-2xl animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center mb-2">
            <span className="flex items-center justify-center w-8 h-8 mr-3 text-sm font-bold text-white bg-blue-500 rounded-full">
              {exerciseNumber}
            </span>
            <h2 className="text-2xl font-bold text-gray-900" id="exercise-name">
              {workoutExercise?.exercise?.name}
            </h2>
          </div>
          <div className="text-gray-600" id="exercise-target">
            {workoutExercise.sets} sets x {workoutExercise.reps} reps • {workoutExercise.rest}s rest
          </div>
        </div>
      </div>

      <SetLoggingInterface
        workoutExercise={workoutExercise}
        exerciseNumber={exerciseNumber}
        programId={todayProgram.id}
        programName={todayProgram.name}
      />
      <ExerciseInstructionsPanel exerciseId={workoutExercise.exercise.exerciseId} />
    </section>
  );
};

export default CurrentExerciseCard;
