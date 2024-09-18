import React from "react";
import { Container } from "../Home/Home.styled";
import { Row, ButtonContainer, Button } from "../SignUp/SignUp.styled";
import { FirstBox, SecondBox, Boxik, Text, ButtonUpdate } from "./AccountDetsils.styled";
import { AvenirH2, AvenirH4, ArquitectaH5 } from "../../assets/css/Global.styled";
import Footer from "../../components/footer/Footer";

const AccountDetails = () => {
  return (
    <Container>
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
            <ArquitectaH5>PRO</ArquitectaH5>
        </Boxik>
        <AvenirH4>$10 / month</AvenirH4>
        <Text>Next payment will be processed on April 6, 2023</Text>
        <ButtonUpdate>UPDATE PAYMENT</ButtonUpdate>
      </SecondBox>
      <Footer />
    </Container>
  );
};

export default AccountDetails;
