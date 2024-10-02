import styled from "styled-components";
import checkmark from "../../assets/images/Vector.png";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;

  label {
    margin-top: 0;
    margin-bottom: 0;
    font-family: "Avenir";
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: #ffffff80;
    margin-left: 12px;
  }

  input[type="checkbox"] {
    width: 32px;
    height: 32px;
    appearance: none;
    background-color: transparent;
    border: 1px solid #ffffff80;
    border-radius: 8px;
    position: relative;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: transparent;
      background-image: url(${checkmark});
      background-size: 16px 11px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  @media (max-width: 620px) {
    margin-bottom: 24px;

    label {
      font-size: 14px;
      line-height: 21px;
    }
  }
`;

export const Title = styled.h2`
  font-family: "Avenir";
  font-weight: 800;
  font-size: 32px;
  line-height: 48px;
  letter-spacing: -0.01em;
  color: var(--white-color);
  padding: 0;
  margin-top: 24px;
  margin-bottom: 8px;

  @media (max-width: 620px) {
    font-size: 24px;
    line-height: 36px;
  }
`;

export const Text = styled.p`
  font-family: "Avenir";
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.01em;
  color: #ffffff80;
  margin-top: 0;
  margin-bottom: 32px;
  padding: 0;

  @media (max-width: 620px) {
    font-size: 14px;
    line-height: 21px;
    margin-bottom: 24px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 70px);
  width: 100vw;
  position: relative;

  @media (max-width: 1078px) {
    margin-top: 70px;
  }

  @media (max-width: 767px) {
    margin-top: 80px;
    height: calc(100vh - 80px);
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 56px;
  background: ${({ disabled }) =>
    disabled
      ? "linear-gradient(135deg, rgba(34,34,34,1) 0%, rgba(48,48,48,1) 50%, rgba(64,64,64,1) 100%);"
      : "var(--primary-gradient)"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border-radius: 120px;
  border: none;
  cursor: pointer;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  color: #ffffff;
  transition: background 0.3s ease;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  margin-bottom: 32px;

  &:hover {
    background: var(--primary-gradient-hover);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  height: 526px;
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
    width: calc(100% - 32px);
    padding: 48px;
  }

  @media (max-width: 420px) {
    padding: 24px;
  }
`;
