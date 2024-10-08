import styled from "styled-components";

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: transparent;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  isolation: isolate;
`;

export const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoaderImage = styled.img`
  width: 350px;
  height: 350px;
  animation: rotate 2s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 170px;
    height: 162px;
  }
`;

export const LoaderText = styled.img`
  width: 497px;
  height: 29px;

  @media (max-width: 768px) {
    width: 300px;
    height: 18px;
  }
`;
