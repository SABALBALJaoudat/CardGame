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
            <div className='card_header'>
              <div className="id">
                {card.cardId}
              </div>
              <div className="title">
                {card.title}
              </div>
            </div>
            <img src={`src/assets/card_img/${card.image}`} alt={card.title} /><br />
            <div className='attack'>
              {card.attack}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
