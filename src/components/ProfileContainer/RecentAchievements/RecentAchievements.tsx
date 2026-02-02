import type { IconName } from '../../ui/Icon';
import Icon from '../../ui/Icon/Icon';

export interface Badge {
  id: string;
  title: string;
  icon: IconName;
  iconColor: string;
  bgGradientFrom: string;
  bgGradientTo: string;
  borderColor: string;
}

export const recentBadges: Badge[] = [
  {
    id: 'badge-1',
    title: 'Week Warrior',
    icon: 'trophy',
    iconColor: 'text-yellow-600',
    bgGradientFrom: 'from-yellow-100',
    bgGradientTo: 'to-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    id: 'badge-2',
    title: 'Strength Pro',
    icon: 'dumbbell',
    iconColor: 'text-blue-600',
    bgGradientFrom: 'from-blue-100',
    bgGradientTo: 'to-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 'badge-3',
    title: 'Consistency',
    icon: 'fire',
    iconColor: 'text-green-600',
    bgGradientFrom: 'from-green-100',
    bgGradientTo: 'to-green-50',
    borderColor: 'border-green-200',
  },
];

const RecentAchievements: React.FC = () => {
  return (
    <div className="p-6 shadow-lg glass-card rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Badges</h3>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {recentBadges.map((badge) => (
          <div className="text-center" key={badge.id}>
            <div
              className={`h-16 w-16 mx-auto bg-linear-to-br rounded-full flex items-center justify-center mb-2 border-2 ${badge.bgGradientFrom} ${badge.bgGradientTo} ${badge.borderColor}`}
            >
              <Icon name={badge.icon} className={`text-xl ${badge.iconColor}`}></Icon>
            </div>
            <div className="text-xs font-medium text-gray-900">{badge.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAchievements;
