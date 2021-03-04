import { useForm } from "react-hook-form";
import { format } from "date-fns";

const EditForm = ({
  closeModal,
  editCard,
  updateCurrentCard,
  columnId,
  cardId,
}) => {
  const { register, handleSubmit } = useForm();

  const Submit = (e) => {
    const card = {
      card: { ...e, deadline: format(new Date(e.deadline), "dd.MM.yyyy") },
      columnId: columnId,
      cardId: cardId,
    };
    updateCurrentCard(card);
    editCard(card);
    closeModal();
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(Submit)}>
      <input
        name="title"
        className="field"
        placeholder="Заголовок карточки"
        ref={register({ required: true })}
      />
      <input
        name="deadline"
        className="field"
        type="date"
        placeholder="Дата окончания"
        ref={register({
          required: true,
        })}
      />
      <textarea
        name="description"
        className="field textarea"
        type="textarea"
        placeholder="Описание"
        rows="6"
        ref={register}
      />
      <input type="submit" className="button" value="Сохранить" />
    </form>
  );
};

export default EditForm;
