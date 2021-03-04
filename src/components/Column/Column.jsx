import { useState, useEffect } from "react";
import { format } from "date-fns";
import ColumnTitle from "./ColumnTitle";
import ColumnEditTitle from "./ColumnTitle/ColumnEditTitle";
import Card from "../Card";
import Button from "../Button";

const Column = ({
  id,
  title,
  cards,
  addCard,
  removeCard,
  removeColumn,
  handleTitle,
  handleOpenModal,
}) => {
  const [columnTitleName, setColumnTitleName] = useState(title);
  const [viewEditColumnTitleName, setViewEditColumnTitleName] = useState(false);

  const handleEditColumnTitle = (title) => {
    setColumnTitleName(title);
  };

  const handleViewEditColumnTitleName = () => {
    setViewEditColumnTitleName((prevState) => !prevState);
  };

  const addNewCard = () => {
    addCard({
      id: id,
      title: columnTitleName,
      cards: [
        ...cards,
        {
          id: +new Date(),
          title: "Название карточки",
          description: "Описание карточки",
          deadline: format(new Date(), "dd.MM.yyyy"),
        },
      ],
    });
  };

  const deleteColumn = () => {
    removeColumn(id);
  };

  useEffect(() => {
    handleTitle({ id: id, text: columnTitleName });
  }, [columnTitleName]);

  return (
    <div className="column">
      {viewEditColumnTitleName ? (
        <ColumnEditTitle
          titleName={columnTitleName}
          handleChange={handleEditColumnTitle}
          isChange={handleViewEditColumnTitleName}
        />
      ) : (
        <ColumnTitle
          titleName={columnTitleName}
          isEdit={handleViewEditColumnTitleName}
        />
      )}
      {cards.length
        ? cards.map((card, index) => (
            <Card
              info={card}
              key={index}
              columnId={id}
              cardId={card.id}
              removeCard={removeCard}
              openCardModal={handleOpenModal}
            />
          ))
        : null}
      <div className="button_box">
        <Button click={addNewCard} text="Добавить" />
        <Button click={deleteColumn} text="Удалить колонку" />
      </div>
    </div>
  );
};

export default Column;
