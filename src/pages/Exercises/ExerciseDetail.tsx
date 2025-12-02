import { Link } from 'react-router';
import Button from '../../components/ui/Button/Button';
import Icon from '../../components/ui/Icon/Icon';
import ExerciseDemonstration from '../../components/exercises/ExerciseDetail/ExerciseDemonstration/ExerciseDemonstration';
import ExerciseOverview from '../../components/exercises/ExerciseDetail/ExerciseOverview/ExerciseOverview';
import PersonalStats from '../../components/exercises/ExerciseDetail/PersonalStats/PersonalStats';
import AddToWorkoutPanel from '../../components/exercises/ExerciseDetail/AddToWorkoutPanel/AddToWorkoutPanel';
import RelatedExercises from '../../components/exercises/ExerciseDetail/RelatedExercises/RelatedExercises';
import ExerciseDetailHeader from '../../components/exercises/ExerciseDetail/ExerciseDetailHeader/ExerciseDetailHeader';

const ExerciseDetail: React.FC = () => {
  return (
    <section className="max-w-full py-6 mx-auto sm:px-6 lg:px-8">
      <div className="px-4 mb-4 sm:px-0">
        <Link to="/exercises">
          <Button
            type="button"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            <Icon name="arrowLeft" className="mr-2" />
            Back to Exercises
          </Button>
        </Link>
      </div>
      <ExerciseDetailHeader />

      <div className="px-4 mt-6 sm:px-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ExerciseDemonstration />
          <div className="space-y-6">
            <ExerciseOverview />
            <PersonalStats />
            <AddToWorkoutPanel />
            <RelatedExercises />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExerciseDetail;
