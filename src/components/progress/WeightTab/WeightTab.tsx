import { useAppDispatch } from '../../../store/hooks';
import { toggleWeightModal } from '../../../store/slices/progressSlice';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';
import { recentEntriesOfWeight } from '../progress-mock-data';

const WeightTab: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="tab-content">
      <div className="px-4 mt-8 sm:px-0">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Weight Tracking</h2>
              <Button onClick={() => dispatch(toggleWeightModal(true))}>
                <Icon name="plus" className="mr-1"></Icon>
                Add Weight Entry
              </Button>
            </div>
            <div className="mt-6 h-80">
              <canvas id="detailedWeightChart"></canvas>
            </div>
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-medium text-gray-900">Recent Entries</h3>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Weight
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Change
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Notes
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentEntriesOfWeight.map((weightEntry) => (
                      <tr key={weightEntry.weight}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                          {weightEntry.date}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {`${weightEntry.weight} kg`}
                        </td>
                        <td
                          className={`px-3 py-4 text-sm whitespace-nowrap ${Number(weightEntry.change) > 0 ? 'text-red-600' : 'text-green-600'}`}
                        >
                          {`${weightEntry.change} kg`}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {weightEntry.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightTab;
