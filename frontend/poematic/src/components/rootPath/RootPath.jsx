import React from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// import { Wheel } from "@splidejs/splide-extension-wheel";
import "@splidejs/react-splide/css";
import "./root.css";
import RootParallex from "./RootParallex";

const images = [
  "https://cdn.pixabay.com/photo/2017/01/06/09/23/leave-1957302_1280.jpg",
  "https://wallpapers.com/images/hd/dark-academia-poetry-wb68kls2fglx6kz3.jpg",
  "https://wallpapers.com/images/hd/dark-academia-mood-board-492e9ky5anm9hfyx.jpg",
  "https://images3.alphacoders.com/195/195759.jpg",
];

const RootPath = () => {
  return (
    <React.Fragment>

      {/* <Splide
            options={{
              // type: "fade",
              // rewind: true,
              // interval: 3000,
              // wheelMinThreshold: 10,
              perPage: 1,
              autoplay: false,
              pauseOnHover: false,
              arrows: false,
              pagination: false,
              direction: "ttb",
              wheel: true,
              releaseWheel: true,
              waitForTransition: true,
              height: "100vh",
            }}
          >
            {images.map((item, index) => (
              <SplideSlide key={index}>
                <SlideBackground image={item} />
              </SplideSlide>
            ))}
          </Splide> */}
      <RootPage>
        {images.map((item, index) => (
          <img src={item} alt={index + 1} />
        ))}
      <RootParallex />
      </RootPage>

    </React.Fragment>
  );
};

export default RootPath;

const ScrollType = styled.div`
  height: 100dvh;
`;

const RootPage = styled.div`
  width: 100%;
  height: 100dvh;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  position: relative;
  overflow-y: scroll;
  background-color: red;

  & img {
    width: 100%;
    height: 100dvh;
    object-fit: cover;
    scroll-snap-align: center;
  }
`;


const SlideBackground = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100dvh;
  filter: grayscale(1);
`;
