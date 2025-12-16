import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ProgressTab = {
  id: 'overview' | 'weight' | 'measurements' | 'strength';
  label: string;
};

const PROGRESS_TABS: ProgressTab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'weight', label: 'Weight' },
  { id: 'measurements', label: 'Measurements' },
  { id: 'strength', label: 'Strength' },
];

const DEFAULT_PROGRESS_TAB: ProgressTab = { id: 'overview', label: 'Overview' };

export type ProgressState = {
  progressTabs: ProgressTab[];
  currentTab: ProgressTab;
  isWeightModalOpen: boolean;
  isMeasurementModalOpen: boolean;
};

const initialState: ProgressState = {
  progressTabs: PROGRESS_TABS,
  currentTab: DEFAULT_PROGRESS_TAB,
  isWeightModalOpen: false,
  isMeasurementModalOpen: false,
};

const progressSlice = createSlice({
  name: 'progressSlice',
  initialState,
  reducers: {
    selectTab: (state, action: PayloadAction<ProgressTab>) => {
      state.currentTab = action.payload;
    },
    toggleWeightModal: (state, action: PayloadAction<boolean | undefined>) => {
      state.isWeightModalOpen =
        action.payload !== undefined ? action.payload : !state.isWeightModalOpen;
    },
    toggleMeasurementModal: (state, action: PayloadAction<boolean | undefined>) => {
      state.isMeasurementModalOpen =
        action.payload !== undefined ? action.payload : !state.isMeasurementModalOpen;
    },
  },
});

export const { selectTab, toggleWeightModal, toggleMeasurementModal } = progressSlice.actions;
export const progressReducer = progressSlice.reducer;
