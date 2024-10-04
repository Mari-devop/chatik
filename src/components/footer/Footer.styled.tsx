import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px; 
  width: calc(100% - 64px); 
  height: 90px;
  background-color: #1D1D24;
  border-radius: 32px;
  box-sizing: border-box;
  position: relative;
  bottom: 0;
  margin-top: -35px;
  margin-bottom: 32px;

  @media (max-width: 825px) {
    flex-direction: column;
    height: auto;
  }
`;

export const LogoContainer = styled.div`
    width: 211px;
    height: 44px;

    @media (max-width: 825px) {
        margin-top: 32px;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export const TinyText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--border-color-hover);
    font-size: 14px;
    text-align: center;

    @media (max-width: 825px) {
        margin-top: 32px;
    }
`;

export const SocialContainer = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 825px) {
        margin-top: 32px;
        margin-bottom: 32px;
    }
`;

export const Text = styled.div`
    font-family: 'Avenir';
    font-weight: 800;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: var(--border-color-hover);
    margin-right: 16px;
`;

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--primary-gradient);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin: 0 8px;
    width: 32px;
    height: 32px;
`;

export const Icon = styled.img`
    width: 14px;
    height: 14px;
    object-fit: contain;
`;
