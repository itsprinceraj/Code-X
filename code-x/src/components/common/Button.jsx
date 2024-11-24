export const Button = ({ text, style, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`btn-grad mt-[20px] text-xl ${className}`}
    >
      {text}
    </button>
  );
};
