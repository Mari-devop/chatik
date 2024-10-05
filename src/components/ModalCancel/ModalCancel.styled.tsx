import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(20px);
  isolation: isolate;
  z-index: 1000;
`;

export const Title = styled.h2`
  font-family: "Arquitecta";
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  letter-spacing: 0.1em;
  color: #ffffff;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background: transparent;
  cursor: pointer;
  border-radius: 120px;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  color: #ffffff;
  width: 157px;
  height: 48px;
  position: relative;
  gap: 5px;
  z-index: 1;
  background-clip: padding-box;
  border: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(45deg, #5833ef, #f82d98);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    z-index: -1;
  }
  &:hover::before {
    background: linear-gradient(45deg, #f82d98, #5833ef);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @media (max-width: 900px) {
    width: 75px;
    height: 32px;
    padding: 10px 16px;
    font-size: 10px;
    margin-right: 46px;
  }

  @media (max-width: 500px) {
    top: -25px;
    width: auto;
    height: auto;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 34px;
  height: 34px;
  cursor: pointer;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  pointer-events: auto;

  &:hover {
    border-image: linear-gradient(90deg, #f82d98, #5833ef) 1;
  }

  @media (max-width: 900px) {
    right: 24px;
    left: auto;
  }

  @media (max-width: 600px) {
    top: 15px;
    right: 16px;
    width: 36px;
    height: 36px;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 30%;
    height: 1px;
    background-color: var(--white-color);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover::before,
  &:hover::after {
    background-color: unset;
    background-image: linear-gradient(90deg, #f82d98, #5833ef);
  }
`;
