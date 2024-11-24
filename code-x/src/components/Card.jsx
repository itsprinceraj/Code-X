import projectLogo from "../assets/images/projectlogo.png";
import { MdOutlineFolderDelete } from "react-icons/md";

export const Card = ({ gridLayout }) => {
  return (
    <>
      {/* image and title */}
      <div onClick={""} className=" flex gap-4 items-center">
        <img className="w-[60px]" src={projectLogo} alt="" />
        <h3 className="text-[23px] w-[90%] line-clamp-1">{"Project Title"}</h3>
      </div>
      {/*  date */}
      <div className="flex items-center justify-between">
        <p className="text-[16px] text-[gray]">Created at: 24/11/2024</p>
      </div>
      {/*  delete icon */}
      {gridLayout ? (
        <div onClick={""} className=" relative -bottom-12 left-52">
          <MdOutlineFolderDelete fill="red" size={30} />
        </div>
      ) : (
        <div onClick={""} className=" w-[30px] cursor-pointer mr-4">
          <MdOutlineFolderDelete fill="red" size={30} />
        </div>
      )}
    </>
  );
};
