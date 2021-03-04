import { useRef } from "react";

const ColumnEditTitle = ({ handleChange, titleName, isChange }) => {
  const titleNameText = useRef(titleName);

  const handleInputChange = (title) => {
    handleChange(title.target.value);
  };

  const checkInputFieldValue = (title) => {
    isChange();
    if (!title.target.value) {
      handleChange(titleNameText.current);
    }
  };

  const checkEnterText = (e) => {
    e.key === "Enter" && checkInputFieldValue(e);
  };

  return (
    <input
      className="titleChangeInput"
      type="text"
      value={titleName}
      onChange={handleInputChange}
      onBlur={checkInputFieldValue}
      onKeyDown={checkEnterText}
      autoFocus
    />
  );
};

export default ColumnEditTitle;
