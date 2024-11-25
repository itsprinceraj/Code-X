import errorImage from "../assets/images/notFound.svg";

export const NotFoundPage = () => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <img
        className="w-[600px] text-center"
        src={errorImage}
        alt={`You came to a wrong page :( `}
      />
    </div>
  );
};
