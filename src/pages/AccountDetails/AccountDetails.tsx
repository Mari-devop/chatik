import React, { useState } from "react";

import { Container } from "../Home/Home.styled";
import { Row, Button } from "../SignUp/SignUp.styled";
import {
  FirstBox,
  SecondBox,
  Boxik,
  Text,
  ButtonUpdate,
  ButtonContainer,
  ButtonCancel,
  ImageUp,
  ImageDown,
  CardInputContainer,
  CardDetails,
  CardIcon,
  MaskedInput,
  CardNumberInput,
  ExpiryInput,
  CvcInput,
  SaveButton,
} from "./AccountDetsils.styled";
import {
  AvenirH2,
  AvenirH4,
  ArquitectaH5,
} from "../../assets/css/Global.styled";
import Footer from "../../components/footer/Footer";
import up from "../../assets/images/accountDetails/up.png";
import down from "../../assets/images/accountDetails/down.png";
import card from "../../assets/images/accountDetails/Credit Cards.png";

const AccountDetails = () => {
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(true);

  const handleUpdatePayment = () => {
    setIsUpdatingPayment(false);
  };
  return (
    <Container>
      <ImageUp src={up} />
      <FirstBox>
        <AvenirH2>Account Details</AvenirH2>
        <Row>
          <label htmlFor="name">Name</label>
          <input type="name" id="name" placeholder="Justin Mac" />
        </Row>
        <Row>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="justin@gmail.com" />
        </Row>
        <Row>
          <label htmlFor="tel">Phone number</label>
          <input type="tel" id="tel" placeholder="+380 055 555-55-55" />
        </Row>
        <Row>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="********" />
        </Row>
        <ButtonContainer>
          <Button>SAVE</Button>
        </ButtonContainer>
      </FirstBox>
      <SecondBox>
        <Boxik>
          <ArquitectaH5 style={{ color: "white" }}>PRO</ArquitectaH5>
        </Boxik>
        <AvenirH4
          style={{ color: "white", marginTop: "12px", marginBottom: "12px" }}
        >
          $10 / month
        </AvenirH4>
        <Text>Next payment will be processed on April 6, 2023</Text>
        {isUpdatingPayment ? (
          <>
            <ButtonUpdate onClick={handleUpdatePayment}>
              UPDATE PAYMENT
            </ButtonUpdate>
            <ButtonCancel>CANCEL SUBSCRIPTION</ButtonCancel>
          </>
        ) : (
          <CardInputContainer>
            <CardDetails>
              <CardIcon>
                <img src={card} alt="Card Icon" />
              </CardIcon>
             
              <MaskedInput
                mask="9999 9999 9999 9999"
                maskChar=" "
              >
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <CardNumberInput {...inputProps} placeholder="Card Number" />
                )}
              </MaskedInput>

              <MaskedInput
                mask="99/99"
                maskChar=" "
              >
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <ExpiryInput {...inputProps} placeholder="MM / YY" />
                )}
              </MaskedInput>

              <MaskedInput
                mask="999"
                maskChar=" "
              >
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <CvcInput {...inputProps} placeholder="CVC" />
                )}
              </MaskedInput>
             
            </CardDetails>
            <SaveButton>SAVE</SaveButton>
          </CardInputContainer>
        )}
      </SecondBox>
      <ImageDown src={down} />
      <Footer />
    </Container>
  );
};

export default AccountDetails;
