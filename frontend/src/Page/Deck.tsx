import { useDispatch, useSelector } from "react-redux";
import "../Css/Collection.scss";
import { allCards } from "../Data/Cards";
import { RootState } from "../Store/store";
import { setDeckJ1, setDeckJ2 } from "../Store/decksSlice";
import { useEffect, useState } from "react";

export default function Deck() {
  const dispatch = useDispatch();
  const deck_J1: Card[] = useSelector((state: RootState) => state.decks.deck_J1);
  const deck_J2: Card[] = useSelector((state: RootState) => state.decks.deck_J2);

  const [tempDeck_J1, setTempDeck_J1] = useState(deck_J1);
  const [tempDeck_J2, setTempDeck_J2] = useState(deck_J2);

  useEffect(() => {
    setTempDeck_J1(deck_J1);
    setTempDeck_J2(deck_J2);
  }, [deck_J1, deck_J2]);

  const handleCardClick_J1 = (cardId: string) => {
    const card = allCards.find(card => card.cardId === cardId);
    if (card) {
      const isCardInTempDeck = tempDeck_J1.some(deckCard => deckCard.cardId === card.cardId);
      if (!isCardInTempDeck) {
        setTempDeck_J1([
          ...tempDeck_J1,
          {
            id: `draggable_monster_J1_${card.cardId}`,
            cardId: card.cardId,
            title: card.title,
            attack: card.attack,
            energie: card.energie
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
      const isCardInTempDeck = tempDeck_J2.some(deckCard => deckCard.cardId === card.cardId);
      if (!isCardInTempDeck) {
        setTempDeck_J2([
          ...tempDeck_J2,
          {
            id: `draggable_monster_J2_${card.cardId}`,
            cardId: card.cardId,
            title: card.title,
            attack: card.attack,
            energie: card.energie
          }
        ]);
      } else {
        setTempDeck_J2(tempDeck_J2.filter(deckCard => deckCard.cardId !== card.cardId));
      }
    }
  };

  const handleConfirm = () => {
    if (tempDeck_J1.length < 10 || tempDeck_J2.length < 10 || tempDeck_J1.length > 20 || tempDeck_J2.length > 20) {
      alert("Le deck doit contenir entre 10 et 20 cartes");
      return;
    }
    else {
      dispatch(setDeckJ1(tempDeck_J1));
      dispatch(setDeckJ2(tempDeck_J2));
    }
  };

  return (
    <>
      <div>Deck</div>
      <a href="/">Accueil</a>
      <div className="deck">
        <h2>Deck Joueur 1</h2>
        <div className="content">
          {allCards.map(card => {
            const isCardInTempDeck = tempDeck_J1.some(deckCard => deckCard.cardId === card.cardId);
            const isCardInDeck = deck_J1.some(deckCard => deckCard.cardId === card.cardId);
            const isCardNotInTempDeck = !isCardInTempDeck;
            const backgroundColor = isCardNotInTempDeck ? 'white' : isCardInDeck ? 'lightgreen' : isCardInTempDeck ? 'lightblue' : 'white';
            return (
              <div
                className="card_selection"
                key={card.cardId}
                onClick={() => handleCardClick_J1(card.cardId)}
                style={{ backgroundColor }}
              >
                id: {card.cardId}<br />
                content: {card.title}<br />
                attack: {card.attack}<br />
              </div>
            );
          })}
        </div>
      </div>
      <div className="deck">
        <h2>Deck Joueur 2</h2>
        <div className="content">
          {allCards.map(card => {
            const isCardInTempDeck = tempDeck_J2.some(deckCard => deckCard.cardId === card.cardId);
            const isCardInDeck = deck_J2.some(deckCard => deckCard.cardId === card.cardId);
            const isCardNotInTempDeck = !isCardInTempDeck;
            const backgroundColor = isCardNotInTempDeck ? 'white' : isCardInDeck ? 'lightgreen' : isCardInTempDeck ? 'lightblue' : 'white';
            return (
              <div
                className="card_selection"
                key={card.cardId}
                onClick={() => handleCardClick_J2(card.cardId)}
                style={{ backgroundColor }}
              >
                id: {card.cardId}<br />
                content: {card.title}<br />
                attack: {card.attack}<br />
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={handleConfirm}>Confirm</button>
    </>
  )
}
