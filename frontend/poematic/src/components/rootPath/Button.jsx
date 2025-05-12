import React from "react";

const Button = ({ text, color, textColor }) => {
  return (
    <>
      <button className={`${color} rounded-4xl p-4 ${textColor} w-[148px]`}>
        {text}
      </button>
    </>
  );
};

export default Button;
