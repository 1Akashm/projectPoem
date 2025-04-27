import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Circle = ({ width, height, top, left, delay }) => {
  return (
    <StyledCircle
      as={motion.div}
      className="absolute rounded-full -z-10"
      style={{
        width: width,
        height: height,
        top: top,
        left: left,
      }}
      animate={{
        y: [0, 20, 100, -10, -50, 50, 0],
        x: [0, 20, -100, 100, -20, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

export default Circle;

const StyledCircle = styled.div`
  background-color: var(--color-code-3);
  opacity: 0.9;
  filter: drop-shadow(2px 2px 30px var(--color-code-5)) blur(2px);
`;
