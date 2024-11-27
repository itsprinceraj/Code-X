import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { EditorNav } from "../components/EditorNav";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaExpand } from "react-icons/fa6";
import { htmlCode, cssCode, jsCode } from "../utils/utility";
import { Spinner } from "../components/common/Spinner";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { projectEndpoints } from "../services/apiEndpoints";

export const CodeEditor = ({ loading, setLoading }) => {
  //  project api url;
  const { GET_PROJ_URL, UPDATE_PROJ_URL } = projectEndpoints;

  const [tab, setTab] = useState("html");
  const [lightmode, setLightmode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHtml, setIsHtml] = useState(htmlCode);
  const [isCss, setIsCss] = useState(cssCode);
  const [isJs, setIsJs] = useState(jsCode);
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState("");

  // Run function to update the iframe
  const run = () => {
    const html = isHtml;
    const css = `<style>${isCss}</style>`;
    const js = `<script>${isJs}</script>`;
    const iframe = document.getElementById("iframe");

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  // Initial render
  useEffect(() => {
    run();
  }, [isHtml, isCss, isJs, loading]);

  //  fetch projet by user id and project id;
  const getProject = async () => {
    setLoading(true);
    try {
      //  get userId and project id;
      const response = await fetch(GET_PROJ_URL, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          projId: projectId,
        }),
      });

      //  convert response in json format;
      const result = await response.json();
      // console.log(result);
      if (!result.success) {
        toast.error("Project not found");
        throw Error("Something went wrong");
      } else {
        setIsHtml(result?.data?.htmlCode);
        setIsCss(result?.data?.cssCode);
        setIsJs(result?.data?.jsCode);
        setProjectName(result?.data?.title);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to Fetch Project");
    }
  };

  useEffect(() => {
    getProject();
  }, [projectId]);

  useEffect(() => {
    //  update project
    const updateProject = async (e) => {
      if (e.ctrlKey && e.key == "s") {
        e.preventDefault();
        setLoading(true);
        try {
          //  update the code;
          const res = await fetch(UPDATE_PROJ_URL, {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: localStorage.getItem("userId"),
              projId: projectId,
              htmlCode: isHtml,
              cssCode: isCss,
              jsCode: isJs,
            }),
          });

          //  convert response in json;
          const result = await res.json();
          if (!result.success) {
            toast.error("Cannot update code");
            throw Error("Something went wrong");
          } else {
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          toast.error("Failed to update code");
        }
      }
    };

    window.addEventListener("keydown", updateProject);

    //  cleanUp function'
    return () => window.removeEventListener("keydown", updateProject);
  }, [projectId, isHtml, isCss, isJs]);
  return (
    <>
      <EditorNav
        projectName={projectName}
        tab={tab}
        isHtml={isHtml}
        isCss={isCss}
        isJs={isJs}
      />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex h-screen">
          {/* Code Editor Section */}
          <div
            className={`flex flex-col transition-all duration-300 ${
              isExpanded ? "w-full" : "w-[60%]"
            }`}
          >
            {/* Tabs */}
            <div className="flex items-center justify-between bg-[#1A1919] h-[50px] px-[40px]">
              <div className="flex items-center gap-8">
                {["html", "css", "javascript"].map((type) => (
                  <div
                    key={type}
                    onClick={() => setTab(type)}
                    className={`tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[18px] ${
                      tab === type ? "bg-gray-700" : ""
                    }`}
                  >
                    {type.toUpperCase()}
                  </div>
                ))}
              </div>

              {/* Light/Dark mode and Expand button */}
              <div className="flex items-center gap-8">
                <div
                  className="text-[20px] cursor-pointer"
                  onClick={() => setLightmode(!lightmode)}
                >
                  {lightmode ? (
                    <MdDarkMode fill="white" size={23} />
                  ) : (
                    <MdLightMode fill="yellow" size={23} />
                  )}
                </div>
                <div
                  className="text-[20px] cursor-pointer"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <FaExpand size={20} fill="#3ca0de" />
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <Editor
              onChange={(value) => {
                if (tab === "html") setIsHtml(value || "");
                else if (tab === "css") setIsCss(value || "");
                else setIsJs(value || "");
              }}
              theme={lightmode ? "vs-light" : "vs-dark"}
              height="calc(100% - 50px)"
              language={tab}
              value={tab === "html" ? isHtml : tab === "css" ? isCss : isJs}
              options={{
                fontSize: 20,
                minimap: { enabled: true },
                lineNumbers: "on",
                wordWrap: "on",
              }}
              wrapperProps={{
                className: "mt-1",
              }}
            />
          </div>

          {/* Output Section */}
          <iframe
            className={`bg-white text-black overflow-hidden transition-all duration-300 ${
              isExpanded ? "w-[0%]" : "w-[40%]"
            }`}
            id="iframe"
            title="output"
          />
        </div>
      )}
    </>
  );
};
