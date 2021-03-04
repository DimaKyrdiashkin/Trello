const ViewCard = ({ edit, title, deadline, description }) => {
  return (
    <div className="modal_box">
      <h3 className="title">{title}</h3>
      <p className="deadline">Время закрытия задачи: {deadline}</p>
      <p className="description">
        Описание:
        <br /> {description}
      </p>
      <button className="button" onClick={edit}>
        Редактировать
      </button>
    </div>
  );
};

export default ViewCard;
