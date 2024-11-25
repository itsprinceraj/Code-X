import { useState } from "react";
import authImg from "../../assets/images/auth2.jpg";
import logoCodex from "../../assets/images/codexWhite.svg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";

export const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [showCnfPass, setShowCnfPass] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  //  form data change handler
  const changeHandler = (e) => {
    const { name, value } = e.target; // get name and value attribute of input tag from e.target
    setFormData((prevData) => {
      return { ...prevData, [name]: value }; // put the value to the associated name;
    });
  };

  //  form submit handler;
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px] m-auto">
        {/* left div */}
        <div className="left w-[35%] ">
          <img className="w-[150px]" src={logoCodex} alt="codexLogo" />

          {/*  signUp form */}
          <form onSubmit={submitHandler} className="w-full mt-[60px]">
            <div className="inputBox">
              <input
                required
                onChange={changeHandler}
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
              />
            </div>

            <div className="inputBox">
              <input
                required
                onChange={changeHandler}
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
              />
            </div>

            <div className="inputBox">
              <input
                required
                onChange={changeHandler}
                placeholder="Email"
                name="email"
                type="email"
                value={formData.email}
              />
            </div>

            <div className="inputBox flex justify-between items-center">
              <input
                type={showPass ? "text" : "password"}
                required
                onChange={changeHandler}
                placeholder="Password"
                name="password"
                value={formData.password}
              />

              <div onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <IoEyeOff size={22} fill={"#77cffc"} />
                ) : (
                  <IoEye size={22} fill={"red"} />
                )}
              </div>
            </div>

            <div className="inputBox flex justify-between items-center">
              <input
                type={showCnfPass ? "text" : "password"}
                required
                onChange={changeHandler}
                placeholder="Confirm Password"
                name="confirmPass"
                value={formData.confirmPass}
              />

              <div onClick={() => setShowCnfPass(!showCnfPass)}>
                {showCnfPass ? (
                  <IoEyeOff size={22} fill={"#77cffc"} />
                ) : (
                  <IoEye size={22} fill={"red"} />
                )}
              </div>
            </div>
          </form>

          <p className="text-[gray] text-lg text-right">
            Already have an account?{" "}
            <Link to="/login" className="text-[#00AEEF]">
              login
            </Link>
          </p>

          {/* submit button */}
          <Button text={"SignUp"} style={"w-full"} />
        </div>

        {/* right div */}
        <div className="right w-[55%] ">
          <img
            className="w-[60%] rounded-lg m-auto"
            src={authImg}
            alt="AuthImage"
          />
        </div>
      </div>
    </>
  );
};
