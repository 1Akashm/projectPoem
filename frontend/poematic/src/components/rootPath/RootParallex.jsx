import React from "react";
import "./root.css";
import styled from "styled-components";
const RootParallex = () => {
  return <Parallex></Parallex>;
};

export default RootParallex;

const Parallex = styled.div`
  height: 100dvh;
  width: 100%;
  background-color: yellow;
  scroll-snap-align: center;
`;
