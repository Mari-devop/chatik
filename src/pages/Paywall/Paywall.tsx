import React, { useState } from "react";
import {
  Container,
  MainContainer,
  PhotoContainer,
  TextContainer,
  Section,
  Wrapper1,
  Wrapper2,
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
} from "../Home/Home.styled";
import {
  BoxContainer,
  FirstBox,
  SecondBox,
  ThirdBox,
  Type,
  Button,
  Row,
  IconCheck,
  SubscribeButton,
  CardInputContainer,
  SaveButton,
  CardDetails,
  CheckBox,
  CheckIcon
} from "./Paywall.styled";
import {
  AvenirH2,
  AvenirH6,
  AvenirH4,
  TextMedium,
  TextSmall,
  ArquitectaH5,
} from "../../assets/css/Global.styled";
import { Boxik } from "../AccountDetails/AccountDetsils.styled";
import {
  
  CardIcon,
  MaskedInput,
  CardNumberInput,
  ExpiryInput,
  CvcInput,
  
} from "../AccountDetails/AccountDetsils.styled";
import mask from "../../assets/images/main-page/left2.png";
import jobs from "../../assets/images/main-page/left.png";
import luter from "../../assets/images/main-page/center.png";
import albert from "../../assets/images/main-page/right.png";
import deva from "../../assets/images/main-page/rright2.png";
import shadow from "../../assets/images/main-page/shadow.png";
import conversation from "../../assets/images/main-page/conversation.png";
import check from "../../assets/images/paywall/check 1.png";
import bigshadow from "../../assets/images/main-page/bigbrightshadow.png";
import pinkshadow from "../../assets/images/main-page/bright-pinkshadow.png";
import card from "../../assets/images/accountDetails/Credit Cards.png";

const Paywall = () => {
  const [isMakePayment, setIsMakePayment] = useState(true);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  const handleMakePayment = () => {
    setIsMakePayment(false);
  };

  const handlePaymentSubmit = () => {
    setIsPaymentConfirmed(true);
  };
  return (
    <Container>
      <MainContainer>
        <Section>
          <TextContainer>
            <AvenirH2
              style={{ color: "white", marginTop: "60px", marginBottom: "0" }}
            >
              Unlock full features
            </AvenirH2>
            <TextMedium style={{margin: '0'}}>
              Share or subscribe to continue asking unlimited questions
            </TextMedium>
            <BoxContainer>
              {isMakePayment ? (
                <>
                  <FirstBox>
                    <Type>
                      <TextMedium style={{ color: "#0E0E10" }}>Free</TextMedium>
                    </Type>
                    <AvenirH4
                      style={{
                        color: "white",
                        marginTop: "0",
                        marginBottom: "0",
                      }}
                    >
                      Share with a friend
                    </AvenirH4>
                    <TextMedium>
                      Get <span style={{ color: "#F82D98" }}>3 free</span>{" "}
                      questions when you share on social media
                    </TextMedium>
                    <Button>SHARE</Button>
                  </FirstBox>
                  <SecondBox>
                    <Boxik>
                      <ArquitectaH5 style={{ color: "white" }}>
                        PRO
                      </ArquitectaH5>
                    </Boxik>
                    <AvenirH4
                      style={{
                        color: "white",
                        marginTop: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      $10 / month
                    </AvenirH4>
                    <Row>
                      <IconCheck src={check} />
                      <TextSmall style={{ color: "white", margin: "0" }}>
                        Unlimited questions
                      </TextSmall>
                    </Row>
                    <Row>
                      <IconCheck src={check} />
                      <TextSmall style={{ color: "white", margin: "0" }}>
                        SMS texting
                      </TextSmall>
                    </Row>
                    <Row>
                      <IconCheck src={check} />
                      <TextSmall style={{ color: "white", margin: "0" }}>
                        Access to all characters
                      </TextSmall>
                    </Row>
                    <SubscribeButton onClick={handleMakePayment}>
                      SUBSCRIBE
                    </SubscribeButton>
                  </SecondBox>
                </>
              ) : isPaymentConfirmed ? (
                <ThirdBox>
                    <CheckBox>
                        <CheckIcon src={check} />
                    </CheckBox>
                  <AvenirH4 style={{ color: "white", margin: "12px 0" }}>
                    You have successfully subscribed!
                  </AvenirH4>
                  <TextMedium style={{ color: "white" }}>
                    A receipt was sent to your email
                  </TextMedium>
                  <SaveButton>START CHATTING</SaveButton>
                </ThirdBox>
              ) : (
                <ThirdBox>
                  <Boxik>
                    <ArquitectaH5 style={{ color: "white" }}>PRO</ArquitectaH5>
                  </Boxik>
                  <AvenirH6
                    style={{
                      color: "white",
                      marginTop: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    $10 / month
                  </AvenirH6>
                  <CardInputContainer>
                    <CardDetails>
                      <CardIcon>
                        <img src={card} alt="Card Icon" />
                      </CardIcon>

                      <MaskedInput mask="9999 9999 9999 9999" maskChar=" ">
                        {(
                          inputProps: React.InputHTMLAttributes<HTMLInputElement>
                        ) => (
                          <CardNumberInput
                            {...inputProps}
                            placeholder="Card Number"
                          />
                        )}
                      </MaskedInput>

                      <MaskedInput mask="99/99" maskChar=" ">
                        {(
                          inputProps: React.InputHTMLAttributes<HTMLInputElement>
                        ) => (
                          <ExpiryInput {...inputProps} placeholder="MM / YY" />
                        )}
                      </MaskedInput>

                      <MaskedInput mask="999" maskChar=" ">
                        {(
                          inputProps: React.InputHTMLAttributes<HTMLInputElement>
                        ) => <CvcInput {...inputProps} placeholder="CVC" />}
                      </MaskedInput>
                    </CardDetails>
                    <SaveButton onClick={handlePaymentSubmit}>SUBMIT PAYMENT</SaveButton>
                  </CardInputContainer>
                </ThirdBox>
              )}
            </BoxContainer>
          </TextContainer>
          <PhotoContainer>
            <Wrapper1>
              <Image1 src={mask} />
              <Image2 src={jobs} />
              <Image3 src={luter} />
              <Image4 src={albert} />
              <Image5 src={deva} />
            </Wrapper1>
            <Wrapper2>
              <Image6 src={shadow} />
              <Image7 src={conversation} />
              <Image8 src={bigshadow} />
              <Image10 src={pinkshadow} />
            </Wrapper2>
          </PhotoContainer>
        </Section>
      </MainContainer>
    </Container>
  );
};

export default Paywall;
