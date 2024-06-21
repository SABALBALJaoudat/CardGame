import { configureStore } from '@reduxjs/toolkit';
import draggableReducer from './draggableSlice';
import decksReducer from './decksSlice';


const store = configureStore({
  reducer: {
    draggable: draggableReducer,
    decks: decksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;