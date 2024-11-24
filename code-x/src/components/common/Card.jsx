import { useState } from "react";
import projectLogo from "../../assets/images/projectlogo.png";
import { MdOutlineFolderDelete } from "react-icons/md";
import { DeleteModal } from "./DeleteModal";

export const Card = ({ gridLayout }) => {
  const [deleteModal, setDeleteModal] = useState(false);
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
        <div
          onClick={() => setDeleteModal(true)}
          className=" relative -bottom-12 left-52"
        >
          <MdOutlineFolderDelete fill="red" size={30} />
        </div>
      ) : (
        <div
          onClick={() => setDeleteModal(true)}
          className=" w-[30px] cursor-pointer mr-4"
        >
          <MdOutlineFolderDelete fill="red" size={30} />
        </div>
      )}

      {/*  show delete modal */}

      {deleteModal ? <DeleteModal setModal={setDeleteModal} /> : ""}
    </>
  );
};
