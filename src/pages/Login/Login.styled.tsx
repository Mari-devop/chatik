import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: auto;
  background: rgba(25, 23, 42, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  isolation: isolate;
`;

export const ButtonSecondary = styled.button`
  font-family: "Avenir";
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.01em;
  color: var(--border-color-hover);
  background-color: transparent;
  border: none;
  cursor: pointer;
  align-items: left;
  display: flex;

  &:focus {
    outline: 1px solid #b5e42e;
  }

  @media (max-height: 740px) {
    font-size: 14px;
    line-height: 21px;
  }
`;

export const CustomGoogleButton = styled.button`
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 120px;
  padding: 10px;
  width: 48%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  gap: 16px;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  color: var(--white-color);

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: rgba(66, 133, 244, 0.1);
  }

  &:focus {
    outline: none; 
  }

  &:active {
    outline: none; 
    background-color: transparent;
  }

  @media (max-width: 500px) {
    width: 100%;
    order: 2;
    margin-top: 16px;
    font-size: 12px;
    height: 48px;
  }
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  cursor: pointer;
  margin-left: 10px;
`;

export const AvenirTitle = styled.p`
  font-family: "Avenir";
  font-weight: 800;
  font-size: 32px;
  line-height: 48px;
  letter-spacing: -0.01em;
  color: var(--white-color);
  padding: 0;
  margin: 0;

  @media (max-height: 740px) {
    font-size: 24px;
    line-height: 36px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--border-color);
  margin-top: 32px;
`;
