import { useNavigate } from "react-router-dom";
import { Card } from "../components/common/Card";

export const GridView = ({ gridLayout, project }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/editor/${project?._id}`)}
        className="gridCard bg-[#141414] w-[270px] p-[10px] h-[180px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-lg shadow-black/50"
      >
        <Card gridLayout={gridLayout} project={project} />
      </div>
    </>
  );
};
