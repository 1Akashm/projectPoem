import React from "react";
import Circle from "./Circle";
import styled from "styled-components";
import Login from "../login/Login";
import { motion } from "framer-motion";
import FadeInOut from "../animationLoadOnEachRoute/FadeInOut";
import { repeat } from "lodash";

const FormContainer = () => {
  return (
    <React.Fragment>
      <div className="overflow-clip w-full">
        <FadeInOut>
          <FormPage
            as={motion.div}
            className="h-screen overflow-clip w-full flex justify-center items-center relative"
          >
            <Circle width="5rem" height="5rem" top="30%" left="0%" delay="0" />
            <Circle width="8rem" height="8rem" top="20%" left="90%" delay="4" />
            <Circle
              width="12rem"
              height="12rem"
              top="80%"
              left="40%"
              delay="6"
            />

            <div className="w-dvw h-dvh flex justify-center items-center">
              <div className="w-100% max-w-3xl">
                <h2 className="mb-6">
                  <span className="text-6xl font-bold bg-gradient-to-r  from-green-200 to-green-500 bg-clip-text text-transparent">
                    Welcome to Vrsify
                  </span>
                  <motion.sup
                    className="pl-0.5 text-[20px] italic font-light bg-gradient-to-r  from-pink-500 to-yellow-500 bg-clip-text text-transparent"
                    initial={{ opacity: 1, color: "text-black" }}
                    animate={{ opacity: 0.5, color: "text-green-900" }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    (feelings into words)
                  </motion.sup>
                </h2>
                <p>
                  a vibrant space where poetry lovers from all walks of life can
                  share their stories, emotions, and creativity through the art
                  of poetry. Whether you're an experienced poet or someone who
                  simply loves to express their feelings in words, our community
                  is open to everyone. Come, inspire and be inspired — one poem
                  at a time.
                </p>
              </div>
            </div>
          </FormPage>
        </FadeInOut>
      </div>
    </React.Fragment>
  );
};

export default FormContainer;
const FormPage = styled.div`
  /* background: var(--color-code-1); */
`;
