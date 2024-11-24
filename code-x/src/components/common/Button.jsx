export const Button = ({ text, style }) => {
  return (
    <button className={`btn-grad mt-[20px] text-xl ${style}`}>{text}</button>
  );
};
