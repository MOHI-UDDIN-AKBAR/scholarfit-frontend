const ExerciseOverview: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Exercise Details</h2>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Equipment</dt>
            <dd className="mt-1 text-sm text-gray-900">Barbell, Flat Bench</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
            <dd className="mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Beginner
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Mechanics</dt>
            <dd className="mt-1 text-sm text-gray-900">Compound</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Force Type</dt>
            <dd className="mt-1 text-sm text-gray-900">Push</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Popularity</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="flex items-center">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="ml-2 text-xs text-gray-500">95%</span>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ExerciseOverview;
