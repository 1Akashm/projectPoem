import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const boxVariants = {
  initial: { y: "-100%" },
  animate: (i) => ({
    y: 0,
    transition: {
      duration: 0.2,
      delay: i * 0.2, // stagger in
      ease: "easeInOut",
    },
  }),
  exit: (i) => ({
    y: "100%",
    transition: {
      duration: 0.2,
      delay: i * 0.2, // stagger out
      ease: "easeInOut",
    },
  }),
};

const Layout = ({ children }) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShowOverlay(true);
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 1500); // Enough time for both entry and exit stagger
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <div className="flex fixed top-0 left-0 w-full h-full z-50 pointer-events-none">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={boxVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-green-300 h-full"
                style={{ width: `${100 / 6}%` }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      {!showOverlay && <div>{children}</div>}
    </>
  );
};

export default Layout;
