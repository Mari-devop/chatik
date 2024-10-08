import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  position: relative;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(
    45deg,
    rgba(4, 4, 16, 1) 0%,
    rgba(15, 3, 6, 1) 100%
  );
  width: 721px;
  height: 640px;
  box-sizing: border-box;
  position: relative;
  border-radius: 32px;
  padding: 48px;
  margin-top: auto;
  margin-bottom: auto;
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

  @media (max-width: 767px) {
    width: calc(100% - 48px);
    margin-left: 16px;
    margin-right: 16px;
    padding: 32px;
  }

  @media (max-height: 740px) {
    height: 530px;
  }
  @media (max-height: 667px) {
    height: 570px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  width: 100%;
  position: relative;

  label {
    font-family: "Avenir";
    font-weight: 800;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -1%;
    color: var(--white-color);
    margin-top: 0;
    margin-bottom: 8px;

    @media (max-height: 740px) {
      font-size: 14px;
      line-height: 21px;
    }
    @media (max-width: 500px) {
      font-size: 14px;
      line-height: 21px;
    }
  }

  input {
    max-width: 100%;
    height: 27px;
    background-color: #000000;
    border-radius: 16px;
    border: 1px solid var(--border-color);
    font-family: "Avenir";
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -1%;
    color: #ffffff80;
    padding: 15px 16px;

    @media (max-width: 500px) {
      font-size: 14px;
      line-height: 21px;
      height: 18px;
    }
  }

  input:focus {
    outline: none;
  }

  .hint {
    color: red;
    font-size: 12px;
    margin-left: 10px;
    min-height: 12px; 
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .hint.visible {
    opacity: 1; 
  }

  @media (max-height: 740px) {
    margin-top: 24px;
  }
`;


export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 32px;

  @media (max-width: 500px) {
    flex-direction: column;
  }

  @media (max-height: 740px) {
    margin-top: 24px;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 48%;
  height: 56px;
  background: var(--primary-gradient);
  cursor: pointer;
  border-radius: 120px;
  border: none;
  cursor: pointer;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  color: #ffffff;
  position: relative;

  .spinner-wrapper {
    position: absolute;
    right: 15px;
    display: flex;
    align-items: center;
  }

  &:hover {
    background: var(--primary-gradient-hover);
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:active {
    outline: none;
    background-color: transparent;
  }

  @media (max-width: 500px) {
    width: 100%;
    height: 48px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--border-color);
  margin-top: 32px;
`;

export const TextCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0px;
`;

export const Text = styled.p`
  font-family: "Avenir";
  font-weight: 800;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.01em;
  color: var(--white-color);
  text-align: center;
  padding: 0;
  margin-bottom: 0;

  span {
    color: var(--pink-color);
    cursor: pointer;
  }

  @media (max-width: 500px) {
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.01em;
  }

  @media (max-height: 740px) {
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.01em;
  }
`;

export const LinkStyled = styled(Link)`
  text-decoration: none;
  font-family: "Avenir";
  font-weight: 800;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.01em;
  cursor: pointer;
  padding: 0;
  margin-bottom: 0;

  span {
    color: #f82d98;
  }
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  cursor: pointer;
  margin-left: 10px;
`;
