import { createSlice } from '@reduxjs/toolkit';

type ToggleState = { isOpen: boolean };

const initialState: ToggleState = { isOpen: false };

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSideBar } = toggleSlice.actions;
export const toggleReducer = toggleSlice.reducer;
