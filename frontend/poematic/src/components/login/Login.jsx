import React, { useEffect, useState } from "react";
import FadeInOut from "../animationLoadOnEachRoute/FadeInOut";
import { Link, useNavigate } from "react-router-dom";
import Input from "../signup/Input";
import { Eye, EyeOff, LockKeyhole, Mail, Loader } from "lucide-react";
import Circle from "../rootPath/Circle";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { signUpStore, storeLogin } from "../store/Store";

const Login = () => {
  const { cancelDebounced } = signUpStore();
  const {
    formData,
    setFormData,
    toggleShowPassword,
    resetFormData,
    showPassword,
  } = storeLogin();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(name, value);
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (formData.password == "" || formData.email == "") {
      toast.error("Fields cannot be empty");
      setLoading(false);
      return;
    }

    await submitLogin();
    navigate("/home");
    // Only navigate if login was successful
  }

  async function submitLogin() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        formData
      );
      // console.log("response", response);
      if (response.data.status === "Failed") {
        toast.error("Email or password doesn't match");
        return "failed";
      }
      localStorage.setItem("authToken",response.data.isAccountVerified);
      toast.success("Login successful");

      // cancelDebounced();
      resetFormData();
      return "success";
    } catch (error) {
      console.log("Error in logIn", error);
    }
  }

  return (
    <React.Fragment>
      <FadeInOut title="Login To">
        <Navbar />
        <div className="w-full h-dvh flex items-center justify-center">
          <div className="w-full max-w-3xl h-fit p-4 pb-1  bg-slate-100  backdrop-blur-sm backdrop-filter rounded-3xl shadow-xl drop-shadow-2xl relative">
            <h2 className="from-green-300 to-green-700 bg-gradient-to-r text-3xl font-bold text-center bg-clip-text text-transparent">
              Login To Vrsify
            </h2>
            <form method="post" onSubmit={handleLogin}>
              <Input
                icons={Mail}
                type="text"
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <div className="relative">
                <Input
                  icons={LockKeyhole}
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="text-green-300 absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative w-full flex justify-center">
                <button
                  type="submit"
                  className="overflow-clip pointer p-1 w-full max-w-2/4 bg-green-300 cursor-pointer border-transparent border-2 hover:border-green-200 hover:border-2 hover:bg-transparent transition duration-400 text-2xl  text-gray-900 font-semibold"
                >
                  {loading ? (
                    <Loader className="w-full animate-spin text-center" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
            <div className=" m-12 flex flex-col gap-5 justify-center items-center">
              <Link
                to="/forgotPassword"
                className="w-fit p-2 bg-slate-200 backdrop-blur-sm backdrop-filter rounded-2xl shadow-xl drop-shadow-xl hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-400 transition duration-300"
              >
                Forgot password
              </Link>
              <Link
                to="/signup"
                className="w-fit pointer-events-none flex gap-2"
              >
                <span className="w-fit">Don't Have account yet? </span>
                <span className="w-fit pointer-events-auto hover:text-green-900 hover:underline">
                  Signup
                </span>
              </Link>
            </div>
          </div>
        </div>

        <Circle width="5rem" height="5rem" top="30%" left="0%" delay="0" />
        <Circle width="8rem" height="8rem" top="20%" left="90%" delay="4" />
        <Circle width="12rem" height="12rem" top="60%" left="40%" delay="6" />
      </FadeInOut>
    </React.Fragment>
  );
};

export default Login;
