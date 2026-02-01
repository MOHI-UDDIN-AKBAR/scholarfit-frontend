import clsx from 'clsx';
import Icon from '../../ui/Icon/Icon';
import type { BodyWeightStats, DashboardStat, WeeklyGoal } from '../../../types/dashboard';
import { useMemo } from 'react';
import { buildDashboardStats } from '../../../utils/workout/dashboard-utils';

type StatsCardProps = {
  stat: DashboardStat;
};
const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-md shrink-0 ${stat.bgColor}`}>
            <Icon name={stat.icon} className={clsx('w-6 h-6', stat.iconColor)}></Icon>
          </div>
          <div className="flex-1 w-0 ml-5">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
              <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
            </dl>
          </div>
        </div>
        <div className="mt-2">
          {stat.extra && (
            <div className="text-sm text-gray-500">
              {stat.id === 'bodyWeight' ? (
                <div className="flex items-center text-sm font-medium text-green-600">
                  <Icon name="arrowRight" size={4} className="mr-1 rotate-90"></Icon>
                  <span> {stat.extra}</span>
                </div>
              ) : (
                stat.extra
              )}
            </div>
          )}
          {stat.progress && (
            <div
              className="h-2 text-sm bg-green-600 rounded-full"
              style={{ width: `${stat.progress}%` }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

type StatsCardsProps = {
  streakInfo: { currentStreak: number; longestStreak: number };
  weeklyGoal: WeeklyGoal;
  bodyWeightStats: BodyWeightStats | null;
  totalPrograms: number;
};
const StatsCards: React.FC<StatsCardsProps> = (props) => {
  const stats = useMemo(() => buildDashboardStats(props), [props]);

  const isStatsValueEmpty = stats.every(
    (stat) =>
      stat.value === 0 ||
      stat.value === '0' ||
      stat.value === '0 days' ||
      stat.value === '0/0 workouts'
  );

  if (isStatsValueEmpty) return null;

  return (
    <section className="px-4 py-6 sm:px-0">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
};

export default StatsCards;
