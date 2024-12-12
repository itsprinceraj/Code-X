import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Horizontal lockup - White.png";
import Avatar from "react-avatar";
import { toggle } from "../../utils/utility";
import { MdLightMode } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineChecklist, MdOutlineGridView } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const NavBar = ({ gridLayout, setGridLayout }) => {
  const navElements = ["Home", "About", "Contact", "Services"];
  // const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // handle outsideClick;
  //   const handleClickOutside = (event) => {
  //     if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
  //       setDropDown(false);
  //     }
  //   };

  //   //add event listener to the document
  //   document.addEventListener("click", handleClickOutside);

  //   // cleanup function
  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, []);

  // logount call
  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      toast.success("Logged Out");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Logout Failed");
    }
  };

  return (
    <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#181717] m-auto">
      <Link to={"/"}>
        <div className="logo">
          <img className="w-[150px] cursor-pointer" src={logo} alt="" />
        </div>
      </Link>

      {/* navlinks */}
      <div className="links flex items-center gap-10 text-xl ">
        {navElements.map((ele, idx) => (
          <Link
            key={idx}
            className="hover:text-yellow-400 transition-all duration-100"
          >
            {ele}
          </Link>
        ))}
        {/*  Avatar */}
        <Avatar
          name="Prince Raj"
          size="45"
          className=" rounded-full cursor-pointer"
          onClick={() => {
            toggle(".dropDownNavbar", "hidden");
          }}
        />
      </div>

      {/*  create a profile dropdown */}
      <div
        ref={dropDownRef}
        className="dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-xl bg-[#242425] w-[170px] h-[180px]"
      >
        <div className="py-[10px] border-b-[1px] border-b-[#f72929]">
          <h2 className="text-[22px]" style={{ lineHeight: 1 }}>
            {"Prince Raj"}
          </h2>
        </div>

        {/* Grid view and List view Switch button */}
        <div
          onClick={() => setGridLayout(!gridLayout)}
          className="flex items-center gap-2 mt-3 mb-2 cursor-pointer text-[20px]"
          style={{ fontStyle: "normal" }}
        >
          {gridLayout ? (
            <MdOutlineChecklist className="text-[22px]" fill="#03fc73" />
          ) : (
            <MdOutlineGridView className="text-[22px]" fill="#03fc73" />
          )}
          {gridLayout ? "List " : "Grid "}Layout
        </div>

        {/* Logout button */}
        <button onClick={logout} className="text-lg flex gap-2 items-center">
          <IoLogOut fill="#fc035e" size={22} /> Logout
        </button>
      </div>
    </div>
  );
};
