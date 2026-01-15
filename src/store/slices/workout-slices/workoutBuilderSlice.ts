import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { isObjectComplete } from '../../../utils/helpers/validationUtils';
import type {
  ExerciseConfigurationInput,
  MuscleGroup,
  ProgramInput,
  WorkoutInput,
} from '../../../types/workout';
import type { CategoryType, Exercise } from '../../../types/exercise';

export type BuilderStepLabel = 'Workout Details' | 'Add Programs' | 'Save';

export type BuilderStepIndicator = { id: number; label: BuilderStepLabel; isCompleted: boolean };

export type WorkoutDifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StepIndicatorState {
  steps: BuilderStepIndicator[];
  currentStep: BuilderStepIndicator;
}

export type WorkoutDetailsFormState = Omit<WorkoutInput, 'userId' | 'programs'>;

export type ExerciseConfig = ExerciseConfigurationInput & { id?: string };

export type DraftExerciseConfig = Partial<ExerciseConfig>;

export type DraftWorkoutProgram = Partial<Omit<ProgramInput, 'exercises' | 'muscleGroup'>> &
  Pick<ProgramInput, 'muscleGroup'> & {
    id?: string;
  };

export interface WorkoutProgramWithExercises extends Partial<
  Omit<ProgramInput, 'muscleGroup' | 'exercises'>
> {
  id?: string;
  muscleGroup: MuscleGroup[];
  exercises: ExerciseConfig[];
}

export interface WorkoutBuilderUIState {
  shouldShowExerciseModal: boolean;
  isExerciseBrowserModalOpen: boolean;
  isProgramModalOpen: boolean;
}

export interface WorkoutBuilderStatus {
  currentProgramId?: string;
  isReadyToSave: boolean;
  isReadyToCreate: boolean;
}

type ExerciseFilterOption = {
  exerciseName?: string;
  categoryType?: CategoryType;
};

type WorkoutBuilderState = {
  stepIndicator: StepIndicatorState;
  workoutDetailsForm?: WorkoutDetailsFormState;
  workoutProgram: DraftWorkoutProgram;
  workoutPrograms: WorkoutProgramWithExercises[];
  workoutExercises: DraftExerciseConfig[];
  selectedExerciseConfiguration: DraftExerciseConfig;
  workoutPayload?: WorkoutInput;
  exerciseFilterOptions: ExerciseFilterOption;
} & WorkoutBuilderUIState &
  WorkoutBuilderStatus;

const DEFAULT_EXERCISE_CONFIGURATION: Partial<ExerciseConfigurationInput> = {
  exercise: undefined,
  sets: undefined,
  reps: undefined,
  rest: undefined,
  notes: undefined,
};

const STEP_INDICATORS: BuilderStepIndicator[] = [
  { id: 1, label: 'Workout Details', isCompleted: false },
  { id: 2, label: 'Add Programs', isCompleted: false },
  { id: 3, label: 'Save', isCompleted: false },
];

const DEFAULT_STEP_INDICATOR = STEP_INDICATORS[0];

const DEFAULT_STEP_INDICATORS = {
  steps: STEP_INDICATORS,
  currentStep: DEFAULT_STEP_INDICATOR,
};

const DEFAULT_WORKOUT_PROGRAM = {
  id: undefined,
  name: undefined,
  description: undefined,
  dayNumber: undefined,
  restDays: undefined,
  muscleGroup: [],
  duration: undefined,
} satisfies Partial<Omit<ProgramInput, 'exercises'> & { id: string }>;

const DEFAULT_STATE: WorkoutBuilderState = {
  stepIndicator: DEFAULT_STEP_INDICATORS,
  workoutDetailsForm: undefined,
  workoutProgram: DEFAULT_WORKOUT_PROGRAM,
  workoutPrograms: [],
  workoutExercises: [],
  selectedExerciseConfiguration: DEFAULT_EXERCISE_CONFIGURATION,
  workoutPayload: undefined,
  shouldShowExerciseModal: false,
  isExerciseBrowserModalOpen: false,
  isProgramModalOpen: false,
  currentProgramId: undefined,
  isReadyToSave: false,
  isReadyToCreate: false,
  exerciseFilterOptions: {
    exerciseName: undefined,
    categoryType: 'STRENGTH',
  },
} satisfies WorkoutBuilderState;

