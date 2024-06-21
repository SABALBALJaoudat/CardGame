// store/decksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: DecksState = {
  deck_J1: [],
  deck_J2: []
};

const decksSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    setDeckJ1(state, action: PayloadAction<Card[]>) {
      state.deck_J1 = action.payload;
    },
    setDeckJ2(state, action: PayloadAction<Card[]>) {
      state.deck_J2 = action.payload;
    },
    addCardToDeckJ1(state, action: PayloadAction<Card>) {
      state.deck_J1.push(action.payload);
    },
    removeCardFromDeckJ1(state, action: PayloadAction<string>) {
      state.deck_J1 = state.deck_J1.filter(card => card.cardId !== action.payload);
    },
  }
});

export const { setDeckJ1, setDeckJ2, addCardToDeckJ1, removeCardFromDeckJ1 } = decksSlice.actions;

export default decksSlice.reducer;