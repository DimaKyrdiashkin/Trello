import { useState } from "react";
import EditForm from "./EditForm";
import ViewCard from "./ViewCard";

const Modal = ({ handleCloseModal, updateCurrentCard, card, changeCard }) => {
  const [isEdit, setIsEdit] = useState(false);

  const openEditCard = () => {
    setIsEdit((prevState) => !prevState);
  };

  const closeModal = (e) => {
    e.currentTarget === e.target && handleCloseModal();
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="container">
        {isEdit ? (
          <EditForm
            closeModal={openEditCard}
            editCard={changeCard}
            updateCurrentCard={updateCurrentCard}
            columnId={card.columnId}
            cardId={card.cardId}
          />
        ) : (
          <ViewCard edit={openEditCard} {...card.card} />
        )}
      </div>
    </div>
  );
};

export default Modal;
