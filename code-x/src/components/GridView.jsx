import { Card } from "./Card";

export const GridView = ({gridLayout}) => {
  return (
    <>
      <div className="gridCard bg-[#141414] w-[270px] p-[10px] h-[180px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-lg shadow-black/50">
        <Card gridLayout={gridLayout}/>
      </div>
    </>
  );
};
