import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { dbInstance } from "../../db";
import {
  Container,
  MainContainer,
  PhotoContainer,
  TextContainer,
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
  Image10,
} from "../Home/Home.styled";
import {
  Section,
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
  CheckIcon,
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
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
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

const Paywall = () => {
  const [isMakePayment, setIsMakePayment] = useState(true);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [shareLink, setShareLink] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleMakePayment = () => {
    setIsMakePayment(false);
  };

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    try {
      const users = await dbInstance.getData("users");
      if (!users || users.length === 0) {
        console.error("No user data found in IndexedDB");
        return;
      }
      const userToken = users[0]?.token;

      if (!userToken) {
        console.error("No token found for the user");
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("CardElement not found");
        return;
      }
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
      });

      if (error) {
        setModalType("failure");
        setModalMessage("Payment method creation failed");
        setIsModalVisible(true);
        return;
      }

      if (!paymentMethod) {
        setModalType("failure");
        setModalMessage("Payment method creation failed");
        setIsModalVisible(true);
        return;
      }

      const response = await fetch(
        "https://eternalai.fly.dev/payment/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            priceId: "price_1JZ5ZwJ9z1Z6ZzZzZzZzZzZz",
          }),
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        setModalType("success");
        setModalMessage("Payment successful");
        setIsModalVisible(true);
        return;
      }

      if (result.error) {
        setModalType("failure");
        setModalMessage(result.error.message || "Payment failed");
        setIsModalVisible(true);
        return;
      }

      const { clientSecret } = result;
      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret
      );
      if (confirmError) {
        setModalType("failure");
        setModalMessage(confirmError.message || "Payment failed");
        setIsModalVisible(true);
        return;
      }

      setIsPaymentConfirmed(true);
    } catch (error: any) {
      console.error(error);
      setModalType("failure");
      setModalMessage("Payment failed");
      setIsModalVisible(true);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#FFFFFF80",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#FFFFFF80",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  const handleShareClick = async () => {
    try {
      const users: any = await dbInstance.getData("users");
      const userToken = users?.[0]?.token;

      if (!userToken) {
        return;
      }

      const generatedLink = `${window.location.origin}/?token=${userToken}`;
      setShareLink(generatedLink);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartChatting = () => {
    navigate("/", { state: { scrollToIndividuals: true } });
  };

  return (
    <>
      <ModalSuccess
        isVisible={showModal}
        modalType="share"
        shareLink={shareLink}
        message="Share this link to your friend"
        onClose={() => setShowModal(false)}
      />
      <Container>
        <MainContainer>
          <Section>
            <TextContainer>
              <AvenirH2
                style={{ color: "white", marginTop: "0px", marginBottom: "0" }}
              >
                Unlock full features
              </AvenirH2>
              <TextMedium style={{ margin: "0" }}>
                Share or subscribe to continue asking unlimited questions
              </TextMedium>
              <BoxContainer>
                {isMakePayment ? (
                  <>
                    <FirstBox>
                      <Type>
                        <TextMedium style={{ color: "#0E0E10" }}>
                          Free
                        </TextMedium>
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
                      <Button onClick={handleShareClick}>SHARE</Button>
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
                    <SaveButton onClick={handleStartChatting}>
                      START CHATTING
                    </SaveButton>
                  </ThirdBox>
                ) : (
                  <ThirdBox>
                    <Boxik>
                      <ArquitectaH5 style={{ color: "white" }}>
                        PRO
                      </ArquitectaH5>
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
                        <div style={{ marginBottom: "0px", width: "100%" }}>
                          <CardElement options={cardElementOptions} />
                        </div>
                      </CardDetails>
                      <SaveButton onClick={handlePaymentSubmit}>
                        SUBMIT PAYMENT
                      </SaveButton>
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
    </>
  );
};

export default Paywall;
