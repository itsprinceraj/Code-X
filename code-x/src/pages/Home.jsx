import { useState } from "react";
import { NavBar } from "../components/common/NavBar";
import { GridView } from "../components/GridView";
import { ListView } from "../components/ListView";
import { Button } from "../components/common/Button";

export const Home = () => {
  const [isGridLayout, setIsGridLayout] = useState(false);
  return (
    <>
      <NavBar gridLayout={isGridLayout} setGridLayout={setIsGridLayout} />

      {/* add search field and add project button */}
      <div className="flex items-center justify-between px-[140px] my-[30px] m-auto">
        <h2 className="text-2xl">Hi, Prince 👋</h2>
        <div className="flex items-center gap-10">
          {/* Search Bar */}
          <div className="inputBox !w-[300px]">
            <input type="text" placeholder="Search...." />
          </div>

          {/*  */}
          <Button text={"+ Project"} style={"w-[180px] font-semibold"} />
        </div>
      </div>

      {/* Show Created Projects */}
      <div className="cards">
        {isGridLayout ? (
          <div className="grid px-[150px] ">
            <GridView gridLayout={isGridLayout} />
          </div>
        ) : (
          <div className="list px-[150px]">
            <ListView />
          </div>
        )}
      </div>
    </>
  );
};
