import React from "react";
import logo from "../assets/images/codexWhite.svg";
import { FaDownload } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const EditorNav = () => {
  const downloadFile = () => {};
  return (
    <>
      <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <Link to={"/"}>
            <img className="w-[150px] cursor-pointer" src={logo} alt="" />
          </Link>
        </div>
        <p>
          File / <span className="text-[gray]">My first project</span>
        </p>
        <div
          onClick={downloadFile}
          className="p-[8px] btn  rounded-[5px] cursor-pointer "
        >
          <FaDownload size={22} fill="#3cde47" />
        </div>
      </div>
    </>
  );
};
