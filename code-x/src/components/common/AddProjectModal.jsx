import React, { useState } from "react";
import { Button } from "./Button";

export const AddProjectModal = ({ setModal }) => {
  const [title, setTitle] = useState("");

  const createProj = () => {};
  return (
    <>
      <div className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen backdrop-blur-sm flex items-center justify-center">
        <div className="createModel w-[25vw] h-[35vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px] flex flex-col justify-between">
          <p className="text-xl">Create a Project!</p>
          <div className="inputBox !bg-[#202020] mt-4">
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              type="text"
              placeholder="Project Title"
            />
          </div>

          {/* Modal Buttons */}
          <div className="flex items-center justify-between w-full">
            <Button onClick={createProj} text={"Create"}  />

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
