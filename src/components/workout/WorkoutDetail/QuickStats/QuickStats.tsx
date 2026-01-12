const QuickStats: React.FC = () => {
  return (
    <section className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Workout Stats</h2>
        <dl className="space-y-4">
          <div className="px-4 py-4 bg-gray-50 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Estimated Duration</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">65 min</dd>
          </div>
          <div className="px-4 py-4 bg-gray-50 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Total Volume</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">~8,400 kg</dd>
          </div>
          <div className="px-4 py-4 bg-gray-50 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Estimated Calories</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">420 kcal</dd>
          </div>
          <div className="px-4 py-4 bg-gray-50 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Muscle Groups</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                Chest
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                Shoulders
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                Triceps
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default QuickStats;
