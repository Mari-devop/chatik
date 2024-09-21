import styled from "styled-components";
import InputMask from "react-input-mask"; 

export const FirstBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(
    45deg,
    rgba(4, 4, 16, 1) 0%,
    rgba(15, 3, 6, 1) 100%
  );
  width: 760px;
  height: 742px;
  box-sizing: border-box;
  position: relative;
  border-radius: 32px;
  padding: 48px;
  margin-top: 100px;
  margin-bottom: 48px;
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

export const SecondBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    45deg,
    rgba(4, 4, 16, 1) 0%,
    rgba(15, 3, 6, 1) 100%
  );
  width: 760px;
  height: 365px;
  box-sizing: border-box;
  position: relative;
  border-radius: 32px;
  padding: 48px;
  margin-top: 0px;
  margin-bottom: 80px;
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

export const Boxik = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 42px;
  border-radius: 16px;
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

export const Text = styled.p`
  font-family: "Avenir";
  font-weight: 800;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.01em;
  margin-bottom: 32px;
  margin-top: 0;
  color: var(--border-color-hover);

  @media (max-width: 767px) {
    text-align: center;
  }
`;

export const ButtonUpdate = styled.button`
  width: 100%;
  height: 56px;
  background: transparent;
  cursor: pointer;
  border-radius: 120px;
  border: 1px solid var(--border-color-hover);
  cursor: pointer;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  color: #ffffff;
  transition: background 0.3s ease;
  margin-bottom: 32px;
`;

export const ButtonCancel = styled.button`
  width: 100%;
  background: transparent;
  cursor: pointer;
  border: none;
  cursor: pointer;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  color: #ffffff;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: right;
  justify-content: right;
  width: 100%;
  margin-top: 32px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const ImageUp = styled.img`
  position: absolute;
  top: -200px;
  right: 0px;
  z-index: 1;
`;

export const ImageDown = styled.img`
  position: absolute;
  bottom: -100px;
  right: 0;
  z-index: 0;
`;

export const CardInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #000;
  padding: 10px;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const CardDetails = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #2f2535;
  border-radius: 16px;
  height: 62px;
  background-color: #111;
  color: #fff;
`;

export const CardIcon = styled.div`
  margin-right: 5px;
  img {
    margin-left: 16px;
    width: 24px;
    height: 16px;
  }
`;

export const MaskedInput = styled(InputMask)`
  background-color: transparent;
  border: none;
  color: #fff;
  margin: 0 15px;
  padding: 10px;
  width: 100%;
  font-family: "Avenir";
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.01em;
  color: var(--white-color);
  z-index: 9999;
  &:focus {
    outline: none;
  }
`;

export const CardNumberInput = styled(MaskedInput)`
  width: 200px;
  outline: none;
  z-index: 9999;
`;

export const ExpiryInput = styled(MaskedInput)`
  width: 80px;
  outline: none;
  z-index: 9999;
`;

export const CvcInput = styled(MaskedInput)`
  width: 60px;
  outline: none;
  z-index: 9999;
`;

export const SaveButton = styled.button`
  background-image: linear-gradient(to right, #6a00f4, #c900ff);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  z-index: 9999;
  margin-left: 10px;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  height: 62px;
  width: 119px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;
