import styled from "styled-components";

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh - 80px);
    width: 100%;

    @media (max-width: 850px) {
        flex-direction: column; 
        height: calc(100vh - 80px);
        overflow: hidden;
        align-items: center;
    }
`;

export const PersonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 76px;
    flex-grow: 1;
    flex-shrink: 1;
    z-index: 1;
    position: relative;

    @media (max-width: 850px) {
        width: 100%; 
        align-items: center;
        margin-top: 10px;
        flex-grow: 0;
    }
`;

export const PersonBox = styled.div`
    width: 439px;
    height: 539px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 850px) {
        width: 300px;
        height: 300px;
    }
`;

export const PersonShadow = styled.img`
    width: 539px;
    height: 539px;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;

    @media (max-width: 850px) {
        width: 340px;
        height: 300px;
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const PersonPhoto = styled.img`
    width: 300px;
    height: 400px;
    position: relative;
    top: 60px;
    left: 100px;
    border-radius: 30%;
    z-index: 1;

    @media (max-width: 850px) {
        width: 180px;
        height: 220px;
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 100px;
    position: relative;
    left: 32%;

    @media (max-width: 850px) {
        left: 50%;
        transform: translateX(-50%);
        margin-top: 80px;
    }
`;

export const Title = styled.h2`
    font-family: 'Arquitecta';
    font-weight: 500;
    font-size: 24px;
    line-height: 31px;
    letter-spacing: 0.1em;
    margin: 0px;
    color: #ffffff;
    text-transform: uppercase;

    @media (max-width: 900px) {
        font-size: 14px;
        line-height: 15px;
        letter-spacing: 0.15em;
    }
`;

export const Subtitle = styled.h3`
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 11px;
    line-height: 12px;
    letter-spacing: 0.2em;
    margin-top: 10px;
    color: var(--border-color-hover);
    text-transform: uppercase;

    @media (max-width: 900px) {
        font-size: 11px;
        line-height: 12px;
        letter-spacing: 0.2em;
    }
`;

export const DialogContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 719px;
    margin-right: 40px;
    box-sizing: border-box;
    position: relative; 
    overflow: hidden;
    z-index: 2;
    flex-shrink: 0;

    @media (max-width: 1200px) {
        width: 600px;
    }

    @media (max-width: 1100px) {
        width: 500px;
    }

    @media (max-width: 950px) {
        width: 400px;
    }

    @media (max-width: 850px) {
        width: 100%; 
        margin-right: 0px;
        flex-grow: 1;
        margin-top: 50px;
    }
`;

export const RespondContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-top: 57px;

    @media (max-width: 850px) {
       margin-top: 0px;
    }
`;

export const QuestionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 37px;
    justify-content: center;

    @media (max-width: 850px) {
        margin-top: 0px;
    }
`;

export const Question = styled.div`
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 10px;
    padding: 12px;
    width: auto;

    @media (max-width: 850px) {
        display: none; 
    }
`;

export const Text = styled.h3`
    font-family: 'Avenir';
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: #000000;
    margin: 0px;
    padding-right: 10px;
`;

export const AnswerBox = styled.div`
    overflow-y: auto;
    height: 300px;
    padding-right: 16px;

    @media (max-width: 850px) {
        height: 150px;
        padding-right: 0px;
    }
`;

export const FadeOverlay = styled.div<{ scrolled: boolean }>`
    position: absolute;
    top: 96px; 
    left: 0px;
    right: 0;
    height: 120px; 
    background: linear-gradient(rgba(17, 17, 21, 0.9), transparent);
    pointer-events: none; 
    opacity: ${({ scrolled }) => (scrolled ? 1 : 0)};
    transition: opacity 0.3s ease;
    z-index: 1; 

    @media (max-width: 1100px) {
        display: none; 
    }
`;

export const Respond = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    width: 100%;
    align-items: right;
    gap: 16px;

    @media (max-width: 850px) {
        width: 100%;
        margin: 15px;
        gap: 8px;
    }

    @media (max-width: 522px) {
       width: 90%;
    }
`;

export const IconBox = styled.div`
    background: #a995f763;
    border-radius: 50%;
    width: 50px;
    height: 50px;
`;

export const Icon = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: 1;
    object-fit: contain;
`;

export const RespondBox = styled.div`
    display: flex;
    flex-direction: column;
    background: linear-gradient(90deg, rgb(58, 46, 91) 0%, rgba(48, 48, 48, 0.9) 40%);
    border-radius: 10px;
    padding: 12px;
    width: 100%;

    @media (max-width: 1200px) {
        width: 400px;
    }

    @media (max-width: 1100px) {
        width: 300px;
    }

    @media (max-width: 950px) {
        width: 200px;
    }

    @media (max-width: 850px) {
        width: 80%;
    }
`;

export const TextRespond = styled.h3`
    font-family: 'Avenir';
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-right: 43px;
    width: 440px;
    
    @media (max-width: 1200px) {
        width: 350px;
    }

    @media (max-width: 1100px) {
        width: 100%;
    }
`;

export const Social = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 8px;
`;

export const IconSocial = styled.img`
    width: 24px;
    height: 24px;
`;

export const PersonAnswer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 45px;
    background: linear-gradient(90deg, rgb(230, 214, 248) 0%, rgb(251, 213, 236) 40%);
    border-radius: 30px;
    position: absolute;
    bottom: 100px;
    left: 40px;
    right: 40px;
    max-height: 100%;
    box-sizing: border-box;
    z-index: 2; 
    margin-left: 40px;
    border: none;
   
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, #5833EF 0%, #F82D98 100%);
        border-radius: 30px;
        padding: 8px; 
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor; 
        z-index: 1; 
    }

    &::after {
        content: '';
        position: absolute;
        left: -25px; 
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 15px 20px 15px 0;
        border-color: transparent;
        background: rgb(119, 52, 223);
        clip-path: polygon(50% 0, 0 50%, 50% 100%); 
        width: 30px; 
        height: 30px; 
        z-index: 3;

        @media (max-width: 850px) {
            display: none;
        }
    }

    @media (max-width: 850px) {
        padding: 20px;
        margin: 0 auto;
    }
`;

export const InputBox = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    top: 200px;

    @media (max-width: 850px) {
        top: 130px;
        width: 90%;
        margin: 0 auto;
    }
`;

export const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    border-radius: 120px;
    background: linear-gradient(45deg, #5833EF, #F82D98); 
    padding: 1px;
    display: flex; 
    align-items: center;
`;

export const Input = styled.input`
    background: linear-gradient(45deg, rgba(4,4,16,1) 0%, rgba(15,3,6,1) 100%);
    border: none;
    border-radius: 120px;
    padding-left: 32px;
    font-family: 'Avenir';
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: #ffffff;
    width: 100%; 
    height: 45px;
    outline: none;
    position: relative;
`;

export const Button = styled.button`
    background: #929292d4;
    cursor: pointer;
    border-radius: 120px;
    border: none;
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 14px;
    line-height: 15px;
    letter-spacing: 0.15em;
    color: #ffffff;
    width: 137px;
    height: 39px;
    position: absolute;
    right: 5px;
    bottom: 5px;
    z-index: 2;
`;
