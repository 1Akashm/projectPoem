import React from "react";
import { motion } from "framer-motion";

const FadeInOut = ({ children }) => {
  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOut;
