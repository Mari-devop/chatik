import styled from "styled-components";

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    45deg,
    rgba(4, 4, 16, 1) 0%,
    rgba(15, 3, 6, 1) 100%
  );
  width: 500px;
  height: auto;
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
`;

export const Button = styled.button`
  background-image: linear-gradient(to right, #6a00f4, #c900ff);
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 24px;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  height: 62px;
  width: 100%;
  transition: opacity 0.3s ease;
  z-index: 10;
  &:hover {
    opacity: 0.9;
  }
`;
