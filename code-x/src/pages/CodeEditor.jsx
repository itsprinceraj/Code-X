import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { EditorNav } from "../components/EditorNav";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaExpand } from "react-icons/fa6";
import { htmlCode, cssCode, jsCode } from "../utils/utility";

export const CodeEditor = () => {
  const [tab, setTab] = useState("html");
  const [lightmode, setLightmode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHtml, setIsHtml] = useState(htmlCode);
  const [isCss, setIsCss] = useState(cssCode);
  const [isJs, setIsJs] = useState(jsCode);

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
  }, []);

  // Re-run whenever code changes
  useEffect(() => {
    run();
  }, [isHtml, isCss, isJs]);

  return (
    <>
      <EditorNav />

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
    </>
  );
};
