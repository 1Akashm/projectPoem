import React, { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { User, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";
import Input from "./Input";
import FadeInOut from "../animationLoadOnEachRoute/FadeInOut";
import { PasswordMeter, PasswordCriteria } from "../passwordMeter";
import { toast } from "react-toastify";
import Circle from "../rootPath/Circle";
import Navbar from "../navbar/Navbar";
import { signUpStore } from "../store/Store";

const Signup = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const [showPassword, setEyePassword] = useState(false);

  // function togglePasswordVisibility() {
  //   setEyePassword((prev) => !prev);
  // }

  // const debounceFormInput = useMemo(
  //   () =>
  //     debounce((updated) => {
  //       updated;
  //     }, 300),
  //   []
  // );

  // useEffect(() => {
  //   return () => debounceFormInput.cancel(); // clean up debounce
  // }, [debounceFormInput]);

  // function handleChange(e) {
  //   const { name, value } = e.target;

  //   setFormData((prev) => {
  //     const updated = { ...prev, [name]: value };
  //     debounceFormInput(updated);
  //     return updated;
  //   });
  // }

  // function handleForm(e) {
  //   e.preventDefault(); // prevent default submit
  //   // Validate password criteria
  //   const password = formData.password;

  //   // First, check if all fields are filled
  //   if (!formData.name || !formData.email || !formData.password) {
  //     toast.error("All fields are required");
  //     return; // 🚫 STOP submit
  //   }

  //   const isValidPassword =
  //     password.length >= 6 &&
  //     /[A-Z]/.test(password) &&
  //     /[a-z]/.test(password) &&
  //     /\d/.test(password) &&
  //     /[^A-Za-z0-9]/.test(password);

  //   if (!isValidPassword) {
  //     toast.error("password criteria not met.");
  //     return; // 🚫 STOP submit
  //   }
  //   submitFormData();
  // }

  // async function submitFormData() {
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/v1/signup", {
  //       name: formData.name,
  //       email: formData.email,
  //       password: formData.password,
  //     });

  //     console.log("data:", response.data);

  //     setFormData({
  //       name: "",
  //       email: "",
  //       password: "",
  //     });

  //     toast.success("Signup successful");
  //   } catch (error) {
  //     console.log("error:", error.response?.data || error.message);
  //     toast.error(error.response?.data?.message || "Something went wrong");
  //   }
  // }

  const navigate = useNavigate();
  const {
    formData,
    showPassword,
    setFormData,
    toggleShowPassword,
    resetForm,
    cancelDebounced,
  } = signUpStore();

  useEffect(() => {
    cancelDebounced();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(name, value);
  }

  function handleForm(e) {
    e.preventDefault(); // prevent default submit
    // Validate password criteria
    const password = formData.password;

    // First, check if all fields are filled
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return; // 🚫 STOP submit
    }

    const isValidPassword =
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    if (!isValidPassword) {
      toast.error("password criteria not met.");
      return; // 🚫 STOP submit
    }
    submitFormData();
    toast.success("Verify your account");
    navigate("/verification");
  }

  async function submitFormData() {
    try {
      await axios.post("http://localhost:5000/api/v1/signup", formData);
      resetForm();
      cancelDebounced();
      toast.success("Signup successful");
    } catch (error) {
      console.log("error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <React.Fragment>
      <FadeInOut className="w-full">
        <Navbar />
        <SignUpElement className="w-full flex justify-center items-center relative overflow-clip">
          <div className="p-8 pb-1 w-full bg-slate-100 max-w-3xl backdrop-blur-sm backdrop-filter rounded-3xl shadow-xl drop-shadow-2xl relative">
            <h2 className="from-green-300 to-green-700 bg-gradient-to-r text-3xl font-bold text-center bg-clip-text text-transparent">
              Create Account
            </h2>

            <form method="post" onSubmit={handleForm}>
              <Input
                icons={User}
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

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

              <PasswordMeter password={formData.password} />
              <PasswordCriteria password={formData.password} />

              <div className="relative w-full flex justify-center">
                <button
                  type="submit"
                  className="pointer p-1 w-full max-w-2/4 bg-green-300 cursor-pointer border-transparent border-2 hover:border-green-200 hover:border-2 hover:bg-transparent transition duration-400 text-2xl text-gray-900 font-semibold"
                >
                  sign up
                </button>
              </div>
            </form>

            <div className="pl-4  text-green-950 flex gap-2 w-full mt-8 justify-center">
              <p className="text-2xl font-light">Already have an account ?</p>
              <Link
                to="/login"
                className="no-underline flex items-center hover:text-green-900 hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
          <Circle width="5rem" height="5rem" top="30%" left="0%" delay="0" />
          <Circle width="8rem" height="8rem" top="20%" left="90%" delay="4" />
          <Circle width="12rem" height="12rem" top="80%" left="40%" delay="6" />
        </SignUpElement>
      </FadeInOut>
    </React.Fragment>
  );
};

export default Signup;

const SignUpElement = styled.div`
  height: 100vh;
  /* background-color: var(--color-code-4); */
`;
