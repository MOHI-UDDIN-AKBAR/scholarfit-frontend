import Icon from '../../ui/Icon/Icon';
import { statCards } from '../progress-mock-data';

const KeyMetrics: React.FC = () => {
  return (
    <div className="px-4 mt-8 sm:px-0">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((statCard) => (
          <div key={statCard.title} className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className={`shrink-0 p-3 rounded-md ${statCard.iconBg}`}>
                  <Icon name={statCard.icon} className={`w-6 h-6 ${statCard.iconColor}`} />
                </div>
                <div className="flex-1 w-0 ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{statCard.title}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{statCard.value}</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-2">
                <div className={`flex items-center text-sm font-medium ${statCard.changeColor}`}>
                  {(statCard.type === 'body-fat' || statCard.type === 'current-weight') && (
                    <Icon name="arrowRight" size={4} className="mr-1 rotate-90"></Icon>
                  )}
                  <span>{statCard.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;
