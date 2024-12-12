import { useState } from "react";
import authImg from "../../assets/images/auth2.jpg";
import logoCodex from "../../assets/images/codexWhite.svg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { authEndpoints } from "../../services/apiEndpoints";
import toast from "react-hot-toast";

export const Signup = () => {
  //  get url;
  const { SIGNUP_URL } = authEndpoints;
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showCnfPass, setShowCnfPass] = useState(false);
  // managing state using react forms;
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
  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPass) {
      console.log("pass not matched");
      return toast.error("Password do not match");
    }

    //  make an api call;
    try {
      const response = await fetch(SIGNUP_URL, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          userName: formData.username.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password.trim(),
        }),
      });

      // convert response into json format;
      const result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        throw Error("Something went wrong");
      } else {
        toast.success(result.message);
        navigate("/login");
      }
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
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

            <p className="text-[gray] text-lg text-right">
              Already have an account?{" "}
              <Link to="/login" className="text-[#00AEEF]">
                login
              </Link>
            </p>

            {/* submit button */}
            <button className={`btn-grad mt-[20px] text-xl w-full`}>
              Sign Up
            </button>
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
