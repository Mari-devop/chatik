import styled from 'styled-components';

// Avenir styled headings
export const AvenirH1 = styled.h1`
    font-family: 'Avenir';
    font-weight: 800;
    font-size: 40px;
    line-height: 60px;
    letter-spacing: -0.01em;
`;

export const AvenirH2 = styled.h2`
    font-family: 'Avenir';
    font-weight: 800;
    font-size: 32px;
    line-height: 48px;
    letter-spacing: -0.01em;
    color: var(--white-color);
    padding: 0;
    margin: 0;

    @media screen and (max-width: 500px) {
        font-size: 24px;
        line-height: 36px;
    }
`;

export const AvenirH3 = styled.h3`
    font-family: 'Avenir';
    font-weight: 500;
    font-size: 32px;
    line-height: 48px;
    letter-spacing: -0.01em;
`;

export const AvenirH4 = styled.h4`
    font-family: 'Avenir';
    font-weight: 800;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.01em;
`;

export const AvenirH5 = styled.h5`
    font-family: 'Avenir';
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.01em;
`;

export const AvenirH6 = styled.h6`
    font-family: 'Avenir';
    font-weight: 800;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: var(--white-color);
`;

export const TextLarge = styled.p`
    font-family: 'Avenir';
    font-weight: 500;
    font-size: 22px;
    line-height: 33px;
    letter-spacing: -0.01em;
`;

export const TextMedium = styled.p`
    font-family: 'Avenir';
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: #FFFFFF80;
    margin: 0;
    padding: 0;

    @media screen and (max-width: 500px) {
        font-size: 14px;
        line-height: 21px;
    }
`;

export const TextSmall = styled.p`
    font-family: 'Avenir';
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.01em;
`;

export const TextTiny = styled.p`
    font-family: 'Avenir';
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.01em;
    margin: 0;
`;

export const TextSmallBold = styled.p`
    font-family: 'Avenir';
    font-weight: 800;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.01em;
`;  

// Arquitecta styled headings
export const ArquitectaH1 = styled.h1`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 36px;
    line-height: 47px;
    letter-spacing: 0.4em;
`;

export const ArquitectaH2 = styled.h2`
    font-family: 'Arquitecta';
    font-weight: 500;
    font-size: 24px;
    line-height: 31px;
    letter-spacing: 0.1em;
`;

export const ArquitectaH3 = styled.h3`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.3em;
`;

export const ArquitectaH4 = styled.h4`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 14px;
    line-height: 15px;
    letter-spacing: 0.15em;
`;

export const ArquitectaH5 = styled.h5`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.3em;
`;

export const ArquitectaH6 = styled.h6`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 11px;
    line-height: 12px;
    letter-spacing: 0.2em;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 100%; 
    // padding-top: 48px; 
    box-sizing: border-box;
`;
