const Button = ({ click, addClass, text }) => {
  return (
    <button
      className={addClass ? `button ${addClass}` : "button"}
      onClick={click}
    >
      {text}
    </button>
  );
};

export default Button;
