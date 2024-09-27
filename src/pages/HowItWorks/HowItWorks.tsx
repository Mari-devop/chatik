import React from "react";
import { Container } from "../Home/Home.styled";
import { Box, Row } from "./HowItWorks.styled";
import {
  ArquitectaH5,
  AvenirH4,
  AvenirH3,
  TextMedium
} from "../../assets/css/Global.styled";
import { Boxik } from "../AccountDetails/AccountDetsils.styled";

const HowItWorks = () => {
  return (
    <Container>
          <Box>
            <Row>
              <Boxik>
                <ArquitectaH5 style={{ color: "white" }}>Free</ArquitectaH5>
              </Boxik>
              <AvenirH4
                style={{
                  color: "white",
                  marginTop: "12px",
                  marginBottom: "12px",
                }}
              >
                $0 / No registration needed
              </AvenirH4>
              <TextMedium
                style={{
                  color: "white",
                  marginTop: "0",
                  marginBottom: "0",
                }}
              >
                Proceed to ask 3 questions from the list to anyone character
                that you choose.
              </TextMedium>
            </Row>
            <Row>
              <Boxik>
                <ArquitectaH5 style={{ color: "white" }}>Trail</ArquitectaH5>
              </Boxik>
              <AvenirH4
                style={{
                  color: "white",
                  marginTop: "12px",
                  marginBottom: "12px",
                }}
              >
                $0 / Registration needed
              </AvenirH4>
              <TextMedium
                style={{
                  color: "white",
                  marginTop: "0",
                  marginBottom: "0",
                }}
              >
                Proceed registration and ask 5 questions to anyone character
                that you choose. Get 3 free questions when you share on social
                media.
              </TextMedium>
            </Row>
            <Row>
              <Boxik>
                <ArquitectaH5 style={{ color: "white" }}>PRO</ArquitectaH5>
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
              <TextMedium
                style={{
                  color: "white",
                  marginTop: "0",
                  marginBottom: "0",
                }}
              >
                Get unlimited questions, access to all characters and sms
                texting
              </TextMedium>
            </Row>
          </Box>
  
  
    </Container>
  );
};

export default HowItWorks;
