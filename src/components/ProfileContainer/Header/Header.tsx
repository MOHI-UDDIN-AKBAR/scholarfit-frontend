import type { SessionStats } from '../../../types/session';
import Icon from '../../ui/Icon/Icon';
import { useGetDashboardStats } from '../../../services/queries/dashboard';
import type { User } from '../../../types/user-profile';
import { getFormattedCurrentDate } from '../../../utils/helpers/dateUtils';
import { useMemo } from 'react';
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';
import clsx from 'clsx';
import { mapProfileHeaderStats } from '../../../utils/workout/profile-utils';

const GRID_COLUMN_CLASSES: Record<number, string> = {
  1: 'grid-cols-2 md:grid-cols-1',
  2: 'grid-cols-2 md:grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
  5: 'grid-cols-2 md:grid-cols-5',
};

const getGridColumnsClass = (count: number): string => GRID_COLUMN_CLASSES[count];

type HeaderProps = {
  sessionStats: SessionStats;
  user: User | undefined;
};

const Header: React.FC<HeaderProps> = ({ sessionStats, user }) => {
  const { data: dashboardStats, isLoading } = useGetDashboardStats();

  const headerStats = useMemo(
    () => mapProfileHeaderStats(sessionStats, dashboardStats),
    [sessionStats, dashboardStats]
  );

  const isHeaderStatsEmpty = useMemo(
    () => headerStats.every(({ value }) => Number(value) === 0 || value === '0'),
    [headerStats]
  );

  if (isLoading) {
    return <LoadingSpinner size="md" />;
  }

  return (
    <div className="p-6 mb-8 border-2 shadow-lg glass-card rounded-2xl">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        {user && (
          <div className="relative">
            <div className="flex items-center justify-center w-32 h-32 text-5xl font-bold text-white rounded-full profile-avatar gradient-primary">
              {user.name.substring(0, 1).toUpperCase()}
            </div>
            <div className="mt-4 text-center">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                <Icon name="crown" className="mr-1"></Icon> Premium
              </span>
            </div>
          </div>
        )}
        <div className="flex-1 text-center lg:text-left">
          {user && (
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 capitalize">{user.name}</h1>
                <div className="flex justify-center mt-1 text-center text-gray-600">
                  <Icon name="calendar" className="mr-2 text-primary-500"></Icon>
                  <span>Joined since {getFormattedCurrentDate(new Date(user.createdAt))}</span>
                </div>
              </div>
            </div>
          )}

          <div
            className={clsx(
              'grid gap-4 mt-8',
              headerStats.length > 0 && getGridColumnsClass(headerStats.length)
            )}
          >
            {!isHeaderStatsEmpty ? (
              headerStats.map((statCard) => (
                <div
                  key={statCard.id}
                  className="p-4 bg-white border border-gray-100 shadow-sm stat-card rounded-xl"
                >
                  <div className="flex items-center">
                    <div
                      className={`h-12 w-12 rounded-lg ${statCard.bgColor} flex items-center justify-center mr-3`}
                    >
                      <Icon name={statCard.icon} className={`text-xl ${statCard.iconColor}`}></Icon>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{statCard.value}</div>
                      <div className="text-sm text-gray-500">{statCard.label}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4">
                <p className="flex items-center text-gray-600">No profile stats available yet!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
