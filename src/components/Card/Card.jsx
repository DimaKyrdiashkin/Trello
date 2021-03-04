import { useState, useEffect } from "react";
import { getCardColor } from "../../utils/cardColor";

const Card = ({ info, openCardModal, removeCard, columnId, cardId }) => {
  const [cardColor, setCardColor] = useState("");
  const { title, deadline } = info;

  useEffect(() => {
    setCardColor(getCardColor(deadline));
  }, [deadline]);

  const getModal = (e) => {
    !e.target.classList.contains("deleted") &&
      openCardModal({
        card: info,
        columnId: columnId,
        cardId: cardId,
      });
  };

  const deleteCard = () => {
    removeCard({
      columnId: columnId,
      cardId: cardId,
    });
  };

  return (
    <div className={`card ${cardColor}`} onClick={getModal}>
      <div className="deleted" onClick={deleteCard} />
      <p className="card_title">{title}</p>
      <p className="card_date caption">Дата закрытия: {deadline}</p>
    </div>
  );
};

export default Card;
