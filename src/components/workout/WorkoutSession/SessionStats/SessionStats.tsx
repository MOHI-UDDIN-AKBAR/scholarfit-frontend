import clsx from 'clsx';
import Icon from '../../../ui/Icon/Icon';
import { useAppDispatch, useAppState } from '../../../../store/hooks';
import { useEffect } from 'react';
import {
  updateSessionState,
  type ProgressCount,
  type SessionStatItem,
  type SessionStatsType,
} from '../../../../store/slices/workout-slices/workoutSessionSlice';
import { isProgressCount } from '../../../../utils/typeGuards';

type SessionStatsProps = { totalProgramExercises: number };

export const formatSessionStatValue = (stat: SessionStatItem): string => {
  switch (stat.type) {
    case 'session_time':
      return typeof stat.value === 'string' ? stat.value : '00:00';

    case 'completed_exercise':
      return isProgressCount(stat.value)
        ? `${stat.value.completed} / ${stat.value.outOf}`
        : '0 / 0';

    default:
      return String(stat.value);
  }
};

const SessionStats: React.FC<SessionStatsProps> = ({ totalProgramExercises }) => {
  const sessionStatsData = useAppState((state) => state.workoutSession.sessionStatsData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateSessionState({ type: 'completed_exercise' as SessionStatsType, totalProgramExercises })
    );
  }, [totalProgramExercises]);
  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl animate-fade-in">
      <h3 className="mb-4 text-lg font-bold text-gray-600">Session Stats</h3>

      <div className="space-y-4">
        {sessionStatsData.map((stat) => {
          const statValue = formatSessionStatValue(stat);

          return (
            <div
              className="flex items-center justify-between p-3 transition-colors rounded-lg cursor-pointer stat-item bg-primary-50 hover:bg-primary-100"
              key={stat.type}
            >
              <div className="flex items-center">
                <div
                  className={clsx(
                    'flex items-center justify-center w-10 h-10 mr-3 rounded-lg',
                    stat.iconBg
                  )}
                >
                  <Icon name={stat.icon} className={clsx(stat.iconColor)}></Icon>
                </div>
                <div>
                  <p className="text-sm text-gray-700 capitalize">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-700" id="stat-time">
                    {statValue}
                  </p>
                </div>
              </div>
              <div className="text-gray-500">
                {stat.right.type === 'percentage' && stat.right.value !== '' ? (
                  <span className={clsx(stat.right.color)}>{stat.right.value}</span>
                ) : stat.right.type === 'text' && stat.right.value !== '' ? (
                  <span>{stat.right.value}</span>
                ) : stat.right.type === 'progress' && stat.right.percent > 0 ? (
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 transition-all duration-500 bg-blue-500 rounded-full"
                      style={{
                        width: `${Math.round((stat.value as ProgressCount).completed / (stat.value as ProgressCount).outOf)}%`,
                      }}
                    ></div>
                  </div>
                ) : null}

                {stat.type === 'completed_exercise' && (
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 transition-all duration-500 bg-blue-500 rounded-full"
                      style={{
                        width: `${Math.round(((stat.value as ProgressCount).completed / (stat.value as ProgressCount).outOf) * 100)}%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionStats;
