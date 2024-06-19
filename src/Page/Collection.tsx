import "../Css/Collection.css";
import { allCards } from "../Data/Cards"

export default function Collection() {
  return (
    <>
      <div>Collection</div>
      <a href="/">Acceuil</a>
      <div className="content">
        {allCards.map((card) =>
          <div className='card_detailed'>
            <div className='title'>
              id : {card.cardId}<br />
              content : {card.title}<br />
              attack : {card.attack}<br />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
