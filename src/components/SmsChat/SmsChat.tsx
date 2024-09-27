import React, { useState } from "react";
import InputMask from "react-input-mask";
import FocusTrap from "focus-trap-react";
import { SmsChatProps } from "./types";
import Code from "../Code/Code";
import { UserContainer } from "../../pages/Login/Login.styled";
import { ImageContainer, Image, CloseIcon } from "../navbar/Navbar.styled";
import { Row } from "../../pages/SignUp/SignUp.styled";
import { BoxContainer, Button } from "./SmsChat.styled";
import { Navbar } from "../../components/menu/Menu.styled";
import { AvenirH4, TextSmall } from "../../assets/css/Global.styled";
import logo from "../../assets/images/logo.png";

const SmsChat: React.FC<SmsChatProps> = ({
  setIsLoginOpen,
  setIsSignupOpen,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = () => {
    setIsSuccess(true);
  };

  const handleCloseClick = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };
  const handleLogoClick = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  return (
    <FocusTrap>
      <div role="dialog" aria-modal="true">
        <UserContainer>
          <Navbar>
            <CloseIcon onClick={handleCloseClick} />
            <ImageContainer>
              <Image src={logo} alt="logo" onClick={handleLogoClick} />
            </ImageContainer>
          </Navbar>
          {!isSuccess ? (
            <BoxContainer>
              <AvenirH4
                style={{ color: "white", marginTop: "0", marginBottom: "4px" }}
              >
                Start SMS Chat
              </AvenirH4>
              <TextSmall
                style={{
                  color: "#FFFFFF80",
                  marginTop: "0",
                  marginBottom: "0",
                }}
              >
                Enter your phone number to chat by SMS
              </TextSmall>
              <Row>
                <label htmlFor="phone">Phone Number</label>
                <InputMask
                  mask="+380 99 999 99 99"
                  maskChar=" "
                  id="phone"
                  name="phone"
                >
                  {(inputProps: any) => <input {...inputProps} type="tel" />}
                </InputMask>
              </Row>
              <Button onClick={handleSubmit}>START CHATTING</Button>
            </BoxContainer>
          ) : (
            <Code />
          )}
        </UserContainer>
      </div>
    </FocusTrap>
  );
};

export default SmsChat;
