import { configureStore } from '@reduxjs/toolkit';
import draggableReducer from './draggableSlice';
import decksReducer from './decksSlice';
import energieReducer from './energieSlice';


const store = configureStore({
  reducer: {
    draggable: draggableReducer,
    decks: decksReducer,
    energiePlayer: energieReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootState_draggable = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;