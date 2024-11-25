import { useState } from "react";
import authImg from "../../assets/images/auth2.jpg";
import logoCodex from "../../assets/images/codexWhite.svg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Button } from "../common/Button";

export const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

          {/*  Login form */}
          <form onSubmit={submitHandler} className="w-full mt-[60px]">
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

            {/* submit button */}
            <Button text={"Login"} style={"w-full"} />
          </form>
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
