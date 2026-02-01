import clsx from 'clsx';
import Icon from '../../../ui/Icon/Icon';
import Button from '../../../ui/Button/Button';
import type { IconName } from '../../../ui/Icon';

export type QuickAction = {
  label: string;
  icon: IconName;
  iconColor: string;
  iconBg: string;
  hoverBg: string;
  id?: string;
};

export const QUICK_ACTION_DATA: QuickAction[] = [
  {
    id: 'start-rest-btn',
    label: 'Start Rest',
    icon: 'clock',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/20',
    hoverBg: 'hover:bg-blue-500/10',
  },

  {
    label: 'Hydration',
    icon: 'tint',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/20',
    hoverBg: 'hover:bg-blue-500/10',
  },
];
const QuickActions: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl">
      <h3 className="mb-4 text-lg font-bold text-gray-600">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {QUICK_ACTION_DATA.map((action) => (
          <Button
            key={action.label}
            id="start-rest-btn"
            className="flex flex-col items-center justify-center p-4 transition-all bg-primary-100 quick-action hover:bg-blue-500/10 rounded-xl active:scale-95 group"
          >
            <div
              className={clsx(
                'flex items-center justify-center w-12 h-12 mb-2 transition-transform rounded-full group-hover:scale-110',
                action.iconBg
              )}
            >
              <Icon name={action.icon} className={clsx('text-xl', action.iconColor)} />
            </div>
            <span className="text-sm font-medium text-gray-600">{action.label}</span>
          </Button>
        ))}
      </div>

      <div id="hydration-tracker" className="p-3 mt-4 rounded-lg bg-primary-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Water Intake</span>
          <span className="text-xs text-gray-500">Goal: 2L</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center justify-center w-8 h-8 text-red-400 rounded-full bg-blue-500/20">
            <Icon name="minus"></Icon>
          </button>
          <div className="flex-1 h-4 overflow-hidden bg-white rounded-full">
            <div
              className="h-full transition-all duration-500 bg-blue-500"
              style={{ width: '60%' }}
            ></div>
          </div>
          <button className="flex items-center justify-center w-8 h-8 text-blue-500 rounded-full bg-blue-500/20">
            <Icon name="plus"></Icon>
          </button>
        </div>
        <div className="mt-1 text-xs text-center text-gray-400">1.2L / 2L</div>
      </div>
    </div>
  );
};

export default QuickActions;
