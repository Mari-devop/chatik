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

    @media (max-width: 900px) {
        justify-content: space-between;
    }
`;

export const ImageContainer = styled.div`
    width: 211px;
    height: 44px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 34px;
    cursor: pointer;

    @media (max-width: 900px) {
        left: 16px;
        transform: none;
        width: 144px;
    }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const CloseIcon = styled.div`
    position: absolute;
    top: 24px;  
    right: 24px;  
    width: 54px;
    height: 54px;
    cursor: pointer;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;

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
    background-color: transparent;
    border: none;
    cursor: pointer;
    top: 34px;
    left: 32px;
    position: absolute;

    @media (max-width: 900px) {
        left: auto;   
        right: 16px;  
        top: 50px;
      
    }
`;

export const Icon = styled.img`
    width: 36px;
    height: 18px;
    object-fit: contain;
`;

export const ButtonLogin = styled.button`
    background-color: transparent;
    color: var(--white-color);
    border: none;
    cursor: pointer;
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.3em;

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
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.3em;
    color: #fffffF;       
    width: 185px;
    height: 48px;
    margin: 32px;

    &:hover {
        background: var(--primary-gradient-hover);
    }

    @media (max-width: 900px) {
        display: none;
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
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.3em;
    color: #FFFFFF;       
    width: 157px;
    height: 48px;
    position: relative;
    margin: 32px;
    gap: 5px;
    z-index: 1;
    background-clip: padding-box; 
    border: none;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        padding: 2px; 
        background: linear-gradient(45deg, #5833EF, #F82D98);
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor; 
        z-index: -1; 
    }

    @media (max-width: 900px) {
        width: 75px;
        height: 32px;
        padding: 10px 16px;
        font-size: 10px;
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