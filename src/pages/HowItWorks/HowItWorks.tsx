import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../Home/Home.styled";
import { Box, Row, AvenirH4Title } from "./HowItWorks.styled";
import { ArquitectaH5, TextMedium } from "../../assets/css/Global.styled";
import { Boxik } from "../AccountDetails/AccountDetsils.styled";

const HowItWorks = () => {
  const navigate = useNavigate();
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/");
  };

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Container onClick={handleContainerClick}>
      <Box onClick={handleInnerClick}>
        <Row>
          <Boxik>
            <ArquitectaH5 style={{ color: "white" }}>Free</ArquitectaH5>
          </Boxik>
          <AvenirH4Title>$0 / No registration needed</AvenirH4Title>
          <TextMedium
            style={{
              color: "white",
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            Proceed to ask 3 questions from the list to anyone character that
            you choose.
          </TextMedium>
        </Row>
        <Row>
          <Boxik>
            <ArquitectaH5 style={{ color: "white" }}>Trail</ArquitectaH5>
          </Boxik>
          <AvenirH4Title>$0 / Registration needed</AvenirH4Title>
          <TextMedium
            style={{
              color: "white",
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            Proceed registration and ask 5 questions to anyone character that
            you choose. Get 3 free questions when you share on social media.
          </TextMedium>
        </Row>
        <Row>
          <Boxik>
            <ArquitectaH5 style={{ color: "white" }}>PRO</ArquitectaH5>
          </Boxik>
          <AvenirH4Title>$10 / month</AvenirH4Title>
          <TextMedium
            style={{
              color: "white",
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            Get unlimited questions, access to all characters and sms texting
          </TextMedium>
        </Row>
      </Box>
    </Container>
  );
};

export default HowItWorks;