const workoutBuilderSlice = createSlice({
  name: 'workoutBuilder',
  initialState: DEFAULT_STATE,
  reducers: {
    resetCurrentStep: (state) => {
      state.stepIndicator.currentStep = DEFAULT_STEP_INDICATOR;
    },
    toggleExerciseModal: (state, action: PayloadAction<boolean | undefined>) => {
      state.shouldShowExerciseModal =
        action.payload !== undefined ? action.payload : !state.shouldShowExerciseModal;
    },
    addExerciseToExerciseModal: (state, action: PayloadAction<{ exercise: Exercise }>) => {
      state.selectedExerciseConfiguration.exercise = action.payload.exercise;
      state.shouldShowExerciseModal = true;
    },
    setExerciseSets: (state, action: PayloadAction<number>) => {
      state.selectedExerciseConfiguration.sets = action.payload;

      state.isReadyToSave = isObjectComplete(state.selectedExerciseConfiguration, {
        ignoreFields: ['notes', 'error', 'targetMuscles', 'secondaryMuscles', 'id'],
      });
    },
    setExerciseReps: (state, action: PayloadAction<string>) => {
      state.selectedExerciseConfiguration.reps = action.payload;

      state.isReadyToSave = isObjectComplete(state.selectedExerciseConfiguration, {
        ignoreFields: ['notes', 'error', 'targetMuscles', 'secondaryMuscles', 'id'],
      });
    },
    setExerciseRestTime: (state, action: PayloadAction<number>) => {
      state.selectedExerciseConfiguration.rest = action.payload;

      state.isReadyToSave = isObjectComplete(state.selectedExerciseConfiguration, {
        ignoreFields: ['notes', 'error', 'targetMuscles', 'secondaryMuscles', 'id'],
      });
    },
    setExerciseNotes: (state, action: PayloadAction<string>) => {
      state.selectedExerciseConfiguration.notes = action.payload;
    },

    cancelExerciseConfiguration: (state) => {
      state.selectedExerciseConfiguration = DEFAULT_EXERCISE_CONFIGURATION;
      state.shouldShowExerciseModal = false;
    },

    confirmConfigurationState: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedExerciseConfiguration.id = action.payload.id;

      state.workoutPrograms = state.workoutPrograms.map((program) =>
        program.id === state.currentProgramId
          ? {
              ...program,
              exercises: [
                ...program.exercises,
                state.selectedExerciseConfiguration as ExerciseConfig,
              ],
            }
          : program
      );

      state.shouldShowExerciseModal = false;
      state.selectedExerciseConfiguration = DEFAULT_EXERCISE_CONFIGURATION;
      state.stepIndicator.currentStep = state.stepIndicator.steps[1];
    },
    addWorkoutProgram: (state) => {
      state.workoutProgram.id = crypto.randomUUID();

      if (!isObjectComplete(state.workoutProgram)) {
        return;
      }

      const newWorkoutProgram = {
        ...state.workoutProgram,
        exercises: [],
        selectedExerciseConfiguration: DEFAULT_EXERCISE_CONFIGURATION,
      };

      state.workoutPrograms = [...state.workoutPrograms, newWorkoutProgram];
      state.workoutProgram = DEFAULT_WORKOUT_PROGRAM;
      state.isProgramModalOpen = false;
    },
    removeWorkoutExercise: (
      state,
      action: PayloadAction<{ exerciseId: string; programId: string }>
    ) => {
      state.workoutPrograms = state.workoutPrograms.map((program) =>
        program.id === action.payload.programId
          ? {
              ...program,
              exercises: program.exercises.filter(
                (exercise) => exercise.id !== action.payload.exerciseId
              ),
            }
          : program
      );
    },
    removeWorkoutProgram: (state, action: PayloadAction<{ programId: string }>) => {
      state.workoutPrograms = state.workoutPrograms.filter(
        (program) => program.id !== action.payload.programId
      );
    },
    undoWorkoutBuilderState: () => DEFAULT_STATE,

    addWorkoutPayload: (state, action: PayloadAction<WorkoutInput>) => {
      state.workoutPayload = action.payload;
      state.isReadyToCreate = true;
      state.stepIndicator.currentStep = state.stepIndicator.steps[2];
    },
    toggleExerciseBrowserModal: (state, action: PayloadAction<boolean | undefined>) => {
      state.isExerciseBrowserModalOpen =
        action.payload !== undefined ? action.payload : !state.isExerciseBrowserModalOpen;
    },
    toggleWorkoutProgramModal: (state, action: PayloadAction<boolean | undefined>) => {
      state.isProgramModalOpen =
        action.payload !== undefined ? action.payload : !state.isProgramModalOpen;
    },
    setWorkoutProgramName: (state, action: PayloadAction<string>) => {
      state.workoutProgram.name = action.payload;
    },
    setWorkoutProgramDescription: (state, action: PayloadAction<string>) => {
      state.workoutProgram.description = action.payload;
    },

    setWorkoutProgramMuscleGroup: (state, action: PayloadAction<MuscleGroup[]>) => {
      state.workoutProgram.muscleGroup = action.payload;
    },
    setWorkoutProgramDayNumber: (state, action: PayloadAction<number>) => {
      state.workoutProgram.dayNumber = action.payload;
    },
    setWorkoutProgramRestDays: (state, action: PayloadAction<number>) => {
      state.workoutProgram.restDays = action.payload;
    },
    setWorkoutProgramDuration: (state, action: PayloadAction<number>) => {
      state.workoutProgram.duration = action.payload;
    },
    setCurrentProgramId: (state, action: PayloadAction<{ programId: string }>) => {
      state.currentProgramId = action.payload.programId;
    },
    setExerciseFilterOptions: (state, action: PayloadAction<ExerciseFilterOption>) => {
      state.exerciseFilterOptions = { ...state.exerciseFilterOptions, ...action.payload };
    },
  },
});

export const {
  resetCurrentStep,
  addExerciseToExerciseModal,
  toggleExerciseModal,
  cancelExerciseConfiguration,
  setExerciseSets,
  setExerciseReps,
  setExerciseRestTime,
  setExerciseNotes,
  confirmConfigurationState,
  removeWorkoutExercise,
  undoWorkoutBuilderState,
  addWorkoutPayload,
  toggleExerciseBrowserModal,
  toggleWorkoutProgramModal,
  setWorkoutProgramName,
  setWorkoutProgramDescription,
  setWorkoutProgramDayNumber,
  setWorkoutProgramDuration,
  setWorkoutProgramMuscleGroup,
  setWorkoutProgramRestDays,
  addWorkoutProgram,
  setCurrentProgramId,
  removeWorkoutProgram,
  setExerciseFilterOptions,
} = workoutBuilderSlice.actions;

export const workoutBuilderReducer = workoutBuilderSlice.reducer;
