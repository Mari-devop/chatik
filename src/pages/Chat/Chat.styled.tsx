import styled from "styled-components";

interface DisabledProps {
  disabled: boolean;
}
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

  @media (max-width: 980px) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: 375px) {
    width: 200px;
    height: 200px;
  }
`;

export const PersonShadow = styled.img`
  width: 539px;
  height: 539px;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;

  @media (max-width: 980px) {
    width: 340px;
    height: 300px;
  }

  @media (max-width: 375px) {
    width: 250px;
    height: 200px;
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
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;

  @media (max-width: 980px) {
    width: 180px;
    height: 220px;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: 375px) {
    width: 120px;
    height: 150px;
    top: 30px;
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

  @media (max-width: 980px) {
    left: 50%;
    transform: translateX(-50%);
    margin-top: 80px;
  }

  @media (max-width: 375px) {
    margin-top: 40px;
  }
`;

export const Title = styled.h2`
  font-family: "Arquitecta";
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  letter-spacing: 0.1em;
  margin: 0px;
  color: #ffffff;
  text-transform: uppercase;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;

  @media (max-width: 850px) {
    font-size: 14px;
    line-height: 15px;
    letter-spacing: 0.15em;
  }
`;

export const Subtitle = styled.h3`
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 11px;
  line-height: 12px;
  letter-spacing: 0.2em;
  margin-top: 10px;
  color: var(--border-color-hover);
  text-transform: uppercase;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;

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

export const Question = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 10px;
  padding: 12px;
  width: auto;
  min-height: 20px;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  transition: visibility 0.3s ease;

  @media (max-width: 850px) {
    display: none;
  }
`;

export const Text = styled.h3`
  font-family: "Avenir";
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: -0.01em;
  color: #000000;
  margin: 0px;
  padding-right: 10px;

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

export const AnswerBox = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 400px;
  padding-right: 16px;

  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0)
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0)
  );

  @media (max-width: 850px) {
    height: 150px;
    padding-right: 0px;
  }

  @media (min-height: 740px) {
    height: 300px;
  }

  @media (min-height: 1000px) {
    height: 400px;
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
  height: 45px;
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
`;

export const RespondBox = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    90deg,
    rgb(58, 46, 91) 0%,
    rgba(48, 48, 48, 0.9) 40%
  );
  border-radius: 10px;
  padding: 12px;
  width: 100%;
  user-select: none;
  -webkit-user-drag: none;

  @media (max-width: 1200px) {
    width: 400px;
  }

  @media (max-width: 1100px) {
    width: 300px;
  }

  @media (max-width: 850px) {
    width: 80%;
  }

  @media (max-width: 375px) {
    padding: 8px;
  }
`;

export const TextRespond = styled.h3`
  font-family: "Avenir";
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: #ffffff;
  margin-right: 50px;
  width: 440px;

  @media (max-width: 1200px) {
    width: 350px;
  }

  @media (max-width: 1100px) {
    width: 100%;
  }

  @media (max-width: 375px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const Social = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  cursor: pointer;
  z-index: 1000;
  pointer-events: auto;
`;

export const IconSocial = styled.img`
  width: 24px;
  height: 24px;
`;

export const QuestionContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 80px;
  flex-direction: column;
  z-index: 9;
  width: auto;
  margin-right: 50px;

  @media (max-width: 850px) {
    bottom: 65px;
    width: 85%;
    right: 50px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  @media (max-width: 500px) {
    right: 20px;
    width: 90%;
  }
`;

export const PersonAnswer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;
  background: linear-gradient(
    90deg,
    rgb(230, 214, 248) 0%,
    rgb(251, 213, 236) 40%
  );
  border-radius: 30px;
  max-height: 100%;
  box-sizing: border-box;
  z-index: 2;
  border: none;
  width: 100%;
  min-width: 700px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #5833ef 0%, #f82d98 100%);
    border-radius: 30px;
    padding: 8px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    z-index: 1;

    @media (max-width: 1100px) {
      padding: 4px;
    }

    @media (max-width: 850px) {
      padding: 2px;
    }
  }

  &::after {
    content: "";
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

  @media (max-width: 1200px) {
    min-width: 580px;
  }

  @media (max-width: 1100px) {
    min-width: 500px;
  }

  @media (max-width: 950px) {
    min-width: 400px;
  }

  @media (max-width: 850px) {
    padding: 30px;
    margin: 0;
  }

  @media (max-width: 500px) {
    padding: 20px;
  }

  @media (max-width: 450px) {
    min-width: 300px;
  }
`;

export const InputBox = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 720px;
  right: 60px;
  padding: 20px 0px;
  box-sizing: border-box;
  z-index: 10;

  @media (max-width: 1200px) {
    width: 580px;
  }

  @media (max-width: 1100px) {
    width: 520px;
    right: 42px;
  }

  @media (max-width: 950px) {
    width: 420px;
  }

  @media (max-width: 850px) {
    width: 90%;
    right: 35px;
    padding: 10px 0px;
  }

  @media (max-width: 500px) {
    right: 20px;
  }
`;

export const InputWrapper = styled.div<{ isGrowing: boolean }>`
  position: relative;
  width: 100%;
  border-radius: ${({ isGrowing }) => (isGrowing ? "10px" : "120px")};
  background: linear-gradient(45deg, #5833ef, #f82d98);
  padding: 1px;
  display: flex;
  align-items: center;
  transition: border-radius 0.3s ease;
`;

export const Input = styled.textarea<DisabledProps & { isGrowing: boolean }>`
  background: ${({ disabled }) =>
    disabled
      ? "linear-gradient(45deg, rgba(4,4,16,1) 0%, #929292d4 100%)"
      : "linear-gradient(45deg, rgba(4,4,16,1) 0%, rgba(15,3,6,1) 100%)"};
  border: none;
  border-radius: ${({ isGrowing }) => (isGrowing ? "10px" : "120px")};
  padding-left: 32px;
  padding-right: 150px;
  padding-top: 8px;
  font-family: "Avenir";
  font-weight: 400;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: -0.01em;
  color: #ffffff;
  width: 100%;
  outline: none;
  position: relative;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
  resize: none;
  overflow: auto;
  height: auto;
  min-height: 45px;
  max-height: 200px;
  transition: border-radius 0.3s ease;
  box-sizing: border-box;

  @media (max-width: 375px) {
    padding-right: 100px;
    font-size: 14px;
  }
`;

export const Button = styled.button<DisabledProps>`
  background: ${({ disabled }) =>
    disabled ? "#929292d4" : "linear-gradient(45deg, #5833EF, #F82D98)"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border-radius: 120px;
  border: none;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 14px;
  line-height: 15px;
  letter-spacing: 0.15em;
  color: #ffffff;
  width: 137px;
  height: 39px;
  position: fixed;
  right: 65px;
  bottom: 25px;
  z-index: 2;

  @media (max-width: 1100px) {
    right: 45px;
  }
  @media (max-width: 850px) {
    right: 40px;
    bottom: 15px;
  }

  @media (max-width: 500px) {
    right: 25px;
  }

  @media (max-width: 450px) {
    right: 25px;
  }

  @media (max-width: 375px) {
    width: 80px;
    font-size: 12px;
    bottom: 14px;
  }
`;
