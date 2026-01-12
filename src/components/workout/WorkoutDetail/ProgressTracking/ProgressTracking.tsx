import Icon from '../../../ui/Icon/Icon';

const ProgressTracking: React.FC = () => (
  <section className="overflow-hidden bg-white shadow sm:rounded-lg">
    <div className="px-6 py-6 sm:px-8">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Your Progress</h2>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Times Completed</span>
            <span className="font-medium text-gray-900">3</span>
          </div>
          <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
            <div className="h-2 bg-green-600 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Personal Best</span>
            <span className="font-medium text-gray-900">8,900 kg</span>
          </div>
          <div className="mt-1 text-xs text-gray-500">Set on Nov 15, 2025</div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Last Performance</span>
            <span className="font-medium text-gray-900">8,400 kg</span>
          </div>
          <div className="mt-1 text-xs text-gray-500">3 days ago</div>
        </div>
      </div>

      <div className="mt-6">
        <button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
          <Icon name="chart" className="mr-2"></Icon>
          View Detailed Progress
        </button>
      </div>
    </div>
  </section>
);

export default ProgressTracking;
