import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const RootParallex = () => {
  return (
    <Parallex>
      <div className="title">
        <h2>Where Words Breathe</h2>
        <p>A space for poets to write, share and grow together</p>
      </div>
      <Link
        to="/login"
        className="bg-gray-300 text-gray-900 w-36 h-12 rounded-4xl flex items-center justify-center"
      >
        Join Now
      </Link>
      <Button
        text="Explore Poems"
        color="bg-gray-700"
        textColor="text-gray-100"
      />
    </Parallex>
  );
};

export default RootParallex;

const Parallex = styled.div`
  height: 100dvh;
  width: 100vw; /* Ensures it's aligned with the other slides */
  display: flex;
  justify-content: center;
  align-items: center; /* Optional: Aligns "Hi" to the center of the container */
  scroll-snap-align: start;
`;
