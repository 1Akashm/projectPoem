import React, { useEffect, useRef } from "react";
import AnimateText from "./AnimateText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = ({id}) => {
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.set(imgRef.current, {
      width: "50%",
      borderRadius: "30px",
    });

    gsap.to(imgRef.current, {
      width: "100%",
      borderRadius: 0,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 50%",
        end: "bottom 100%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div id={id} className="mt-20 w-screen min-h-dvh flex flex-col gap-5 items-center">
      <p className="uppercase font-robert pt-5">Welcome to Zentry</p>
      <AnimateText title="Discover The World's largest shared adventure" />

      <div className="relative w-full h-full flex justify-center items-center">
        <img
          ref={imgRef}
          src="/img/about.webp"
          alt="about"
          className="h-dvh object-cover object-center"
          style={{ width: "50%" }}
        />
      </div>
    </div>
  );
};

export default About;
