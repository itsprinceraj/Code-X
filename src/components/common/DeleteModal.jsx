import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { projectEndpoints } from "../../services/apiEndpoints";

export const DeleteModal = ({ setModal, project, setProjectData }) => {
  const { DELETE_PROJ_URL } = projectEndpoints;
  //  delete project functio;
  const deleteProject = async (id) => {
    // console.log(id);
    try {
      //  make an api call to delete the project;
      const res = await fetch(DELETE_PROJ_URL, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          projId: id,
        }),
      });

      //  convert res into json format;
      const result = await res.json();
      // console.log(result);
      if (!result.success) {
        toast.error(result.message);
        throw Error("something went wrong");
      } else {
        setModal(false);
        setProjectData(result.data.updatedProject);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(58,56,56,0.07)] backdrop-blur-sm transition-all duration-100 flex justify-center items-center flex-col">
        <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
          <p className="text-xl">
            This Project will be Deleted. Want to proceed?
          </p>
          <div className="flex w-full mt-5 items-center gap-[10px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteProject(project._id);
              }}
              className="btn-delete"
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModal(false);
              }}
              className="p-[10px] rounded-lg bg-[#2a2929] text-white cursor-pointer min-w-[49%]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
