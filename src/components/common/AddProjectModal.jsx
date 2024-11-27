import React, { useState } from "react";
import { Button } from "./Button";
import toast from "react-hot-toast";
import { projectEndpoints } from "../../services/apiEndpoints";
import { useNavigate } from "react-router-dom";

export const AddProjectModal = ({ setModal, setLoading }) => {
  //  project api url;
  const { CREATE_PROJ_URL } = projectEndpoints;
  const [formData, setFormData] = useState({ title: "" });
  const navigate = useNavigate();

  //  change handler;
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const addProject = async () => {
    setLoading(true);
    try {
      //  make an api call to add a project;
      const response = await fetch(CREATE_PROJ_URL, {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          userId: localStorage.getItem("userId"),
        }),
      });

      // convert data into json format;
      const result = await response.json();
      // console.log(result);
      if (!result.success) {
        toast.error("Unable to add Project");
        throw Error("Something went wrong");
      } else {
        toast.success("Project Added");
        setFormData({ title: "" });
        setModal(false);
        navigate(`/editor/${result.data.projectData._id}`);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable add Project");
    }
  };

  return (
    <>
      <div className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen backdrop-blur-sm flex items-center justify-center">
        <div className="createModel w-[25vw] h-[35vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px] flex flex-col justify-between">
          <p className="text-xl">Create a Project!</p>
          <div className="inputBox !bg-[#202020] mt-4">
            <input
              onChange={changeHandler}
              name="title"
              value={formData.value}
              type="text"
              placeholder="Project Title"
            />
          </div>

          {/* Modal Buttons */}
          <div className="flex items-center justify-between w-full">
            <Button onClick={addProject} text={"Create"} />

            <button
              onClick={() => {
                setModal(false);
              }}
              className=" !bg-[#282626] rounded-[10px]  w-[30%] !px-[10px] !py-[15px] mt-6 text-[20px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
