import { goals } from '../progress-mock-data';

const GoalTracker: React.FC = () => {
  return (
    <div className="px-4 mt-8 sm:px-0">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-6 py-6 sm:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Goal Tracking</h2>
          </div>
          <div className="mt-6 space-y-6">
            {goals.map((goal) => (
              <div key={goal.title}>
                <div className="flex items-center justify-between mb-1 text-sm text-gray-600">
                  <span>{goal.title}</span>
                  <span>{goal.progress}% complete</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 ${goal.progressColor} rounded-full`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">{goal.details}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;
