import type { IconName } from '../../ui/Icon';
import Icon from '../../ui/Icon/Icon';

export interface AchievementItem {
  icon: IconName;
  iconColor: string;
  bg: string;
  title: string;
  subtitle: string;
}

export const recentAchievements: AchievementItem[] = [
  {
    icon: 'trophy',
    iconColor: 'text-yellow-600',
    bg: 'bg-yellow-100',
    title: '5 Day Streak',
    subtitle: 'Keep going strong!',
  },
  {
    icon: 'dumbbell',
    iconColor: 'text-blue-600',
    bg: 'bg-blue-100',
    title: 'Volume Master',
    subtitle: '+10% volume this week',
  },
  {
    icon: 'calendar',
    iconColor: 'text-green-600',
    bg: 'bg-green-100',
    title: 'Weekly Goal',
    subtitle: '3/4 workouts completed',
  },
];
const Achievements: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 xl:text-xl">
          Recent Achievements
        </h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-4">
          {recentAchievements.map((achievement) => (
            <div key={achievement.title} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 ${achievement.bg} rounded-full shrink-0`}
              >
                <Icon name={achievement.icon} className={`${achievement.iconColor}`}></Icon>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{achievement.title}</div>
                <div className="text-sm text-gray-500">{achievement.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
