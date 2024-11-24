import React from "react";

export const DeleteModal = ({ setModal }) => {
  return (
    <>
      <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(58,56,56,0.07)] backdrop-blur-sm transition-all duration-100 flex justify-center items-center flex-col">
        <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
          <p className="text-xl">
            This Project will be Deleted. Want to proceed?
          </p>
          <div className="flex w-full mt-5 items-center gap-[10px]">
            <button className="btn-delete">Delete</button>
            <button
              onClick={() => {
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
