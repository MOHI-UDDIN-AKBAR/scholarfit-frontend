import type { WorkoutProgram } from '../../../../types/workout';
import { convertArrayToString } from '../../../../utils/helpers/formatUtils';
import Icon from '../../../ui/Icon/Icon';

const ProgramOverview: React.FC<{ workoutPrograms: WorkoutProgram[] }> = ({ workoutPrograms }) => (
  <section className="overflow-hidden bg-white shadow sm:rounded-lg">
    <div className="px-6 py-6 sm:px-8">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Program Overview</h2>
      <div className="space-y-4">
        {workoutPrograms.map((program) => (
          <div
            key={program.id}
            className="flex items-center justify-between p-4 rounded-lg bg-blue-50"
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-md shrink-0">
                <Icon name="dumbbell" className="text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{program.name}</div>
                <div className="text-sm text-gray-500">
                  {convertArrayToString(program.muscleGroup)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProgramOverview;
