import { personalStats } from '../../exercise-mock-data';

const PersonalStats: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Your Stats</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{personalStats.personalRecord.label}</span>
              <span className="font-medium text-gray-900">
                {personalStats.personalRecord.display}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-500">{personalStats.personalRecord.date}</div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{personalStats.lastPerformed.label}</span>
              <span className="font-medium text-gray-900">
                {personalStats.lastPerformed.timeAgo}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {personalStats.lastPerformed.workoutName}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{personalStats.performanceCount.label}</span>
              <span className="font-medium text-gray-900">
                {personalStats.performanceCount.total}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {personalStats.performanceCount.monthlyChange}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{personalStats.progressTrend.label}</span>
              <span className="font-medium text-green-600">
                +{personalStats.progressTrend.percent}%
              </span>
            </div>
            <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-600 rounded-full"
                style={{ width: `${personalStats.progressTrend.barFill}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
            <i className="mr-2 fas fa-chart-line"></i>
            View Progress History
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalStats;
