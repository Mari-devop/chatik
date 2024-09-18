import styled from "styled-components";

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
    background-color: rgba(
      66,
      133,
      244,
      0.1
    ); 
  }
`;
