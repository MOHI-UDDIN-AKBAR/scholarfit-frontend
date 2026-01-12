import { shallowEqual } from 'react-redux';
import { useAppState } from '../../../../../store/hooks';
import Header from './Header/Header';
import WorkoutProgram from './WorkoutProgram/WorkoutProgram';
import WorkoutProgramModal from './WorkoutProgramModal/WorkoutProgramModal';

const WorkoutProgramContainer: React.FC = () => {
  const { isProgramModalOpen, workoutPrograms } = useAppState(
    (state) => ({
      isProgramModalOpen: state.workoutBuilder.isProgramModalOpen,
      workoutPrograms: state.workoutBuilder.workoutPrograms,
    }),
    shallowEqual
  );
  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow">
      <Header />
      <p className="mb-6 text-sm text-gray-500">
        Add different training days to your plan (e.g., Push Day, Pull Day, Leg Day, Chest & Back,
        etc.). Each program/day can have its own exercises and configuration.
      </p>
      <div className="space-y-4">
        {workoutPrograms.length > 0
          ? workoutPrograms.map((workoutProgram) => (
              <WorkoutProgram key={workoutProgram.id} workoutProgram={workoutProgram} />
            ))
          : null}
      </div>
      {isProgramModalOpen && <WorkoutProgramModal />}
    </div>
  );
};

export default WorkoutProgramContainer;
