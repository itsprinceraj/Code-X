import { useState } from "react";
import projectLogo from "../../assets/images/projectlogo.png";
import { MdOutlineFolderDelete } from "react-icons/md";
import { DeleteModal } from "./DeleteModal";
import { useNavigate } from "react-router-dom";

export const Card = ({ gridLayout, project, setProjectData }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const date = new Date(project.date).toLocaleDateString();
  const navigate = useNavigate();

  return (
    <>
      {/* image and title */}
      <div
        onClick={() => navigate(`/editor/${project?._id}`)}
        className=" flex gap-4 items-center"
      >
        <img className="w-[60px]" src={projectLogo} alt="" />
        <h3 className="text-[23px] w-[90%] line-clamp-1">{project.title}</h3>
      </div>
      {/*  date */}
      <div className="flex items-center justify-between">
        <p className="text-[16px] text-[gray]">Created at: {date}</p>
      </div>
      {/*  delete icon */}
      {gridLayout ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setDeleteModal(true);
          }}
          className=" relative -bottom-5 left-52"
        >
          <MdOutlineFolderDelete fill="red" size={30} />
        </div>
      ) : (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setDeleteModal(true);
          }}
          className=" w-[30px] cursor-pointer mr-4"
        >
          <MdOutlineFolderDelete fill="red" size={30} />
        </div>
      )}

      {/*  show delete modal */}

      {deleteModal ? (
        <DeleteModal
          setModal={setDeleteModal}
          project={project}
          setProjectData={setProjectData}
        />
      ) : (
        ""
      )}
    </>
  );
};
