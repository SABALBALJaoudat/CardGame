import { useDispatch, useSelector } from "react-redux";
import "../Css/Collection.css";
import { allCards } from "../Data/Cards";
import { RootState } from "../Store/store";
import { setDeckJ1, setDeckJ2 } from "../Store/decksSlice";
import { useState } from "react";

export default function Deck() {
  const dispatch = useDispatch();
  const deck_J1: Card[] = useSelector((state: RootState) => state.decks.deck_J1);
  const deck_J2: Card[] = useSelector((state: RootState) => state.decks.deck_J2);

  const [tempDeck_J1, setTempDeck_J1] = useState(deck_J1);
  const [tempDeck_J2, setTempDeck_J2] = useState(deck_J2);

  const handleCardClick_J1 = (cardId: string) => {
    const card = allCards.find(card => card.cardId === cardId);
    if (card) {
      const isCardInDeck = tempDeck_J1.some(deckCard => deckCard.cardId === card.cardId);
      if (!isCardInDeck) {
        setTempDeck_J1([
          ...tempDeck_J1,
          {
            id: `draggable_monster_J1_${tempDeck_J1.length + 1}`,
            cardId: card.cardId,
            title: card.title,
            attack: card.attack
          }
        ]);
      } else {
        setTempDeck_J1(tempDeck_J1.filter(deckCard => deckCard.cardId !== card.cardId));
      }
    }
  };

  const handleCardClick_J2 = (cardId: string) => {
    const card = allCards.find(card => card.cardId === cardId);
    if (card) {
      const isCardInDeck = tempDeck_J2.some(deckCard => deckCard.cardId === card.cardId);
      if (!isCardInDeck) {
        setTempDeck_J2([
          ...tempDeck_J2,
          {
            id: `draggable_monster_J2_${tempDeck_J2.length + 1}`,
            cardId: card.cardId,
            title: card.title,
            attack: card.attack
          }
        ]);
      } else {
        setTempDeck_J2(tempDeck_J2.filter(deckCard => deckCard.cardId !== card.cardId));
      }
    }
  };

  const handleConfirm = () => {
    dispatch(setDeckJ1(tempDeck_J1));
    dispatch(setDeckJ2(tempDeck_J2));
  };

  return (
    <>
      <div>Deck</div>
      <a href="/">Accueil</a>
      <div className="content">
        {allCards.map(card => {
          const isCardInDeck = tempDeck_J1.some(deckCard => deckCard.cardId === card.cardId);
          return (
            <div
              key={card.cardId}
              onClick={() => handleCardClick_J1(card.cardId)}
              style={{ backgroundColor: isCardInDeck ? 'lightgreen' : 'white' }}
            >
              id: {card.cardId}<br />
              content: {card.title}<br />
              attack: {card.attack}<br />
            </div>
          );
        })}
      </div>
      <div className="deck">
        <div className="deck_J1">
          <h2>Deck Joueur 1</h2>
          {deck_J1.map((card: Card) =>
            <div className='card'>
              <div className='title'>
                id : {card.id}<br />
                cardId : {card.cardId}<br />
                content : {card.title}<br />
                attack : {card.attack}<br />
              </div>
            </div>
          )}
        </div>
        <div className="content">
          {allCards.map(card => {
            const isCardInDeck = tempDeck_J2.some(deckCard => deckCard.cardId === card.cardId);
            return (
              <div
                key={card.cardId}
                onClick={() => handleCardClick_J2(card.cardId)}
                style={{ backgroundColor: isCardInDeck ? 'lightgreen' : 'white' }}
              >
                id: {card.cardId}<br />
                content: {card.title}<br />
                attack: {card.attack}<br />
              </div>
            );
          })}
        </div>
        <div className="deck_J2">
          <h2>Deck Joueur 2</h2>
          {deck_J2.map((card: Card) =>
            <div className='card'>
              <div className='title'>
                id : {card.id}<br />
                cardId : {card.cardId}<br />
                content : {card.title}<br />
                attack : {card.attack}<br />
              </div>
            </div>
          )}
        </div>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </>
  )
}
