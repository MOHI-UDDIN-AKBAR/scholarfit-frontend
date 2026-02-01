import { useEffect, useMemo, useState } from 'react';
import {
  formatSeconds,
  minutesToSeconds,
  normalizeTime,
} from '../../../../utils/helpers/dateUtils';
import { CountdownTimer } from '../../../../utils/timers/countdown-timer';
import Button from '../../../ui/Button/Button';
import Icon from '../../../ui/Icon/Icon';
import { useAppDispatch, useAppState } from '../../../../store/hooks';
import { startWorkoutExercise } from '../../../../store/slices/workout-slices/workoutSessionSlice';
import { shallowEqual } from 'react-redux';
import { formatSessionStatValue } from '../SessionStats/SessionStats';

type HeaderProps = {
  programName: string;
  programDuration: number;
  totalProgramExercises: number;
  CompletedExerciseAmount?: number;
};
const Header: React.FC<HeaderProps> = ({ programName, programDuration, totalProgramExercises }) => {
  const [timeLeft, setTimeLeft] = useState(minutesToSeconds(programDuration));

  const { isReadyForExercise, sessionStats } = useAppState(
    (state) => ({
      isReadyForExercise: state.workoutSession.isReadyForExercise,
      sessionStats: state.workoutSession.sessionStatsData,
    }),
    shallowEqual
  );

  const dispatch = useAppDispatch();

  const completedExercise = useMemo(() => {
    return sessionStats.find((stat) => stat.type === 'completed_exercise');
  }, [sessionStats]);

  useEffect(() => {
    const timer = new CountdownTimer(minutesToSeconds(programDuration), { onTick: setTimeLeft });
    if (isReadyForExercise) {
      timer.start();
      return;
    }
    timer.stop();

    return () => timer.stop();
  }, [isReadyForExercise]);

  return (
    <header className="sticky bg-white shadow-sm z-1 top-18 max-xl:top-16 ">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-800">{programName}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <Icon name="clock" className="mr-1"></Icon>
                <span id="session-timer" className="font-medium">
                  {normalizeTime(programDuration.toString())}
                </span>
                <span className="mx-2">•</span>
                <span id="current-exercise" className="font-medium">
                  {completedExercise && formatSessionStatValue(completedExercise)} exercises
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {!isReadyForExercise ? (
              <Button
                id="pause-session"
                className="flex items-center px-4 py-2 font-medium text-white transition-all rounded-lg bg-primary-600 hover:bg-purple-700 active:scale-95"
                onClick={() => dispatch(startWorkoutExercise())}
              >
                <Icon name="play" size={4} className="mr-2"></Icon>
                <span>Start</span>
              </Button>
            ) : timeLeft === 0 ? (
              <span className="text-lg font-bold text-red-500 animate-pulse">00:00</span>
            ) : (
              <span className="text-lg font-bold text-primary-500">{formatSeconds(timeLeft)}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
