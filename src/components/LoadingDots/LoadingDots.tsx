import React from "react";
import { DotsWrapper, Dot } from "./LoadingDots.styled";

const LoadingDots = () => {
  return (
    <DotsWrapper>
      <Dot>.</Dot>
      <Dot>.</Dot>
      <Dot>.</Dot>
    </DotsWrapper>
  );
};

export default LoadingDots;
