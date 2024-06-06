import { allCards } from './Cards';

// Fonction de mélange aléatoire de Fisher-Yates
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Remplissage des decks de manière aléatoire
const shuffledCards = shuffleArray(allCards);
export const initialMonsters_J1 = shuffledCards.slice(0, 5).map((card, index) => ({
    id: `draggable_monster_J1_${index + 1}`,
    content: card.title,
    attack: card.attack
}));

const remainingCards = shuffledCards.slice(5); // Cartes restantes après avoir pris 5 pour le joueur 1

export const initialMonsters_J2 = remainingCards.slice(0, 5).map((card, index) => ({
    id: `draggable_monster_J2_${index + 1}`,
    content: card.title,
    attack: card.attack
}));