import type { Workout } from '../../../../types/workout';
import WorkoutCard from '../WorkoutCard/WorkoutCard';

type WorkoutGridProps = {
  workouts: Workout[];
};
const WorkoutGrid: React.FC<WorkoutGridProps> = ({ workouts }) => {
  return (
    <section className="px-4 mt-8 sm:px-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard workout={workout} key={workout.id} />
        ))}
      </div>
    </section>
  );
};

export default WorkoutGrid;
