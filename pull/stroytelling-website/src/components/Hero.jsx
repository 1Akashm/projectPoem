import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
const Hero = ({id}) => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const baseVideoRef = useRef(null); // main background video
  const animVideoRef = useRef(null); // animating video
  const miniVideoRef = useRef(null); // small clickable preview

  // Load all videos from assets
  const videos = import.meta.glob("/src/assets/videos/*.mp4", { eager: true });
  const videoList = Object.values(videos).map((v) => v.default);
  const totalVideo = videoList.length;

  // Handle mini video click → play transition animation
  const handleVideoClick = () => {
    const nextIndex = (currentVideo + 1) % totalVideo;

    // Set animating video to next one
    animVideoRef.current.src = videoList[nextIndex];
    animVideoRef.current.currentTime = 0;
    animVideoRef.current.play();

    // Get mini video position to start animation from there
    const miniRect = miniVideoRef.current.getBoundingClientRect();
    const { x, y, width, height } = miniRect;

    // Make anim video visible and position it at mini video
    gsap.set(animVideoRef.current, {
      x,
      y,
      width,
      height,
      visibility: "visible",
      position: "fixed",
      borderRadius: "1rem",
      zIndex: 20,
    });

    // Animate to full screen
    gsap.to(animVideoRef.current, {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      duration: 1,
      ease: "power2.inOut",

      onComplete: () => {
        // Update main background video
        baseVideoRef.current.src = videoList[nextIndex];
        baseVideoRef.current.currentTime = 0;
        baseVideoRef.current.play();

        // Hide anim video after transition
        // Smoothly fade out the animVideo
        gsap.to(animVideoRef.current, {
          opacity: 0,
          scale: 1,
          duration: 0.3,
          ease: "power1.inOut",
          onComplete: () => {
            // Hide it and reset for next click
            gsap.set(animVideoRef.current, {
              visibility: "hidden",
              opacity: 1,
              scale: 1,
            });
          },
        });
        // Update current video index
        setCurrentVideo(nextIndex);
      },
    });
  };

  // Make sure anim video is always hidden initially
  useGSAP(() => {
    gsap.set(animVideoRef.current, { visibility: "hidden" });
  }, []);

  useEffect(() => {
    const frame = document.getElementById("video-frame");

    gsap.set(frame, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0% 0%",
    });

    gsap.to(frame, {
      clipPath: "polygon(14% 0%, 70% 0%, 90% 90%, 0% 95%)",
      borderRadius: "0 0 40% 30%",
      scrollTrigger: {
        trigger: frame,
        start: "top 0%",
        end: "bottom 10%",
        scrub: 1,
      },
      duration: 1,
      ease: "power2.inOut",
    });
  }, [currentVideo]);

  return (
    <>
      {isLoading ? (
        <div className="three-dot">
          <div className="three-dot-color"></div>
          <div className="three-dot-color"></div>
          <div className="three-dot-color"></div>
        </div>
      ) : (
        <div id={id} className="relative overflow-x-hidden">
          <div
            className="relative h-dvh w-screen overflow-x-hidden"
            id="video-frame"
          >
            {/* Fullscreen main (base) video */}
            <video
              ref={baseVideoRef}
              src={videoList[currentVideo]}
              className="absolute inset-0 w-full h-full object-cover object-center"
              autoPlay
              muted
              loop
            />

            {/* The animating video that scales up on click */}
            <video
              ref={animVideoRef}
              className="absolute w-64 h-64 object-cover object-center rounded-xl"
              autoPlay
              muted
              loop
              style={{ visibility: "hidden" }}
            />

            {/* The small clickable mini video (preview of next one) */}
            <div className="absolute flex justify-center items-center w-screen h-screen z-30">
              <video
                ref={miniVideoRef}
                src={videoList[(currentVideo + 1) % totalVideo]}
                className="w-48 h-48 object-cover rounded-xl shadow-lg scale-50 opacity-0 hover:opacity-100 hover:scale-120 transition-all duration-500 cursor-pointer"
                autoPlay
                muted
                loop
                onClick={handleVideoClick}
              />
            </div>

            {/* Optional overlay text */}
            <h1 className="font-zentry text-[120px] absolute bottom-5 right-20 text-blue-50 z-40 pointer-events-none">
              G<b>a</b>ming
            </h1>
          </div>
          <h1
            className="font-zentry text-[120px] absolute bottom-5 right-20 pointer-events-none"
            style={{ zIndex: "-10" }}
          >
            G<b>a</b>ming
          </h1>
        </div>
      )}
    </>
  );
};

export default Hero;
