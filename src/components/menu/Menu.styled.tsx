import styled from "styled-components";

export const MenuContainer = styled.div`
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

export const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px;
`;

export const Content = styled.div`
  z-index: 1; 
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  width: 100%;
  cursor: pointer;

  span {
    font-family: "Avenir";
    font-weight: 500;
    font-size: 32px;
    line-height: 48px;
    letter-spacing: -0.01em;
    color: var(--white-color);
  }

  a {
    text-decoration: none;
    color: var(--white-color);
  }
`;

export const Divider = styled.div`
  width: 279px;
  height: 1px;
  background-color: #2f2535;
  margin-top: 32px;
`;

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  gap: 20px;
`;

export const Social = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const CloseIcon = styled.div`
    position: absolute;
    top: 24px;  
    left: 24px;  
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

    &::before, &::after {
        content: '';
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
`;

export const ButtonSignOut = styled.button`
    background-color: transparent;
    color: var(--white-color);
    border: none;
    cursor: pointer;
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.3em;
    position: absolute;
    top: 44px;  
    right: 24px;  
`;