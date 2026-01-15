import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IconName } from '../../../components/ui/Icon';
import { formatTo12HourTime } from '../../../utils/helpers/dateUtils';
import { isProgressCount } from '../../../utils/typeGuards';
import type { ExerciseConfiguration, Workout, WorkoutProgram } from '../../../types/workout';
import type {
  ExerciseHistory,
  ProgramExercise,
  SessionWorkoutProgram,
  WorkoutHistoryInput,
} from '../../../types/session';

export const SESSION_STATS: SessionStatItem[] = [
  {
    id: 'stats-time',
    type: 'session_time',
    title: 'Session Time',
    value: formatTo12HourTime(new Date().toISOString()),
    icon: 'clock',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
    right: {
      type: 'button',
      icon: '',
    },
  },
  {
    id: 'stats-volume',
    type: 'volume_lifted',
    title: 'Volume Lifted',
    value: 0,
    icon: 'weightHanging',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-500/10',
    right: {
      type: 'percentage',
      value: '',
      color: 'text-green-500',
    },
  },
  {
    id: 'stats-sets',
    type: 'sets_completed',
    title: 'Sets Completed',
    value: 0,
    icon: 'layerGroup',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
    right: {
      type: 'text',
      value: '',
    },
  },
  {
    id: 'stats-exercises',
    type: 'completed_exercise',
    title: 'Exercises Done',
    value: { completed: 0, outOf: 0 },
    icon: 'dumbbell',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
    right: {
      type: 'progress',
      percent: 0,
    },
  },
];

type NonNullableWorkoutSession = {
  [K in keyof BasicSessionState]-?: NonNullable<BasicSessionState[K]>;
};

export type SessionStatsType =
  | 'session_time'
  | 'volume_lifted'
  | 'sets_completed'
  | 'completed_exercise';

export type StatRightSide =
  | { type: 'button'; icon: string }
  | { type: 'percentage'; value: string; color: string }
  | { type: 'text'; value: string }
  | { type: 'progress'; percent: number };

export type ProgressCount = {
  completed: number;
  outOf: number;
};

export type SessionStatItem = {
  id?: string;
  type: SessionStatsType;
  title: string;
  value: string | number | ProgressCount;
  icon: IconName;
  iconColor: string;
  iconBg: string;
  right: StatRightSide;
};

export type WorkoutHistory = {
  userId?: string;
  workoutId: string;
  program: SessionWorkoutProgram[];
  totalVolume: number;
  streakInfo?: {
    currentStreak: number;
    longestStreak: number;
  };
  completedAt: string;
};

export type BasicSessionState = {
  sessionWorkout: Workout | null;
  sessionWorkoutProgram: WorkoutProgram | null;
  currentProgramExercise: {
    workoutExercise: ExerciseConfiguration;
    exerciseNumber: number;
    currentSet: number;
  } | null;
};

export type WorkoutSessionState = BasicSessionState & {
  userId?: string;
  workoutHistory: WorkoutHistoryInput | null;
  currentWorkoutProgram: SessionWorkoutProgram | null;
  currentExerciseProgram: ProgramExercise | null;
  isReadyForExercise: boolean;
  isReadyForNextExercise: boolean;
  isTodaysProgramComplete: boolean;
  sessionStatsData: SessionStatItem[];
};

const DEFAULT_BASIC_SESSION_STATE: BasicSessionState = {
  sessionWorkout: null,
  sessionWorkoutProgram: null,
  currentProgramExercise: null,
};

const initialState: WorkoutSessionState = {
  ...DEFAULT_BASIC_SESSION_STATE,
  workoutHistory: null,
  currentExerciseProgram: null,
  currentWorkoutProgram: null,
  isReadyForExercise: false,
  isReadyForNextExercise: false,
  isTodaysProgramComplete: false,
  sessionStatsData: SESSION_STATS,
};

