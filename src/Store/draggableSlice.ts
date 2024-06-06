import { createSlice } from '@reduxjs/toolkit';

const draggableSlice = createSlice({
  name: 'draggable',
  initialState: {
    hoveredCardInfo: null, // Correspond à monster
  },
  reducers: {
    setHoveredCardInfo: (state, action) => {
      state.hoveredCardInfo = action.payload;
    },
  },
});

export const { setHoveredCardInfo } = draggableSlice.actions;

export default draggableSlice.reducer;