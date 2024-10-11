import styled from "styled-components";

export const ModalContainer = styled.div<{
  type: "success" | "failure" | "share" | "confirm";
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 22px;
  box-sizing: border-box;
  border: none;
  z-index: 10001; 
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
  background: ${({ type }) =>
    type === "success"
      ? `linear-gradient(45deg, rgba(4, 4, 16, 1) 0%, rgba(15, 3, 6, 1) 100%)`
      : type === "failure"
      ? `linear-gradient(45deg, rgba(4, 4, 16, 1) 0%, rgba(40, 30, 50, 1) 100%)`
      : `linear-gradient(45deg, rgba(4, 4, 16, 1) 0%, rgba(15, 3, 6, 1) 100%)`};

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: inherit;
    padding: 1px;
    border-image-slice: 1;
    background: ${({ type }) =>
      type === "success"
        ? `linear-gradient(45deg, #5833ef, #B5E42E)`
        : type === "failure"
        ? `linear-gradient(45deg, rgba(250, 0, 80, 1), rgba(250, 120, 120, 1))`
        : `linear-gradient(45deg, #5833EF 0%, #F82D98 100%)`};
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }

  p {
    font-weight: 500;
    padding-top: 25px;
  }

  @media (min-width: 375px) {
    max-width: 400px;
    width: 90%;
    top: 50%;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 10000;
`;

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const Social = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 24px;
  right: 36px;
  width: 54px;
  height: 54px;
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

  @media (max-width: 400px) {
    top: 15px;
    right: 16px;
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