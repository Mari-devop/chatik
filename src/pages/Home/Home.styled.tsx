import styled from "styled-components";

interface RowProps {
  isActive: boolean; 
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
   user-select: none;       
    pointer-events: all;     
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -webkit-user-drag: none;  
    -moz-user-select: none;  
    -ms-user-select: none; 
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  width: 100%;
  padding-top: 20px; 
  box-sizing: border-box;
  overflow: hidden;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 70px); 
  scroll-snap-align: start;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

export const Text = styled.p`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 28px;
    line-height: 30px;
    letter-spacing: 0.4em;
    color: #FFFFFF;
    text-transform: uppercase;
    text-align: center;
    width: 700px;
    height: 70px;
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
    font-size: 16px;
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
    font-size: 14px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: #FFFFFF;
    margin: 0;
    padding: 0;
    cursor: pointer;
    z-index: 15;

    @media (max-width: 700px) {
        font-size: 14px;
        line-height: 21px;
    }
`;

export const Row = styled.div<RowProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 48px;
  width: 350px;
  height: 48px;
  border-radius: 120px;
  background: linear-gradient(45deg, #08081e 0%, #21050c 100%);
  margin-top: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease; 

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    background: linear-gradient(45deg, #5833ef, #f82d98); 
    z-index: -1;
    transition: all 0.3s ease; 
     -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
                mask-composite: exclude;
  }

  &:hover::before {
    background: linear-gradient(45deg, #f82d98, #5833ef);
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
  }

  ${({ isActive }) =>
    isActive &&
    `
    background: linear-gradient(45deg, #F82D98, #5833EF);
    &::before {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  `}

  &:first-of-type { 
    margin-top: 15px;
  }

  @media (max-width: 900px) {
    width: 430px;
  }

  @media (max-width: 700px) {
    width: 300px;
    padding-left: 24px;
  }
    z-index: 15;
`;

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0px;
  position: relative;
  padding-left: 0;  
  padding-right: 0; 
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 900px) {
    padding-top: 90px;
  }
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
  width: 230px;
  height: 230px;
  z-index: -2;
  position: relative;
  bottom: 0px;
  right: -170px;

  @media (max-width: 900px) {
    width: 150px;
    height: 150px;
    right: -100px;
  }

  @media (max-width: 700px) {
    width: 128px;
    height: 128px;
    right: -80px;
    bottom: 20px;
  }
`;

export const Image2 = styled.img`
  width: 280px;
  height: 280px;
  z-index: -2;
  position: relative;
  bottom: 0px;
  right: -80px;


  @media (max-width: 900px) {
    width: 200px;
    height: 200px;
    right: -40px;
    bottom: 0;
  }

  @media (max-width: 700px) {
    width: 161px;
    height: 161px;
    right: -40px;
    bottom: 20px;
  }
`;

export const Image3 = styled.img`
  width: 350px;
  height: 350px;
  z-index: 1;
  position: relative;
  bottom: 0;
  right: 30px;


  @media (max-width: 900px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 700px) {
    width: 251px;
    height: 251px;
    bottom: 20px;
  }
`;

export const Image4 = styled.img`
  width: 280px;
  height: 280px;
  z-index: 0;
  position: relative;
  bottom: 0;
  left: -130px;

  @media (max-width: 900px) {
    width: 200px;
    height: 200px;
    left: -90px;
  }

   @media (max-width: 700px) {
    width: 168px;
    height: 168px;
    left: -100px;
    bottom: 20px;
  }
`;

export const Image5 = styled.img`
  width: 232px;
  height: 232px;
  z-index: -1;
  position: relative;
  bottom: 0;
  left: -190px;

  @media (max-width: 900px) {
    width: 150px;
    height: 150px;
    left: -130px;
  }

  @media (max-width: 700px) {
    width: 111px;
    height: 111px;
    left: -120px;
    bottom: 20px;
  }
`;

export const Image6 = styled.img`
  width: 100vw; 
  z-index: 4;
  position: absolute;
  bottom: -1px;
  left: 50%;           
  transform: translateX(-50%);
`;

export const Image7 = styled.img`
  width: 931px;
  height: 323px;
  z-index: -3;
  position: absolute; 
  bottom: 90px;
  left: 50%;           
  transform: translateX(-50%);

  @media (max-width: 900px) {
    right: 350px;
    bottom: 150px;
    width: 670px;
    height: 240px;
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
  bottom: 20px;
  left: 50%;           
  transform: translateX(-50%);
  width: 800px;
  height: 600px;

  @media (max-width: 900px) {
    height: 500px;
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
  bottom: 80px;
  width: 400px;
  height: 400px;
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
  width: 800px;
  height: 800px;
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
  margin-top: 20px;
  text-align: left;

  @media (max-width: 900px) {
    margin-top: 20px;
  }

  @media (max-width: 810px) {
    margin-top: 100px;
  }
`;

export const Title = styled.p`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 28px;
    line-height: 47px;
    letter-spacing: 0.4em;
    color: #FFFFFF;
    text-transform: uppercase;
    margin: 0;
    padding-left: 50px;
    text-align: left;

     @media (max-width: 810px) {
      font-size: 20px;
      line-height: 21px;
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
    font-size: 14px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: #FFFFFF80;
    margin: 0;
    padding-left: 50px;

     @media (max-width: 700px) {
        font-size: 14px;
        line-height: 21px;
        margin-top: 8px;
        margin-bottom: 26px;
    }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(161px, 1fr));
  grid-gap: 24px;
  margin-top: 12px;
  padding-left: 50px;
  padding-right: 50px;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  @media (max-width: 1250px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

   @media (max-width: 1150px) {
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  }
 
  @media (max-width: 1020px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  @media (max-width: 950px) {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }

   @media (max-width: 810px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); 
    height: 100vh; 
    overflow-y: auto; 
    padding-bottom: 80px;
    
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

  
   @media (max-width: 1000px) {
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
  cursor: pointer;

  @media (min-width: 1000px) {
    &:hover ${GridText} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const GridTitle = styled.p`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.3em;
    color: #FFFFFF;
    margin: 0;
    padding-left: 15px;

    @media (max-width: 1300px) {
      font-size: 12px;
    }

    @media (max-width: 1150px) {
      font-size: 10px;
      line-height: 12px;
    }

    @media (max-width: 1000px) {
      font-size: 14px;
      line-height: 15px;
      letter-spacing: 0.15em;
    }

    @media (max-width: 950px) {
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 0.1
    }

    @media (max-width: 810px) {
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.2em;
    }
`;

export const GridSubtext = styled.p`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.2em;
    color: #FFFFFF80;
    margin: 0;
    padding-left: 15px;

    @media (max-width: 1150px) {
      font-size: 8px;
    }
    @media (max-width: 1300px) {
      font-size: 9px;
    }
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