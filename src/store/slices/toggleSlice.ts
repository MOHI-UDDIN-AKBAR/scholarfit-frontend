import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ToggleState = { isOpen: boolean };

const initialState: ToggleState = { isOpen: false };

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleSideBar: (state, action: PayloadAction<boolean | undefined>) => {
      state.isOpen = action?.payload !== undefined ? action?.payload : !state.isOpen;
    },
  },
});

export const { toggleSideBar } = toggleSlice.actions;
export const toggleReducer = toggleSlice.reducer;
