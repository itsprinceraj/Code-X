import { Link } from "react-router-dom";
import logo from "../../assets/images/Horizontal lockup - White.png";
import Avatar from "react-avatar";
import { toggle } from "../../utils/utility";
import { MdLightMode } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineChecklist, MdOutlineGridView } from "react-icons/md";

export const NavBar = ({ gridLayout, setGridLayout }) => {
  return (
    <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#181717] m-auto">
      <Link to={"/"}>
        <div className="logo">
          <img className="w-[150px] cursor-pointer" src={logo} alt="" />
        </div>
      </Link>

      {/* navlinks */}
      <div className="links flex items-center gap-10 text-xl ">
        <Link className="hover:text-yellow-400 transition-all duration-100">
          Home
        </Link>
        <Link className="hover:text-yellow-400 transition-all duration-100">
          About
        </Link>
        <Link className="hover:text-yellow-400 transition-all duration-100">
          Contact
        </Link>
        <Link className="hover:text-yellow-400 transition-all duration-100">
          Services
        </Link>

        {/*  Avatar */}
        <Avatar
          name="Prince Raj"
          size="45"
          className=" rounded-full cursor-pointer"
          onClick={() => toggle(".dropDownNavbar", "hidden")}
        />
      </div>

      {/*  create a profile dropdown */}
      <div className="dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-xl bg-[#031233] w-[150px] h-[160px]">
        <div className="py-[10px] border-b-[1px] border-b-[#f72929]">
          <h2 className="text-[17px]" style={{ lineHeight: 1 }}>
            {"Prince Raj"}
          </h2>
        </div>

        {/*  Light and Dark mode Toggle button */}
        <div
          className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
          style={{ fontStyle: "normal" }}
        >
          <MdLightMode fill="#fcd703" className="text-[20px]" /> Light mode
        </div>

        {/* Grid view and List view Switch button */}
        <div
          onClick={() => setGridLayout(!gridLayout)}
          className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
          style={{ fontStyle: "normal" }}
        >
          {gridLayout ? (
            <MdOutlineChecklist className="text-[20px]" fill="#03fc73" />
          ) : (
            <MdOutlineGridView className="text-[20px]" fill="#03fc73" />
          )}
          {gridLayout ? "List " : "Grid "}Layout
        </div>

        {/* Logout button */}
        <button className="text-lg flex gap-2 items-center">
          <IoLogOut fill="#fc035e" /> Logout
        </button>
      </div>
    </div>
  );
};
