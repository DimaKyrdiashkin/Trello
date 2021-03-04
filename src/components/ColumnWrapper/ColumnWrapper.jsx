import { useState, useEffect } from "react";
import Column from "../Column";
import Button from "../Button";
import Modal from "../Modal";

const ColumnWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columns, setColumns] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  const handleOpenModal = (card) => {
    setIsModalOpen((prevState) => !prevState);
    setCurrentCard(card);
  };

  const handleCloseModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const addColumn = () => {
    setColumns((prevState) => [
      ...prevState,
      {
        id: +new Date(),
        title: "Заголовок",
        cards: [],
      },
    ]);
  };

  const removeColumn = (id) => {
    setColumns((prevColumn) => prevColumn.filter((column) => column.id !== id));
  };

  const updateColumns = (card) => {
    setColumns((prevColumn) =>
      prevColumn.map((column) => {
        return column.id === card.columnId
          ? {
              ...column,
              cards: column.cards.map((thisCard) => {
                return thisCard.id === card.cardId
                  ? { id: card.cardId, ...card.card }
                  : thisCard;
              }),
            }
          : column;
      })
    );
  };

  const chengeColumnTitle = (title) => {
    setColumns((prevColumn) =>
      prevColumn.map((column) =>
        column.id === title.id ? { ...column, title: title.text } : column
      )
    );
  };

  const addCard = (newCadr) => {
    setColumns((prevColumn) =>
      prevColumn.map((column) => (column.id === newCadr.id ? newCadr : column))
    );
  };

  const removeCard = (card) => {
    setColumns((prevColumn) =>
      prevColumn
        .map((column) => {
          if (column.id === card.columnId) {
            return column.cards.length === 1
              ? null
              : {
                  ...column,
                  cards: column.cards.filter(
                    (filteredCard) => filteredCard.id !== card.cardId
                  ),
                };
          }
          return column;
        })
        .filter(Boolean)
    );
  };

  const updateCurrentCard = (card) => {
    setCurrentCard(card);
  };

  useEffect(() => {
    localStorage.getItem("Columns")
      ? setColumns(JSON.parse(localStorage.getItem("Columns")))
      : setColumns([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("Columns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    console.log(currentCard);
  }, [currentCard]);

  return (
    <>
      <div className="columnWrapper">
        {columns.length
          ? columns.map((column) => (
              <Column
                {...column}
                key={column.id}
                addCard={addCard}
                removeCard={removeCard}
                removeColumn={removeColumn}
                handleTitle={chengeColumnTitle}
                handleOpenModal={handleOpenModal}
              />
            ))
          : null}
      </div>
      <Button text="Добавить колонку" click={addColumn} addClass="addColumn" />
      {isModalOpen && (
        <Modal
          handleCloseModal={handleCloseModal}
          card={currentCard}
          updateCurrentCard={updateCurrentCard}
          changeCard={updateColumns}
        />
      )}
    </>
  );
};

export default ColumnWrapper;
