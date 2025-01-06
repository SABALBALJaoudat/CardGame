import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDeckJ1, setDeckJ2 } from '../Store/decksSlice';
import { allCards } from './Cards';

// Fonction de mélange aléatoire
function shuffleArray(array: {cardId: string; title: string; attack: number; energie: number}[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const DecksInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const allCards_copy = [...allCards];
    const shuffledCards = shuffleArray(allCards_copy);
    const deck_J1 = shuffledCards.slice(0, 10).map((card) => ({
      id: `draggable_monster_J1_${card.cardId}`,
      cardId: card.cardId,
      title: card.title,
      attack: card.attack,
      energie: card.energie
    }));

    const remainingCards = shuffledCards.slice(10);
    const deck_J2 = remainingCards.slice(0, 10).map((card) => ({
      id: `draggable_monster_J2_${card.cardId}`,
      cardId: card.cardId,
      title: card.title,
      attack: card.attack,
      energie: card.energie
    }));

    console.log(deck_J1);

    dispatch(setDeckJ1(deck_J1));
    dispatch(setDeckJ2(deck_J2));
  }, [dispatch]);

  return null;
};

export default DecksInitializer;

// // Remplissage des decks de manière aléatoire
// const allCards_copy = [...allCards]
// const shuffledCards = shuffleArray(allCards_copy);
// export const deck_J1 = shuffledCards.slice(0, 10).map((card, index) => ({
//     id: `draggable_monster_J1_${index + 1}`,
//     cardId: card.cardId,
//     title: card.title,
//     attack: card.attack
// }));

// const remainingCards = shuffledCards.slice(10); // Cartes restantes après avoir pris 5 pour le joueur 1

// export const deck_J2 = remainingCards.slice(0, 10).map((card, index) => ({
//     id: `draggable_monster_J2_${index + 1}`,
//     cardId: card.cardId,
//     title: card.title,
//     attack: card.attack
// }));