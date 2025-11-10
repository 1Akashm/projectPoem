import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

const Navbar = () => {
  const navItems = ["Nexus", "Play", "About", "Contact"];
  const navRef = useRef(null);
  const { y } = useWindowScroll();

  const [lastPosition, setLastPosition] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const nav = navRef.current;

    // Scroll to top — transparent background
    if (y === 0) {
      nav.style.backgroundColor = "transparent";
    } else {
      nav.style.backgroundColor = "rgba(0, 0, 0, 1)";
    }

    // Hide navbar when scrolling down, show when scrolling up
    if (y > lastPosition && y > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setLastPosition(y);
  }, [y]);

    // function handleClick(section) {
    //   const el = document.getElementById(section.toLowerCase()); // IDs must match
    //   if (el) {
    //     const navbarHeight = navRef.current.offsetHeight || 80; // adjust if needed
    //     const top =
    //       el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    //     window.scrollTo({ top, behavior: "smooth" });
    //   }
    // }

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        ref={navRef}
        className="flex justify-between items-center mx-auto mt-6 w-[95%] h-16 rounded-lg px-6 transition-all duration-500"
      >
        {/* Logo */}
        <div className="w-16 h-16 flex justify-center items-center">
          <img
            src="/img/logo.png"
            alt="logo"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Navigation Items */}
        <div className="flex gap-8 items-center">
          {navItems.map((item, index) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={index}
              //   onClick={(e) => {
              //     e.preventDefault();
              //     handleClick(item);
              //   }}
              className="text-white uppercase tracking-wide hover:text-blue-75 transition-colors font-circular text-[1rem]"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
