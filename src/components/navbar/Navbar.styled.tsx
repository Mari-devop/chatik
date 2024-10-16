import styled from "styled-components";

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  user-select: none;
  pointer-events: all;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -moz-user-select: none;
  -ms-user-select: none;

  @media (max-width: 900px) {
    justify-content: space-between;
  }
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 0 32px;
  margin: 0 auto;
  position: relative;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;

  @media (max-width: 900px) {
    margin-right: 46px;
    margin-top: 13px;
  }
`;

export const ButtonMenu = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 36px;
  height: 24px;
  padding: 0;
  margin-top: 36px;
  position: relative;

  div {
    background-color: white;
    height: 3px;
    border-radius: 1px;
    transition: all 0.3s ease;
  }

  &:hover div {
    background: linear-gradient(90deg, #f82d98, #5833ef);
  }

  @media (max-width: 900px) {
    position: absolute;
    right: 40px;
    top: 14px;
    height: 20px;
  }

  @media (max-width: 600px) {
    top: -10px;
    width: 24px;
    right: 23px;
  }
`;

export const Line = styled.div`
  width: 100%;
  margin-left: 8px;
`;

export const LineShort = styled.div`
  width: 100%;
`;

export const Icon = styled.img`
  width: 36px;
  height: 18px;
  object-fit: contain;
`;

export const ButtonLogin = styled.button`
  position: relative;
  background-color: transparent;
  color: var(--white-color);
  border: none;
  border-radius: 120px;
  cursor: pointer;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  padding: 15px 30px;

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

  a {
    text-decoration: none;
    color: #ffffff;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const ButtonStart = styled.button`
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
  width: 185px;
  height: 48px;
  margin: 32px;

  &:hover {
    background: var(--primary-gradient-hover);
  }

  @media (max-width: 900px) {
    display: none;
  }

  a {
    text-decoration: none;
    color: #ffffff;
  }
`;

export const ButtonShare = styled.button`
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
  margin: 32px;
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

export const IconShare = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;

  @media (max-width: 900px) {
    display: none;
  }
`;
