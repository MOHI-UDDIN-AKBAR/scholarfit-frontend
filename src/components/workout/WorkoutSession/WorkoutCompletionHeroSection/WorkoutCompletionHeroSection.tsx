import React, { useEffect, useRef } from 'react';
import Confetti from '../../../shared/Confetti/Confetti';
import Icon from '../../../ui/Icon/Icon';
import { useAppState } from '../../../../store/hooks';
import { formatTo12HourTime } from '../../../../utils/helpers/dateUtils';
import { shallowEqual } from 'react-redux';

interface WorkoutCompletionHeroSectionProps {
  showConfetti?: boolean;
  confettiEffect?:
    | 'burst'
    | 'schoolPride'
    | 'realistic'
    | 'fireworks'
    | 'sideCannons'
    | 'celebration';
  confettiOptions?: any;
  programDuration: number;
  totalProgramExercises: number;
}

const WorkoutCompletionHeroSection: React.FC<WorkoutCompletionHeroSectionProps> = ({
  showConfetti = true,
  confettiEffect = 'celebration',
  confettiOptions = {
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'],
  },
  programDuration,
  totalProgramExercises,
}) => {
  const hasTriggeredConfetti = useRef(false);
  const { totalVolume, completedAt } = useAppState(
    (state) => ({
      totalVolume: state.workoutSession.workoutHistory?.sessionVolume,
      completedAt: state.workoutSession.workoutHistory?.completedAt,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (showConfetti && !hasTriggeredConfetti.current) {
      hasTriggeredConfetti.current = true;
    }
  }, [showConfetti]);

  return (
    <div className="relative mb-20 fade-in top-18 max-xl:top-16">
      {showConfetti && (
        <Confetti autoTrigger={true} effect={confettiEffect} options={confettiOptions} />
      )}

      <div className="relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="flex items-center justify-center rounded-full w-36 h-36 bg-linear-to-br from-primary-500/20 via-primary-400/70 to-blue-500/20 pulse-glow-for-hero">
                <div className="text-6xl">💪</div>
              </div>
              <div className="absolute flex items-center justify-center w-12 h-12 text-white bg-yellow-500 rounded-full shadow-lg -top-2 -right-2">
                <Icon name="trophy"></Icon>
              </div>
            </div>
          </div>

          <h1 className="py-2 mb-3 text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary-500 to-blue-500 md:text-5xl">
            Amazing Work!
          </h1>
          <p className="mb-4 text-xl text-gray-600">
            You crushed your <strong className="text-green-600">Day</strong> workout!
          </p>

          {completedAt && (
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-green-800 bg-green-100 rounded-full">
              <Icon name="clock" className="mr-2 fas fa-clock"></Icon>
              Completed at {formatTo12HourTime(completedAt)}
            </div>
          )}

          <div className="max-w-3xl p-6 mx-auto mb-8 bg-white border border-green-100 shadow-lg rounded-2xl">
            <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
              <div className="p-4 text-center bg-green-50 rounded-xl">
                <div className="mb-1 text-2xl font-bold text-green-600">{programDuration}m</div>
                <div className="text-sm text-gray-500">Duration</div>
              </div>
              <div className="p-4 text-center bg-blue-50 rounded-xl">
                <div className="mb-1 text-2xl font-bold text-blue-600">
                  {totalProgramExercises} / {totalProgramExercises}
                </div>
                <div className="text-sm text-gray-500">Exercises</div>
              </div>
              <div className="p-4 text-center bg-orange-50 rounded-xl">
                <div className="mb-1 text-2xl font-bold text-orange-600">2</div>
                <div className="text-sm text-gray-500">New PRs</div>
              </div>
              {totalVolume && (
                <div className="p-4 text-center bg-purple-50 rounded-xl">
                  <div className="mb-1 text-2xl font-bold text-purple-600">{totalVolume}kg</div>
                  <div className="text-sm text-gray-500">Volume</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCompletionHeroSection;
