import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"; // import useLocation
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const location = useLocation(); // track route changes

  const titleMap = {
    "/signup": "SignUp To",
    "/login": "Login To",
    "/": "Welcome To",
  };

  const title = titleMap[location.pathname] || "Loading";

  useEffect(() => {
    setShowWelcome(true); // Always show welcome when location changes
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000); // show for 2 seconds

    return () => clearTimeout(timer);
  }, [location]); // re-run this effect whenever route changes

  return (
    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {showWelcome && (
          <motion.h2
            key={location.pathname} // IMPORTANT for AnimatePresence to detect change
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold text-center absolute"
          >
            {title}, Poematic
          </motion.h2>
        )}
      </AnimatePresence>

      {/* Page content */}
      <Outlet />
    </div>
  );
};

export default Layout;
