import NotesSection from './NotesSection/NotesSection';
import WorkoutDetailsCard from './WorkoutDetailsCard/WorkoutDetailsCard';
import WorkoutProgramContainer from './WorkoutProgram/WorkoutProgramContainer';

const WorkoutDetailsForm: React.FC = () => {
  return (
    <div className="lg:col-span-2">
      <WorkoutDetailsCard />
      <WorkoutProgramContainer />
      <NotesSection />
    </div>
  );
};

export default WorkoutDetailsForm;
