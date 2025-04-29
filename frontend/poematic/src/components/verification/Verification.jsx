import React from "react";
import FadeInOut from "../animationLoadOnEachRoute/FadeInOut";
import VerificationInput from "./VerificationInput";

const Verification = () => {
  return (
    <FadeInOut>
      <div className="flex w-full max-w-md flex-col border-2 p-4 outline-0 rounded-2xl">
        <h1>Verify your account</h1>
        <div className="flex w-full gap-3">
          {Array.from({length:6}).map((_,index)=>(
            <VerificationInput key={index}/>
          ))}
        </div>
      </div>
    </FadeInOut>
  );
};

export default Verification;
