import { configureStore } from '@reduxjs/toolkit';
import draggableReducer from './draggableSlice';

const store = configureStore({
  reducer: {
    draggable: draggableReducer,
  },
});

export default store;