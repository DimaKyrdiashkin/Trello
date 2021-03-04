export const getCardColor = (deadline) => {
  const difference =
    new Date(deadline.split(".").reverse().join()) - new Date();
  const differenceInDay = Math.ceil(difference / (24 * 60 * 60 * 1000));

  switch (differenceInDay) {
    case 0:
      return "orange";

    case 1:
      return "yellow";

    default:
      return differenceInDay < 0 ? "red" : "gray";
  }
};
