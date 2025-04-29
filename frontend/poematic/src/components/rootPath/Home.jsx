import React from "react";
import FadeInOut from "../animationLoadOnEachRoute/FadeInOut";
import Navbar from "../navbar/Navbar";

const Home = () => {
  return (
    <FadeInOut>
      <Navbar />
      After login
    </FadeInOut>
  );
};

export default Home;
