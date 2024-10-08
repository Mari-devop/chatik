import React, { useState, useEffect } from "react";
import { validateToken } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ColorRing } from "react-loader-spinner";
import { dbInstance } from "../../db";
import { User } from "../../components/menu/types";
import {
  Container,
  MainContainer,
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
  TextContainer,
  BoxContainer,
  PhotoContainer,
  FirstBox,
  SecondBox,
  ThirdBox,
  AvenirTitle,
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
  AvenirH4Text,
  TextMediumH4,
  AvenirText,
  CheckBoxText,
} from "./Paywall.styled";
import {
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure" | "share">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const users = await dbInstance.getData("users");
      const verifiedUser = users.find((user: any) => user.token);

      if (verifiedUser) {
        const tokenIsValid = await validateToken();
        if (tokenIsValid) {
          setIsAuthenticated(true);
        } else {
          await dbInstance.deleteData("users", verifiedUser.id);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleMakePayment = () => {
    if (!isAuthenticated) {
      setModalType("failure");
      setModalMessage("Please log in to subscribe");
      setIsModalVisible(true);
      return;
    }
    setIsMakePayment(false);
  };

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    setIsLoading(true);

    try {
      const users = await dbInstance.getData("users");
      if (!users || users.length === 0) {
        console.error("No user data found in IndexedDB");
        setIsLoading(false);
        return;
      }
      const verifiedUser = users.find((user: any) => user.token);

      if (!verifiedUser) {
        console.error("No verified user with token found");
        setIsLoading(false);
        return;
      }

      const userToken = verifiedUser.token;

      const tokenIsValid = await validateToken();
      if (!tokenIsValid) {
        setModalType("failure");
        setModalMessage("Your session has expired. Please login again.");
        setIsModalVisible(true);

        setTimeout(() => {
          setIsModalVisible(false);
          navigate("/");
        }, 3000);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("CardElement not found");
        setIsLoading(false);
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
        setIsLoading(false);
        return;
      }

      if (!paymentMethod) {
        setModalType("failure");
        setModalMessage("Payment method creation failed");
        setIsModalVisible(true);
        setIsLoading(false);
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

      if (result.error) {
        setModalType("failure");
        setModalMessage(result.error.message || "Payment failed");
        setIsModalVisible(true);
        setIsLoading(false);
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
        setIsLoading(false);
        return;
      }

      setIsPaymentConfirmed(true);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        console.error(
          "Token is expired or invalid, deleting token and redirecting to login..."
        );

        try {
          const users = await dbInstance.getData("users");
          const tokensToDelete: number[] = [];

          users.forEach((user: User) => {
            if (user.token) {
              tokensToDelete.push(user.id);
            }
          });

          for (const userId of tokensToDelete) {
            await dbInstance.deleteData("users", userId);
          }

          setModalType("failure");
          setModalMessage("Please login to complete the payment");
          setIsModalVisible(true);

          setTimeout(() => {
            setIsModalVisible(false);
            navigate("/");
          }, 3000);
        } catch (deleteError) {
          console.error("Error deleting token:", deleteError);
        }
      } else {
        setModalType("failure");
        setModalMessage("Payment failed");
        setIsModalVisible(true);
      }
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
    if (!isAuthenticated) {
      setModalType("success");
      setModalMessage("If you want to get 3 free questions, please log in");
      setShowModal(true);
      return;
    }

    try {
      const users = await dbInstance.getData("users");
      if (!users || users.length === 0) {
        console.error("No user data found in IndexedDB");
        return;
      }

      const verifiedUser = users.find((user: any) => user.token);

      if (!verifiedUser) {
        console.error("No verified user with token found");
        return;
      }

      const userToken = verifiedUser.token;

      const generatedLink = `${window.location.origin}/?token=${userToken}`;

      setShareLink(generatedLink);
      setModalType("share");
      setModalMessage("Share this link to get 3 free questions");

      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartChatting = () => {
    navigate("/", { state: { scrollToIndividuals: true } });
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (isMakePayment) {
          handleShareClick();
        } else if (isPaymentConfirmed) {
          handleStartChatting();
        } else {
          handlePaymentSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isMakePayment, isPaymentConfirmed]);

  const handleContainerClick = () => {
    navigate("/");
  };

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleContainerClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <ModalSuccess
        isVisible={showModal}
        modalType={modalType}
        shareLink={shareLink}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
      <Container onClick={handleContainerClick}>
        <MainContainer>
          <Section>
            <TextContainer>
              <AvenirTitle
                style={{ color: "white", marginTop: "0px", marginBottom: "0" }}
              >
                Unlock full features
              </AvenirTitle>
              <AvenirText>
                Share or subscribe to continue asking unlimited questions
              </AvenirText>
              <BoxContainer>
                {isMakePayment ? (
                  <>
                    <FirstBox onClick={handleInnerClick}>
                      <Type>
                        <TextMedium style={{ color: "#0E0E10" }}>
                          Free
                        </TextMedium>
                      </Type>
                      <AvenirH4Text
                        style={{
                          color: "white",
                          marginTop: "0",
                          marginBottom: "0",
                        }}
                      >
                        Share with a friend
                      </AvenirH4Text>
                      <TextMediumH4>
                        Get <span style={{ color: "#F82D98" }}>3 free</span>{" "}
                        questions when you share on social media
                      </TextMediumH4>
                      <Button onClick={handleShareClick}>SHARE</Button>
                    </FirstBox>
                    <SecondBox onClick={handleInnerClick}>
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

                      <SubscribeButton
                        onClick={() => {
                          if (!isAuthenticated) {
                            setModalType("failure");
                            setModalMessage("Please log in to subscribe.");
                            setShowModal(true);
                          } else {
                            handleMakePayment();
                          }
                        }}
                        style={{
                          backgroundImage: isAuthenticated
                            ? "linear-gradient(to right, #6a00f4, #c900ff)"
                            : "linear-gradient(to right, #303030, #929292)",
                          cursor: isAuthenticated ? "pointer" : "not-allowed",
                        }}
                      >
                        SUBSCRIBE
                      </SubscribeButton>
                    </SecondBox>
                  </>
                ) : isPaymentConfirmed ? (
                  <ThirdBox onClick={handleInnerClick}>
                    <CheckBox>
                      <CheckIcon src={check} />
                    </CheckBox>
                    <CheckBoxText>
                      You have successfully subscribed!
                    </CheckBoxText>
                    <TextMedium style={{ color: "white" }}>
                      A receipt was sent to your email
                    </TextMedium>
                    <SaveButton onClick={handleStartChatting}>
                      START CHATTING
                    </SaveButton>
                  </ThirdBox>
                ) : (
                  <ThirdBox onClick={handleInnerClick}>
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
                      {isLoading ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={[
                              "#f82d98",
                              "#f82d98",
                              "#F82D98",
                              "#5833ef",
                              "#5833ef",
                            ]}
                          />
                        </div>
                      ) : (
                        <SaveButton onClick={handlePaymentSubmit}>
                          SUBMIT PAYMENT
                        </SaveButton>
                      )}
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
