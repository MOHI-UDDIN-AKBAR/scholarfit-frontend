import { useAppDispatch } from '../../../store/hooks';
import { toggleMeasurementModal } from '../../../store/slices/progressSlice';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';
import { currentMeasurements } from '../progress-mock-data';

const MeasurementsTab: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div id="measurements" className="tab-content">
      <div className="px-4 mt-8 sm:px-0">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Body Measurements</h2>
              <Button onClick={() => dispatch(toggleMeasurementModal(true))}>
                <Icon name="plus" className="mr-1"></Icon>
                Add Measurements
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
              <div className="h-64">
                <canvas id="measurementsChart"></canvas>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Current Measurements</h3>
                <dl className="grid grid-cols-2 gap-4">
                  {currentMeasurements.map((measurement) => (
                    <div key={measurement.label} className="px-4 py-3 rounded-lg bg-gray-50">
                      <dt className="text-base font-medium text-gray-500">{measurement.label}</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">
                        {measurement.value} cm
                      </dd>
                      <dd className="text-xs text-green-600">{measurement.change} cm from start</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementsTab;
