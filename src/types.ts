interface Monster {
    id: string;
    title: string;
}

interface Card {
    id: string;
    cardId: string;
    title: string;
    attack: number;
    energie: number;
  }
  
  interface DecksState {
    deck_J1: Card[];
    deck_J2: Card[];
  }