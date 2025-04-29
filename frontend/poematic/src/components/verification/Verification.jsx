import React, { useState } from "react";
import FadeInOut from "../animationLoadOnEachRoute/FadeInOut";
import VerificationInput from "./VerificationInput";
import { Link } from "react-router-dom";
import Circle from "../rootPath/Circle";

const Verification = () => {
  const [code, setCode] = useState(Array(6).fill(""));

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Prevent default submission
    // code.join(""); for 1,2,3,4,5,6 to 123456

    if (code.some((digit) => digit === "")) {
      alert("Please enter all the digits of the verification code.");
      return;
    }

    setCode(Array(6).fill("")); // Reset the code after submission
  };

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
                <VerificationInput
                  key={index}
                  index={index}
                  inputLength={6}
                  code={code}
                  setCode={setCode}
                  handleSubmit={handleSubmit}
                />
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
