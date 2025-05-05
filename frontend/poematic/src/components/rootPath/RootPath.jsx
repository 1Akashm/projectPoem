import React from "react";
import Circle from "./Circle";
import styled from "styled-components";
import { motion } from "framer-motion";

const RootPath = () => {
  return (
    <React.Fragment>
      <div className="overflow-clip h-dvh w-dvw relative">
        <FormPage
          as={motion.div}
          className="overflow-clip h-full w-full flex justify-center items-center relative"
        >
          <div className="w-dvw flex justify-center items-center relative">
            <div className="w-vw absolute right-7 top-14 flex gap-5"></div>
            <div className="w-100% max-w-3xl">
              <h2 className="mb-6">
                <span className="text-6xl font-bold bg-gradient-to-r  from-green-200 to-green-500 bg-clip-text text-transparent">
                  Welcome to Vrsify
                </span>
                <motion.sup
                  className="pl-0.5 text-[30px] italic font-light bg-gradient-to-r  from-pink-500 to-green-900 bg-clip-text text-transparent"
                  initial={{
                    opacity: 1,
                    scale: 1.2,
                    // color: "text-black",
                  }}
                  animate={{
                    opacity: 0.4,
                    scale: 0.4,
                    // color: "text-green-900",
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  (feelings into words)
                </motion.sup>
              </h2>
              <div className="flex flex-col gap-9">
                <p className="text-2xl leading-8">
                  a vibrant space where poetry lovers from all walks of life can
                  share their stories, emotions, and creativity through the art
                  of poetry. Whether you're an experienced poet or someone who
                  simply loves to express their feelings in words, our community
                  is open to everyone. Come, inspire and be inspired — one poem
                  at a time.
                </p>

                <p className=" text-2xl leading-8">
                  "Everyone has a story — and some stories are meant to be sung
                  in verses. At <span className=" text-green-400">Vrsify</span>,
                  we welcome every heart that speaks in poetry. Share your
                  dreams, your struggles, your love, and your light. Your words
                  matter. Your voice belongs here."
                </p>
              </div>
            </div>
          </div>
        </FormPage>
        <Circle width="5rem" height="5rem" top="30%" left="0%" delay="0" />
        <Circle width="8rem" height="8rem" top="20%" left="90%" delay="4" />
        <Circle width="12rem" height="12rem" top="80%" left="40%" delay="6" />
      </div>
    </React.Fragment>
  );
};

export default RootPath;
const FormPage = styled.div`
  /* background: var(--color-code-1); */
`;
