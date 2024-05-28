import { createSlice } from '@reduxjs/toolkit';

const draggableSlice = createSlice({
  name: 'draggable',
  initialState: {
    hoveredId: null,
  },
  reducers: {
    setHoveredId: (state, action) => {
      state.hoveredId = action.payload;
    },
  },
});

export const { setHoveredId } = draggableSlice.actions;

export default draggableSlice.reducer;