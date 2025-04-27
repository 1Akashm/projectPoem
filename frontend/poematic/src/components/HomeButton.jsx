import React from "react";
import { Link } from "react-router-dom";

const HomeButton = ({ link, width, value }) => {
  return (
    <>
      <Link
        to={link}
        className={`${width} py-2 px-4 rounded inline-block text-center text-green-700 bg-transparent border-2 border-gray-200 w-[100px] outline-0 inset-y-2 shadow-inner hover:bg-gradient-to-r hover:from-green-300 hover:to-green-600 transition duration-500`}
      >
        {value}
      </Link>
    </>
  );
};

export default HomeButton;
