import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const words = containerRef.current.querySelectorAll(".word");

    gsap.set(words, { y: 100, opacity: 0 });

    gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div className="relative overflow-hidden w-full flex justify-center">
      <h1
        ref={containerRef}
        className="text-[6rem] font-bold font-zentry uppercase w-1/2 flex flex-wrap justify-center items-center gap-x-5"
      >
        {title.split(" ").map((word, index) => (
          <span key={index} className="word text-black inline-block">
            {word}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default AnimatedTitle;
