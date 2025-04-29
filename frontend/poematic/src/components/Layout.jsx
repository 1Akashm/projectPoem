import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false); // Track visibility of Navbar
  const location = useLocation(); // track route changes

  const titleMap = {
    "/signup": "SignUp To",
    "/login": "Login To",
    "/verification": "Verify Your Account",
    "/": "Welcome To",
  };

  const title = titleMap[location.pathname] || "Loading";

  // Show navbar if we're on the "/" path
  useEffect(() => {
    if (location.pathname === "/") {
      setShowNavbar(true);
      const timer = setTimeout(() => {
        setShowNavbar(false);
      }, 2000); 
      return () => clearTimeout(timer); // Clean up timer on unmount
    } else {
      setShowNavbar(false); // Hide Navbar if not on "/"
    }
  }, [location.pathname]);

  // Show welcome message when location changes, but not on the "/" path
  useEffect(() => {
    if (location.pathname !== "/") {
      setShowWelcome(true); // Always show welcome when location changes
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 2000); // Show for 2 seconds

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Render Navbar with animation if on "/" path */}
        {showNavbar && location.pathname === "/" && (
          <motion.h2
            key="navbar"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold text-center absolute"
          >
            {title},
            <span className="text-6xl font-bold bg-gradient-to-r from-green-200 to-green-500 bg-clip-text text-transparent">
              Vrsify
            </span>
          </motion.h2>
        )}

        {/* Render Welcome message with animation but NOT when on the "/" path */}
        {showWelcome && location.pathname !== "/" && (
          <motion.h2
            key="welcome"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold text-center absolute"
          >
            {title},
            <span className="text-6xl font-bold bg-gradient-to-r from-green-200 to-green-500 bg-clip-text text-transparent">
              Vrsify
            </span>
          </motion.h2>
        )}
      </AnimatePresence>

      {/* Page content */}
      <Outlet />
    </div>
  );
};

export default Layout;
