import React from "react";
import FadeInOut from "../animationLoadOnEachRoute/FadeInOut";
import VerificationInput from "./VerificationInput";
import { Link, useNavigate } from "react-router-dom";
import Circle from "../rootPath/Circle";
import { VerificationStore } from "../store/Store";
import { toast } from "react-toastify";
import axios from "axios";

const Verification = () => {
  const { code, resetCode } = VerificationStore();
  const codeUpdate = code.join(""); //for 1,2,3,4,5,6 to 123456
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Prevent default submission

    if (code.some((digit) => digit === "")) {
      toast.error("Please enter all the digits of the verification code.");
      return;
    }
    
    verificationSubmit();
    navigate("/login");
    // console.log("code: ", code.join(""));
    resetCode(); // Reset the code after submission
  };
  
  
  async function verificationSubmit()
  {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/verifyEmail",
        { code: codeUpdate }, // wrap code in an object
        {
          headers: {
            "Content-Type": "application/json", // important!
          },
        }
      );
      console.log("Response verify", response.data);

      if(response.data.status === "Failed"){
        toast.error("Invalid Token");
        return "failed";
      }

      toast.success("Verification successful");
      return "success";
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Verification failed. Please try again.");
    }
  }

  return (
    <FadeInOut>
      <div className="flex w-full max-w-md flex-col border-green-600 border-2 p-10 outline-0 rounded-2xl">
        <h1 className="text-center font-bold text-4xl">Verify your account</h1>
        <div className="flex flex-col w-full gap-3 mt-10 focus:shadow-slate-400">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 items-center justify-center"
          >
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <VerificationInput key={index} index={index} inputLength={6} />
              ))}
            </div>
            <button
              type="submit"
              className="item-center cursor-pointer bg-gradient-to-r text-white font-semibold from-green-300 to-green-500 w-[50%] p-4 rounded-2xl"
            >
              Verify
            </button>
          </form>
        </div>

        <p className="text-slate-500 font-medium mt-10 text-center">
          Didn't get the code?{" "}
          <span>
            <Link
              href=""
              className="no-underline text-[16px] font-light text-green-600 hover:underline"
            >
              Resend
            </Link>
          </span>
        </p>
      </div>
      <Circle width="5rem" height="5rem" top="30%" left="0%" delay="0" />
      <Circle width="8rem" height="8rem" top="20%" left="90%" delay="4" />
      <Circle width="12rem" height="12rem" top="80%" left="40%" delay="6" />
    </FadeInOut>
  );
};

export default Verification;
