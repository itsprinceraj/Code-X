import { Card } from "./Card";

export const ListView = () => {
  return (
    <>
      <div className="listCard mb-2 w-[full] flex items-center justify-between p-[10px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020] ">
        <Card />
      </div>
    </>
  );
};
