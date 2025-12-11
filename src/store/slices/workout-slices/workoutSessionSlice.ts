import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  ConfigurationState,
  WorkoutPayload,
  WorkoutProgramState,
} from './workoutBuilderSlice';

type NonNullableWorkoutSession = {
  [K in keyof BasicSessionState]-?: NonNullable<BasicSessionState[K]>;
};

export type ExerciseHistory = {
  id: string;
  set: number;
  Reps: string;
  restTime: number;
  weight: number;
  RPE: string;
  setNotes?: string;
};

export type ProgramExercise = {
  exerciseId: string;
  exerciseHistory: ExerciseHistory[];
  completeExerciseOptions?: string;
  completionNotes?: string;
};

export type WorkoutProgram = {
  programId: string;
  exercises: ProgramExercise[];
};

export type WorkoutHistory = {
  userId?: string;
  workoutId: string;
  program: WorkoutProgram[];
  totalVolume: number;
  dayStreak?: number;
};

export type BasicSessionState = {
  sessionWorkout: WorkoutPayload | null;
  sessionWorkoutProgram: WorkoutProgramState | null;
  currentProgramExercise: {
    workoutExercise: ConfigurationState;
    exerciseNumber: number;
    currentSet: number;
  } | null;
};

export type WorkoutSessionState = BasicSessionState & {
  userId?: string;
  workoutHistory: WorkoutHistory | null;
  currentWorkoutProgram: WorkoutProgram | null;
  currentExerciseProgram: ProgramExercise | null;
  isReadyForNextExercise: boolean;
  isTodaysProgramComplete: boolean;
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
  isReadyForNextExercise: false,
  isTodaysProgramComplete: false,
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
        workoutExercise: ConfigurationState;
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
      };

      const previousExercises = state.currentWorkoutProgram?.exercises ?? [];

      const isTheSameExercise = previousExercises.some(
        (exercise) => exercise.exerciseId === exerciseId
      );

      const updatedExercises = isTheSameExercise
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

      const totalSet = state.currentProgramExercise?.workoutExercise.sets.value ?? 1;

      if (state.currentProgramExercise && state.currentProgramExercise.currentSet < totalSet) {
        state.currentProgramExercise.currentSet += 1;
        return;
      }

      state.isReadyForNextExercise = true;
    },
    moveOnNextExercise: (state) => {
      const totalExercisesInProgram = state.sessionWorkoutProgram
        ? state.sessionWorkoutProgram.workoutExercises
        : [];

      const currentExerciseNumber = state.currentProgramExercise
        ? state.currentProgramExercise.exerciseNumber
        : 0;

      // fine till here

      if (
        currentExerciseNumber > 0 &&
        currentExerciseNumber < totalExercisesInProgram.length &&
        state.currentProgramExercise
      ) {
        state.currentProgramExercise.exerciseNumber += 1;
        state.currentProgramExercise.currentSet = 1;
        state.currentProgramExercise.workoutExercise =
          totalExercisesInProgram[state.currentProgramExercise.exerciseNumber - 1];
        // console.log(state.currentProgramExercise.workoutExercise.id);
        state.isReadyForNextExercise = false;
        state.currentExerciseProgram = null;
        return;
      }
      state.isTodaysProgramComplete = true;

      const totalWorkoutVolume =
        state.currentWorkoutProgram?.exercises.reduce((exerciseVolume, exercise) => {
          const exerciseTotal =
            exercise.exerciseHistory?.reduce(
              (setVolume, history) => setVolume + history.weight * Number(history.Reps),
              0
            ) ?? 0;

          return exerciseVolume + exerciseTotal;
        }, 0) ?? 0;

      const workoutHistory = {
        // TODO: set userId and dayStreak
        userId: undefined,
        dayStreak: 1,
        workoutId: state.sessionWorkout?.id!,
        program:
          state.workoutHistory?.program && state.workoutHistory?.program.length > 0
            ? [...state.workoutHistory?.program, state.currentWorkoutProgram!]
            : [state.currentWorkoutProgram!],
        totalVolume: totalWorkoutVolume,
      };

      state.workoutHistory = workoutHistory;
    },
  },
});

export const {
  setActiveWorkoutSession,
  updateCurrentProgramExercise,
  saveSetData,
  moveOnNextExercise,
} = workoutSessionSlice.actions;

export const workoutSessionReducer = workoutSessionSlice.reducer;
