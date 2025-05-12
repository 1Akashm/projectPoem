import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeButton from "./HomeButton";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="flex w-[60%] justify-between mt-8  mx-auto z-10 overflow-clip fixed p-2 bg-white/5 backdrop-blur-lg rounded-lg inset-x-0">
        <div className="flex flex-col ">
          <Link to="/">
            <p className="text-2xl text-green-950 font-bold shadow-2xl text-shadow-black">
              Vrsify
            </p>
            <p className="text-[8px] italic">Feelings Into Words</p>
          </Link>
        </div>
        {!isLogged ? (
          <div className="relative overflow-clip flex gap-5">
            <HomeButton link="/login" width="100%" value="Login" />
            <HomeButton link="/signup" width="100%" value="Signup" />
          </div>
        ) : (
          <button>Logout</button>
        )}
      </div>
    </>
  );
};

export default Navbar;
