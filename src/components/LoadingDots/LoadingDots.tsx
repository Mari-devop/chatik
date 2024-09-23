import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animation for blinking dots
const blink = keyframes`
  0% {
    opacity: 1;
  }
  33% {
    opacity: 1;
  }
  66% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const DotsWrapper = styled.div`
  display: inline-block;
`;

const Dot = styled.span`
  opacity: 0;
  animation: ${blink} 1.4s infinite both;
  
  &:nth-child(1) {
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

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
