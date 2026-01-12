import { useActionState } from 'react';
import { useAppDispatch, useAppState } from '../../store/hooks';
import ExerciseDetailsModal from '../../components/workout/WorkoutBuilder/ExerciseDetailsModal/ExerciseDetailsModal';
import Header from '../../components/workout/WorkoutBuilder/Header/Header';
import WorkoutDetailsForm from '../../components/workout/WorkoutBuilder/WorkoutDetailsForm/WorkoutDetailsForm';
import { saveWorkout } from '../../actions/workout-action';
import { shallowEqual } from 'react-redux';
import ExerciseBrowserModal from '../../components/workout/WorkoutBuilder/ExerciseBrowser/ExerciseBrowserModal';

const CreateWorkout: React.FC = () => {
  const { shouldShowExerciseModal, workoutPrograms, isExerciseBrowserModalOpen } = useAppState(
    (state) => ({
      shouldShowExerciseModal: state.workoutBuilder.shouldShowExerciseModal,
      workoutPrograms: state.workoutBuilder.workoutPrograms,
      isExerciseBrowserModalOpen: state.workoutBuilder.isExerciseBrowserModalOpen,
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();

  const saveWorkoutAction = (prevState: unknown, formData: FormData) =>
    saveWorkout(prevState, formData, workoutPrograms, dispatch);

  const [_, action, isPending] = useActionState(saveWorkoutAction, null);

  return (
    <form action={action}>
      <section className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Header isPending={isPending} />
        <div className="grid gap-6 mt-8">
          <WorkoutDetailsForm />
        </div>
        {isExerciseBrowserModalOpen && <ExerciseBrowserModal />}
      </section>
      {shouldShowExerciseModal && <ExerciseDetailsModal />}
    </form>
  );
};

export default CreateWorkout;
