import { useDispatch, useSelector } from "react-redux";
import "../Css/Collection.css";
import { allCards } from "../Data/Cards";
import { RootState } from "@reduxjs/toolkit/query";
import { addCardToDeckJ1, removeCardFromDeckJ1 } from "../Store/decksSlice";

export default function Deck() {
  const dispatch = useDispatch();
  const deck_J1: Card[] = useSelector((state: RootState) => state.decks.deck_J1);
  const deck_J2: Card[] = useSelector((state: RootState) => state.decks.deck_J2);

  const handleCardClick = (cardId: string) => {
    const card = allCards.find(card => card.cardId === cardId);
    console.log(cardId);
    console.log(card);

    if (card) {
      const isCardInDeck = deck_J1.some(deckCard => deckCard.cardId === card.cardId);
      console.log(isCardInDeck);

      if (!isCardInDeck) {
        dispatch(addCardToDeckJ1({
          id: `draggable_monster_J1_${deck_J1.length + 1}`,
          cardId: card.cardId,
          title: card.title,
          attack: card.attack
        }));
      } else {
        dispatch(removeCardFromDeckJ1(card.cardId));
      }
    }
  };

  return (
    <>
      <div>Deck</div>
      <a href="/">Acceuil</a>
      <div className="content">
        {allCards.map((card) => {
          const isCardInDeck = deck_J1.some((deckCard: { cardId: string; }) => deckCard.cardId === card.cardId);
          return (
            <div
              key={card.cardId}
              onClick={() => handleCardClick(card.cardId)}
              style={{ backgroundColor: isCardInDeck ? 'lightgreen' : 'white' }}
            >
              id : {card.cardId}<br />
              content : {card.title}<br />
              attack : {card.attack}<br />
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
      </div>
    </>
  )
}
