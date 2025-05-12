import React from "react";
import styled from "styled-components";
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
      <RootPage>
        {images.map((item, index) => (
          <img key={index} src={item} alt={index + 1} />
        ))}
        
        
        <SlideArrow className="slide">
          <span></span>
        </SlideArrow>
      </RootPage>
        <RootParallex />
    </React.Fragment>
  );
};

export default RootPath;

const RootPage = styled.div`
  width: 100vw;
  height: 100dvh;  /* Ensure the height fills the viewport */
  display: flex;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  position: relative;
  overflow-x: scroll;

  & img {
    min-width: 100%;
    height: 100dvh;
    opacity: 1;
    transition: opacity 0.5s ease;
    object-fit: cover;
    scroll-snap-align: center;
  }
`;

const SlideArrow = styled.div`
  display: flex;
  gap: 0px;
  position: absolute;
  width: 95%;
  height: fit-content;
  bottom: 20px;
  left: 0px;
  justify-content: flex-end;

  span::before {
    content: ">>>";
    font-size: 40px;
  }

  & span {
    color: white;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
  }
`;
