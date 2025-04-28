import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FadeInOut from "../animationLoadOnEachRoute/FadeInOut";

const Navbar = () => {
  return (
    <>
    <div className="w-vw flex ml-8 flex-col fixed mt-12 z-10  left-0">
        <Link to="/">
          <p className="text-2xl text-green-950 font-bold shadow-2xl text-shadow-black">
            Vrsify
          </p>
          <p className="text-[8px] italic">Feelings Into Words</p>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
