import React from "react";
import logo from "../assets/images/codexWhite.svg";
import { FaDownload } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const EditorNav = ({ projectName, tab, isHtml, isCss, isJs }) => {
  const downloadFile = () => {
    let codeToDownload;
    let fileExtension = tab; // 'html', 'css', or 'javascript'

    // Get the code from the Monaco editor based on the selected tab
    if (tab === "html") {
      codeToDownload = isHtml;
    } else if (tab === "css") {
      codeToDownload = isCss;
    } else if (tab === "javascript") {
      codeToDownload = isJs;
      fileExtension = "js";
    }

    // Create a Blob object with the code content
    const blob = new Blob([codeToDownload], {
      type: "text/plain;charset=utf-8",
    });

    // Create an anchor element and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `code.${fileExtension}`; // Download the code with the appropriate file extension
    link.click();
  };
  return (
    <>
      <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <Link to={"/"}>
            <img className="w-[150px] cursor-pointer" src={logo} alt="" />
          </Link>
        </div>
        <p>
          File / <span className="text-[gray]">{projectName}</span>
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
