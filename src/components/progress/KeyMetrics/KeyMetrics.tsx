import clsx from 'clsx';
import { useGetProgressStats } from '../../../services/queries/progress';
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';
import Icon from '../../ui/Icon/Icon';
import { mapKeyMetricsCards } from '../../../utils/workout/key-metrics-utils';

const KeyMetrics: React.FC = () => {
  const { data, isLoading } = useGetProgressStats();

  if (isLoading) {
    return <LoadingSpinner size="sm" />;
  }
  if (!data || !data.weightTrend || !data.latestMeasurements) return null;

  const metricCards = mapKeyMetricsCards(data.weightTrend, data.latestMeasurements);

  return (
    <div className="px-4 mt-8 sm:px-0">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((metricCard) => (
          <div key={metricCard.title} className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className={`shrink-0 p-3 rounded-md ${metricCard.iconBg}`}>
                  <Icon name={metricCard.icon} className={`w-6 h-6 ${metricCard.iconColor}`} />
                </div>
                <div className="flex-1 w-0 ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {metricCard.title}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">{metricCard.value}</dd>
                  </dl>
                </div>
              </div>
              {metricCard.changeText && (
                <div className="mt-2">
                  <div
                    className={`flex items-center text-sm font-medium ${metricCard.changeColor}`}
                  >
                    <Icon
                      name="arrowRight"
                      size={4}
                      className={clsx(
                        'mr-1 rotate-90',
                        metricCard.change && metricCard.change < 0 ? 'rotate-270' : 'rotate-90'
                      )}
                    ></Icon>

                    <span>{metricCard.changeText}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;
