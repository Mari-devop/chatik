import styled from "styled-components";

interface DisabledProps {
  disabled: boolean;
}

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 80px);
  scroll-snap-align: start;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;

  @media (max-width: 1100px) {
    padding-top: 70px;
  }

  @media (max-width: 800px) {
    margin-top: 320px;
  }

  @media (max-height: 667px) {
    margin-top: 270px;
  }

  @media (max-height: 701px) {
    margin-top: 250px;
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
  gap: 32px;

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0px;
  position: relative;
  padding-left: 0;
  padding-right: 0;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 900px) {
    padding-top: 90px;
    filter: blur(5px);
  }
`;

export const FirstBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 514px;
  height: 250px;
  background: linear-gradient(
    45deg,
    rgba(4, 4, 16, 1) 0%,
    rgba(15, 3, 6, 1) 100%
  );
  border-radius: 32px;
  border: none;
  padding: 24px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 320px;
  }

  @media (max-height: 667px) {
    height: 230px;
  }
`;

export const SecondBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 250px;
  background: linear-gradient(
    45deg,
    rgba(4, 4, 16, 1) 0%,
    rgba(15, 3, 6, 1) 100%
  );
  border-radius: 32px;
  border: none;
  padding: 24px;
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
`;

export const ThirdBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 625px;
  height: 280px;
  background: linear-gradient(
    45deg,
    rgba(4, 4, 16, 1) 0%,
    rgba(15, 3, 6, 1) 100%
  );
  border-radius: 32px;
  border: none;
  padding: 24px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  overflow: hidden;

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

  @media (max-width: 900px) {
    width: 70%;
  }

  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 43px;
  background: var(--white-color);
  border-radius: 16px;
  margin-bottom: 24px;
`;

export const Button = styled.button`
  width: 150px;
  height: 62px;
  border-radius: 120px;
  border: 1px solid var(--border-color-hover);
  background: transparent;
  color: var(--white-color);
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 21px;
  letter-spacing: 0.3em;
  margin-top: 14px;
  margin-bottom: 2px;
  cursor: pointer;
  z-index: 10;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 70%;
`;

export const IconCheck = styled.img`
  width: 16px;
  height: 16px;
`;

export const SubscribeButton = styled.button`
  background-image: ${({ 'aria-disabled': ariaDisabled }) =>
    ariaDisabled === "true"
      ? "linear-gradient(to right, #303030, #929292)"
      : "linear-gradient(to right, #6a00f4, #c900ff)"};
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 30px;
  cursor: ${({ 'aria-disabled': ariaDisabled }) =>
    ariaDisabled === "true" ? "not-allowed" : "pointer"};
  margin-top: 12px;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.3em;
  height: 62px;
  width: 119px;
  transition: opacity 0.3s ease;
  z-index: 10;

  &:hover {
    background: ${({ 'aria-disabled': ariaDisabled }) =>
      ariaDisabled === "true"
        ? "linear-gradient(to right, #303030, #929292)"
        : "var(--primary-gradient-hover)"};
  }
`;


export const CardInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  padding: 10px;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 900px) {
    width: 90%;
  }
`;

export const SaveButton = styled.button`
  background-image: linear-gradient(to right, #6a00f4, #c900ff);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  z-index: 9999;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  height: 46px;
  width: 100%;
  transition: opacity 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: var(--primary-gradient-hover);
  }
`;

export const CardDetails = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #2f2535;
  border-radius: 16px;
  height: 56px;
  background-color: #111;
  color: #fff;
  width: 529px;
  padding: 0 16px;

  @media (max-width: 900px) {
    width: 90%;
  }
`;

export const CheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 78px;
  border: none;
  border-radius: 50%;
  background-image: linear-gradient(to right, #6a00f4, #c900ff);

  @media (max-width: 470px) {
    width: 56px;
    height: 56px;
  }
`;

export const CheckBoxText = styled.p`
  font-family: "Avenir";
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.01em;
  margin: 12px 0;
  color: var(--white-color);

  @media (max-width: 470px) {
    font-size: 18px;
    line-height: 25px;
  }
`;

export const CheckIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export const AvenirTitle = styled.h2`
  font-family: "Avenir";
  font-weight: 800;
  font-size: 32px;
  line-height: 48px;
  letter-spacing: -0.01em;
  color: var(--white-color);
  padding: 0;
  margin: 0;

  @media (max-width: 1100px) {
    font-size: 24px;
    line-height: 25px;
  }
`;

export const AvenirH4Text = styled.h4`
  font-family: "Avenir";
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.01em;

  @media (max-width: 800px) {
    font-size: 18px;
    line-height: 25px;
  }
`;

export const TextMediumH4 = styled.h4`
  font-family: "Avenir";
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.01em;
  color: #ffffff80;
  margin: 0;
  padding: 0;

  @media (max-width: 800px) {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
`;

export const AvenirText = styled.p`
  font-family: "Avenir";
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.01em;
  color: #ffffff80;
  margin: 0;
  padding: 0;

  @media (max-width: 500px) {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin-left: 16px;
    margin-right: 16px;
  }
`;
