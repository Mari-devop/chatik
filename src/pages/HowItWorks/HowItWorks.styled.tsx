import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 650px;
  height: 600px;
  margin-top: 60px;
  background: linear-gradient(
    45deg,
    rgba(4, 4, 16, 1) 0%,
    rgba(15, 3, 6, 1) 100%
  );
  border-radius: 32px;
  border: none;
  padding: 48px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(45deg, #5833ef, #f82d98);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }

  @media (max-width: 719px) {
    width: 90%;
  }

  @media (max-width: 425px) {
    padding: 24px;
    margin-top: 0px;
    height: 100%;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 36px;

  @media (max-width: 680px) {
    margin-top: 14px;
  }
`;

export const AvenirH4Title = styled.h4`
  font-family: "Avenir";
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.01em;
  color: white;
  margin-top: 12px;
  margin-bottom: 12px;

  @media (max-width: 425px) {
    font-size: 14px;
    line-height: 21px;
  }
`;
