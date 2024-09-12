import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 141px;
  padding-left: 120px;
  padding-right: 120px;
  box-sizing: border-box; 
  overflow: hidden;  
  width: 100vw; 

  @media (max-width: 900px) {
    padding-left: 60px;
    padding-right: 60px;
  }

  @media (max-width: 700px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  @media (max-width: 375px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.p`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 36px;
    line-height: 47px;
    letter-spacing: 0.4em;
    color: #FFFFFF;
    text-transform: uppercase;
    text-align: center;
    width: 700px;
    height: 129px;
    margin: 0;

    @media (max-width: 700px) {
      font-size: 24px;
      line-height: 31px;
      letter-spacing: 0.1em;
      height: 62px;
      width: 450px;
    }

    @media (max-width: 375px) {
      width: 343px;
      font-family: 'Arquitecta';
      font-weight: 700;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: 0.3em;
    }

`;

export const Subtitle = styled.p`
    font-family: 'Avenir';
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: #FFFFFF80;
    margin: 0;
    padding: 0;

    @media (max-width: 700px) {
        font-size: 14px;
        line-height: 21px;
    }
`;

export const TextRow = styled.p`
    font-family: 'Avenir';
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: #FFFFFF;
    margin: 0;
    padding: 0;

    @media (max-width: 700px) {
        font-size: 14px;
        line-height: 21px;
    }
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 48px;
  width: 534px;
  height: 78px;
  border-radius: 120px;
  background: linear-gradient(45deg, #08081E 0%, #21050C 100%);
  margin-top: 16px;
  position: relative; 
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    background: linear-gradient(45deg, #5833EF, #F82D98); 
    z-index: -1; 
  }

  &:first-of-type { 
    margin-top: 32px;
  }

  @media (max-width: 900px) {
    width: 430px;
  }

  @media (max-width: 700px) {
    width: 330px;
    height: 64px;
    padding-left: 24px;
  }
`;

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 49px;
  position: relative;
  padding-left: 0;  
  padding-right: 0; 
  box-sizing: border-box;
  width: 100%;
`;

export const Wrapper1 = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export const Wrapper2 = styled.div`
  position: relative;
  width: 100%;
`;

export const Image1 = styled.img`
  width: 396px;
  height: 376px;
  z-index: -2;
  position: relative;
  bottom: 0px;
  right: -250px;

  @media (max-width: 1400px) {
    width: 300px;
    height: 280px;
    right: -230px;
  }

  @media (max-width: 900px) {
    width: 250px;
    height: 230px;
    right: -180px;
  }

  @media (max-width: 700px) {
    width: 168px;
    height: 168px;
    right: -80px;
  }
`;

export const Image2 = styled.img`
  width: 431px;
  height: 444px;
  z-index: -2;
  position: relative;
  bottom: 0px;
  right: -110px;

  @media (max-width: 1400px) {
    width: 360px;
    height: 360px;
  }

  @media (max-width: 900px) {
    width: 300px;
    height: 300px;
    right: -70px;
    bottom: 0;
  }

  @media (max-width: 700px) {
    width: 191px;
    height: 191px;
    right: -30px;
    bottom: 0;
  }
`;

export const Image3 = styled.img`
  width: 567px;
  height: 567px;
  z-index: 1;
  position: relative;
  bottom: 0;
 right: 30px;

  @media (max-width: 1400px) {
    width: 500px;
    height: 500px;
  }

  @media (max-width: 900px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 700px) {
    width: 251px;
    height: 251px;
  }
`;

export const Image4 = styled.img`
  width: 379px;
  height: 463px;
  z-index: 0;
  position: relative;
  bottom: 0;
  left: -160px;

  @media (max-width: 1400px) {
    width: 300px;
    height: 360px;
  }

  @media (max-width: 900px) {
    width: 250px;
    height: 310px;
    left: -130px;
  }

   @media (max-width: 700px) {
    width: 168px;
    height: 168px;
    left: -100px;
  }
`;

export const Image5 = styled.img`
  width: 332px;
  height: 332px;
  z-index: -1;
  position: relative;
  bottom: 0;
  left: -230px;

  @media (max-width: 1400px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 900px) {
    width: 200px;
    height: 200px;
    left: -200px;
  }

  @media (max-width: 700px) {
    width: 111px;
    height: 111px;
    left: -120px;
  }
`;

export const Image6 = styled.img`
  width: 100vw; 
  z-index: 4;
  position: absolute;
  bottom: 0px;
  left: 50%;           
  transform: translateX(-50%);
`;

export const Image7 = styled.img`
  width: 1531px;
  height: 523px;
  z-index: -3;
  position: absolute; 
  bottom: 190px;
  left: 50%;           
  transform: translateX(-50%);

  @media (max-width: 900px) {
    right: 350px;
    bottom: 150px;
    width: 870px;
    height: 400px;
  }

  @media (max-width: 700px) {
    right: 220px;
    bottom: 70px;
    width: 670px;
    height: 300px;
  }
`;

export const Image8 = styled.img`
  z-index: -3;
  position: absolute;
  bottom: 0px;
  left: 50%;           
  transform: translateX(-50%);

  @media (max-width: 900px) {
    height: 600px;
    width: 100%;
  }

  @media (max-width: 700px) {
    height: 500px;
    width: 100%;
  }

  @media (max-width: 375px) {
    height: 500px;
    width: 600px;
  }
`;

export const Image9 = styled.img`
  z-index: 5;
  position: absolute;
  bottom: 20px;
  left: 50%;           
  transform: translateX(-50%);

  @media (max-width: 900px) {
    height: 500px;
    width: 100%;
  }
`;

export const Image10 = styled.img`
  z-index: -1;
  position: absolute;
  bottom: 0px;
  left: 50%;           
  transform: translateX(-50%);

  @media (max-width: 900px) {
    height: 500px;
    width: 100%;
  }
  
`;

export const TextPersonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 150px;

  @media (max-width: 900px) {
    margin-top: 100px;
  }

  @media (max-width: 700px) {
    margin-top: 64px;
  }
`;

export const Title = styled.p`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 36px;
    line-height: 47px;
    letter-spacing: 0.4em;
    color: #FFFFFF;
    text-transform: uppercase;
    margin: 0;
    padding: 0;

     @media (max-width: 700px) {
      font-size: 24px;
      line-height: 31px;
      letter-spacing: 0.1em;
      width: 450px;
    }

    @media (max-width: 375px) {
      width: 343px;
      font-family: 'Arquitecta';
      font-weight: 700;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: 0.3em;
    }
`;

export const Subtext = styled.p`
    font-family: 'Avenir';
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: #FFFFFF80;
    margin: 0;
    padding: 0;

     @media (max-width: 700px) {
        font-size: 14px;
        line-height: 21px;
        margin-top: 8px;
        margin-bottom: 26px;
    }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(261px, 1fr));
  grid-gap: 24px;
  margin-top: 32px;
  padding-left: 0;
  padding-right: 0;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(auto-fit, minmax(163px, 1fr));
    margin-top: 0px;
  }

  @media (max-width: 375px) {
    grid-template-columns: repeat(auto-fit, minmax(163px, 1fr));
    grid-gap: 16px;
  }
`;

export const GridText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  position: absolute;
  width: 100%;
  height: 77px;
  bottom: 0;
  left: 0;
  background-color: rgba(88, 48, 102, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
  border-radius: 20px;

   @media (max-width: 700px) {
    position: relative;
    opacity: 1;
    visibility: visible;
    background-color: transparent; 
    margin-top: 8px;
  }
`;

export const GridRow = styled.div`  
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;

  @media (min-width: 700px) {
    &:hover ${GridText} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const GridTitle = styled.p`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.3em;
    color: #FFFFFF;
    margin: 0;
    padding-left: 20px;

    @media (max-width: 700px) {
      font-size: 14px;
      line-height: 15px;
      letter-spacing: 0.15em;

    }
`;

export const GridSubtext = styled.p`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 11px;
    line-height: 12px;
    letter-spacing: 0.2em;
    color: #FFFFFF80;
    margin: 0;
    padding-left: 20px;
`;

export const Person = styled.img`
  width: 100%;  
  height: 100%; 
  object-fit: cover;
  position: relative;

  @media (max-width: 700px) {
    border-radius: 20px;
  }
`;