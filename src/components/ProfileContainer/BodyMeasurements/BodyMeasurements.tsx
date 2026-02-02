import type { MeasurementStats } from '../../../types/user-profile';
import { mapBodyMeasurementStats } from '../../../utils/workout/profile-utils';
import type { IconName } from '../../ui/Icon';
import Icon from '../../ui/Icon/Icon';

type BodyMeasurementsProps = { measurementStats: MeasurementStats | undefined };

const BodyMeasurements: React.FC<BodyMeasurementsProps> = ({ measurementStats }) => {
  if (!measurementStats) return null;

  const measurementCards = mapBodyMeasurementStats(measurementStats);

  return (
    <div className="p-6 shadow-lg glass-card rounded-2xl">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Body Measurements</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {measurementCards.map((measurement) => (
          <div
            className={`text-center p-4 bg-linear-to-br ${measurement.bgGradient} rounded-xl border ${measurement.borderColor}`}
          >
            <div className={`text-base ${measurement.textColor} font-medium mb-2`}>
              {measurement.label}
            </div>
            <div className="mb-2 text-2xl font-bold text-gray-900">
              {measurement.value}
              <span className="text-lg text-gray-600">{measurement.unit}</span>
            </div>
            {measurement.icon !== '' && (
              <div
                className={`text-sm ${measurement.changeColor} flex justify-center items-center`}
              >
                <Icon
                  name={measurement.icon as IconName}
                  size={4}
                  className={`${measurement.changeDirection === 'increase' ? 'rotate-270' : 'rotate-90'} mr-1`}
                ></Icon>
                <span>{measurement.change}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyMeasurements;