const workoutSessionSlice = createSlice({
  name: 'workoutSession',
  initialState,
  reducers: {
    setActiveWorkoutSession: (
      state,
      action: PayloadAction<Required<NonNullableWorkoutSession>>
    ) => {
      state.sessionWorkout = action.payload.sessionWorkout;
      state.sessionWorkoutProgram = action.payload.sessionWorkoutProgram;
      state.currentProgramExercise = action.payload.currentProgramExercise;
    },
    updateCurrentProgramExercise: (
      state,
      action: PayloadAction<{
        workoutExercise: ExerciseConfiguration;
        exerciseNumber: number;
        currentSet: number;
      }>
    ) => {
      state.currentProgramExercise = action.payload;
    },
    saveSetData: (
      state,
      action: PayloadAction<{
        exerciseHistory: ExerciseHistory;
        exerciseId: string;
        programId: string;
      }>
    ) => {
      const { exerciseHistory, exerciseId, programId } = action.payload;

      const updatedExerciseHistory = state.currentExerciseProgram?.exerciseHistory
        ? [...state.currentExerciseProgram?.exerciseHistory, exerciseHistory]
        : [exerciseHistory];

      state.currentExerciseProgram = {
        exerciseId: exerciseId,
        exerciseHistory: updatedExerciseHistory,
        isCompleted: false,
      };

      const previousExercises = state.currentWorkoutProgram?.exercises ?? [];

      const isTheSameExercise = previousExercises.some(
        (exercise) => exercise.exerciseId === exerciseId
      );

      const updatedExercises: ProgramExercise[] = isTheSameExercise
        ? previousExercises.map((exercise) => {
            if (exercise.exerciseId === exerciseId)
              return {
                ...exercise,
                exerciseHistory: updatedExerciseHistory,
              };
            return exercise;
          })
        : [...previousExercises, state.currentExerciseProgram];

      state.currentWorkoutProgram = {
        programId,
        exercises: updatedExercises,
      };

      const totalSet = state.currentProgramExercise?.workoutExercise.sets ?? 1;

      state.sessionStatsData = state.sessionStatsData.map((stats) =>
        stats.type === 'volume_lifted'
          ? {
              ...stats,
              value: ((stats.value as number) + exerciseHistory.weight) as number,
            }
          : stats.type === 'sets_completed'
            ? {
                ...stats,
                value: (stats.value as number) + 1,
              }
            : stats
      );

      if (state.currentProgramExercise && state.currentProgramExercise.currentSet < totalSet) {
        state.currentProgramExercise.currentSet += 1;
        return;
      }

      state.isReadyForNextExercise = true;
    },
    moveOnNextExercise: (
      state,
      action: PayloadAction<{
        userId: string;
      }>
    ) => {
      const totalExercisesInProgram = state.sessionWorkoutProgram
        ? state.sessionWorkoutProgram.exercises
        : [];

      const currentExerciseNumber = state.currentProgramExercise
        ? state.currentProgramExercise.exerciseNumber
        : 0;

      if (
        currentExerciseNumber > 0 &&
        currentExerciseNumber < totalExercisesInProgram.length &&
        state.currentProgramExercise
      ) {
        state.currentProgramExercise.exerciseNumber += 1;
        state.currentProgramExercise.currentSet = 1;
        state.currentProgramExercise.workoutExercise =
          totalExercisesInProgram[state.currentProgramExercise.exerciseNumber - 1];
        state.isReadyForNextExercise = false;
        state.currentExerciseProgram = null;

        const completedExerciseAmount: ProgressCount = (state.sessionStatsData.find(
          (stat) => stat.type === 'completed_exercise'
        )?.value as ProgressCount) ?? { completed: 0, outOf: 0 };

        state.sessionStatsData = state.sessionStatsData.map((stats) =>
          stats.type === 'completed_exercise'
            ? {
                ...stats,
                value: {
                  ...completedExerciseAmount,
                  completed: completedExerciseAmount.completed + 1,
                } as ProgressCount,
              }
            : stats
        );
        return;
      }
      state.isTodaysProgramComplete = true;
      state.isReadyForExercise = false;
      const totalWorkoutVolume =
        state.currentWorkoutProgram?.exercises.reduce((exerciseVolume, exercise) => {
          const exerciseTotal =
            exercise.exerciseHistory?.reduce(
              (setVolume, history) => setVolume + history.weight * Number(history.reps),
              0
            ) ?? 0;

          return exerciseVolume + exerciseTotal;
        }, 0) ?? 0;

      const sessionPayload: WorkoutHistoryInput = {
        userId: action.payload.userId,
        workoutId: state.sessionWorkout?.id!,
        workoutName: state.sessionWorkout?.name,
        program:
          state.workoutHistory?.program && state.workoutHistory?.program.length > 0
            ? [...state.workoutHistory?.program, state.currentWorkoutProgram!]
            : [state.currentWorkoutProgram!],
        sessionVolume: totalWorkoutVolume,
        completedAt: new Date().toISOString(),
      };

      state.workoutHistory = sessionPayload;
    },
    startWorkoutExercise: (state, action: PayloadAction) => {
      state.isReadyForExercise = true;
      // state.timer = new CountdownTimer(action.payload.programDuration);
      // state.timer.start();
    },
    updateSessionState: (
      state,
      action: PayloadAction<{ type: SessionStatsType; totalProgramExercises: number }>
    ) => {
      const { type, totalProgramExercises } = action.payload;
      state.sessionStatsData = state.sessionStatsData.map((stat) => {
        if (stat.type !== type) {
          return stat;
        }

        if (!isProgressCount(stat.value)) {
          return stat;
        }

        return {
          ...stat,
          value: { completed: stat.value.completed, outOf: totalProgramExercises } as ProgressCount,
        };
      });
    },
  },
});

export const {
  setActiveWorkoutSession,
  updateCurrentProgramExercise,
  saveSetData,
  moveOnNextExercise,
  startWorkoutExercise,
  updateSessionState,
} = workoutSessionSlice.actions;

export const workoutSessionReducer = workoutSessionSlice.reducer;
