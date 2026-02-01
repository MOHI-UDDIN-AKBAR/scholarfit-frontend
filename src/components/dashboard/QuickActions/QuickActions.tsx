import { Link } from 'react-router';
import Icon from '../../ui/Icon/Icon';
import type { IconName } from '../../ui/Icon';

export interface QuickActionItem {
  icon: IconName;
  iconColor: string;
  bg: string;
  label: string;
  href: string;
  id: number;
}

export const quickActions: QuickActionItem[] = [
  {
    id: 1,
    icon: 'plus',
    iconColor: 'text-primary-600',
    bg: 'bg-primary-100',
    label: 'Start Workout',
    href: '/workouts',
  },
  {
    id: 2,
    icon: 'search',
    iconColor: 'text-green-600',
    bg: 'bg-green-100',
    label: 'Browse Exercises',
    href: '/exercises',
  },
  {
    id: 3,
    icon: 'chart',
    iconColor: 'text-purple-600',
    bg: 'bg-purple-100',
    label: 'View Progress',
    href: '/progress',
  },
  {
    id: 4,
    icon: 'user',
    iconColor: 'text-yellow-600',
    bg: 'bg-yellow-100',
    label: 'Profile',
    href: '/profile',
  },
];

type ActionItemProps = {
  actionItem: QuickActionItem;
};

const ActionItem: React.FC<ActionItemProps> = ({ actionItem }) => {
  return (
    <Link
      to={actionItem.href}
      className="flex flex-col items-center justify-center p-4 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
    >
      <div className={`p-3 mb-2 rounded-md shrink-0 ${actionItem.bg}`}>
        <Icon name={actionItem.icon} className={`w-6 h-6 ${actionItem.iconColor}`}></Icon>
      </div>
      <div className="text-sm font-medium text-gray-900">{actionItem.label}</div>
    </Link>
  );
};

const QuickActions: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((actionItem) => (
            <ActionItem key={actionItem.id} actionItem={actionItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
