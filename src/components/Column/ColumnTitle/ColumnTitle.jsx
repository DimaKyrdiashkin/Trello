const ColumnTitle = ({ titleName, isEdit }) => {
  return (
    <h5 className="column_title" onClick={isEdit}>
      {titleName}
    </h5>
  );
};

export default ColumnTitle;
