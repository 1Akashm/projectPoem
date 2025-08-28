import React from "react";
import styled from "styled-components";
import "@splidejs/react-splide/css";
import "./root.css";
import RootParallex from "./RootParallex";
import Circle from "./Circle";

const RootPath = () => {
  return (
    <React.Fragment>
      <VersifyY>
        <Circle width="80px" height="80px" top="30%" left="10%" delay="0" />
        <Circle width="150px" height="150px" top="70%" left="50%" delay="3" />
        <Circle width="200px" height="200px" top="60%" left="90%" delay="10" />
        <RootPage>Welcome To Versify</RootPage>
        <RootParallex />
        <DummyBlock></DummyBlock>
      </VersifyY>
    </React.Fragment>
  );
};

export default RootPath;

const VersifyY = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
`;

const RootPage = styled.div`
  width: 100vw;
  height: 100dvh; /* Ensure the height fills the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  scroll-snap-align: start;
`;

const DummyBlock = styled.div`
  width: 100vw;
  height: 100dvh;
  background: lightblue;
  scroll-snap-align: start;
`;
