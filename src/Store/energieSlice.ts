import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  energie_J1: 0,
  energie_J2: 0
};

const energieSlice = createSlice({
  name: 'energies',
  initialState,
  reducers: {
    setEnergieJ1(state, action: PayloadAction<number>) {
      state.energie_J1 = action.payload;
    },
    setEnergieJ2(state, action: PayloadAction<number>) {
      state.energie_J2 = action.payload;
    }
  }
});

export const { setEnergieJ1, setEnergieJ2 } = energieSlice.actions;

export default energieSlice.reducer;