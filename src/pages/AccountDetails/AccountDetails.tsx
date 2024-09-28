import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputMask from "react-input-mask";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { User } from "../../components/menu/types";
import { ColorRing } from "react-loader-spinner";
import { dbInstance } from "../../db";
import { Container } from "../Home/Home.styled";
import { Row } from "../SignUp/SignUp.styled";
import { CheckBox, SaveButton } from "../Paywall/Paywall.styled";
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
  SaveButtonPay,
  Button,
  VerificationIcon,
  EmailContainer,
} from "./AccountDetsils.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  AvenirH2,
  AvenirH4,
  ArquitectaH5,
} from "../../assets/css/Global.styled";
import Footer from "../../components/footer/Footer";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import up from "../../assets/images/accountDetails/up.png";
import down from "../../assets/images/accountDetails/down.png";
import check from "../../assets/images/paywall/check 1.png";

const AccountDetails = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    hasSubscription: false,
    isVerified: false,
    nextBillingDate: "",
  });
  const [isPaymentUpdated, setIsPaymentUpdated] = useState(false);
  const [showCardInput, setShowCardInput] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formattedDate = new Date(userData.nextBillingDate).toLocaleDateString();
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleStartChatting = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    setShowCardInput(true);
  };

  useEffect(() => {
    validateForm();
  }, [userData]);

  const validateEmail = (email: string) => {
    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true;
    const phoneRegex = /^\+380 \d{2} \d{3} \d{2} \d{2}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    if (!password) return true;
    return password ? password.length >= 8 : false;
  };

  const validateForm = () => {
    const isEmailValid = validateEmail(userData.email);
    const isPhoneValid = validatePhone(userData.phone);
    const isPasswordValid = validatePassword(userData.password);

    setEmailError(!isEmailValid);
    setPhoneError(!isPhoneValid);
    setPasswordError(!isPasswordValid);

    setIsFormValid(isEmailValid && isPhoneValid && isPasswordValid);
  };

  const fetchUserProfile = async () => {
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

      const response = await axios.get(
        "https://eternalai.fly.dev/user/profile",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const profileData = response.data;
      if (!profileData.isVerified) {
        setTimeout(() => {
          setModalType("failure");
          setModalMessage("Please, check your email box to verify your email!");
          setIsModalVisible(true);
        }, 3000);
      }
      setUserData({
        ...profileData,
        nextBillingDate: profileData.nextBillingDate,
        isVerified: false,
      });

      console.log(response.data);
    } catch (error: any) {
      console.error("Error fetching user profile:", error);

      if (error.response?.status === 401) {
        console.error(
          "Token is expired or invalid, deleting token and redirecting to login..."
        );

        try {
          const users = await dbInstance.getData("users");
          const currentUser = users.find((user: User) => user.token);

          if (currentUser) {
            // await dbInstance.deleteData("users", currentUser.id);

            setModalType("failure");
            setModalMessage(
              "Please, check your email box to verify your email!"
            );
            setIsModalVisible(true);

            setTimeout(() => {
              setIsModalVisible(false);
              navigate("/");
            }, 3000);
          } else {
            console.error("No user with token found to delete");
          }
        } catch (error) {
          console.error("Error deleting token:", error);
        }
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleUpdateUserData = async () => {
    if (!isFormValid) return;

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

      const updatedData = {
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        password: userData.password,
      };

      const response = await axios.put(
        "https://eternalai.fly.dev/user/profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // await dbInstance.addData("users", updatedData);
        console.log(response.data);
        setModalType("success");
        setModalMessage("User data updated successfully");
        setIsModalVisible(true);

        setTimeout(async () => {
          setIsModalVisible(false);
          await fetchUserProfile();
        }, 3000);
      }
    } catch (error: any) {
      console.error("Error updating user data:", error);
      if (error.response?.status === 401) {
        console.error(
          "Token is expired or invalid, deleting token and redirecting to login..."
        );

        try {
          const users = await dbInstance.getData("users");
          const currentUser = users.find((user: User) => user.token);

          if (currentUser) {
            // await dbInstance.deleteData("users", currentUser.id);

            setModalType("failure");
            setModalMessage("Please login to access your profile");
            setIsModalVisible(true);

            setTimeout(() => {
              setIsModalVisible(false);
              navigate("/");
            }, 3000);
          } else {
            console.error("No user with token found to delete");
          }
        } catch (error) {
          console.error("Error deleting token:", error);
        }
      }
    }
  };

  const handleUpdatePayment = async () => {
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
      const userToken = users[0]?.token;

      if (!userToken) {
        console.error("No token found for the user");
        setIsLoading(false);
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
        setModalMessage("An error occurred during payment processing");
        setIsModalVisible(true);
        setIsLoading(false);
        return;
      }

      if (!paymentMethod) {
        setModalType("failure");
        setModalMessage("An error occurred during payment processing");
        setIsModalVisible(true);
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        "https://eternalai.fly.dev/payment/update-subscription",
        {
          method: "PUT",
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
        setIsPaymentUpdated(true);
      }
      if (result.error) {
        setModalType("failure");
        setModalMessage("An error occurred during payment processing");
        setIsModalVisible(true);
        setIsLoading(false);
        return;
      }

      setIsPaymentUpdated(true);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setModalType("failure");
      setModalMessage("An error occurred during payment processing");
      setIsModalVisible(true);
      setIsLoading(false);
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

  const handleCancelSubscription = async () => {
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

      const response = await axios.delete(
        "https://eternalai.fly.dev/payment/cancel-subscription",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        setUserData((prevData) => ({
          ...prevData,
          hasSubscription: false,
        }));
        setModalType("success");
        setModalMessage("Subscription cancelled successfully");
        setIsModalVisible(true);
      }
    } catch (error) {
      setModalType("failure");
      setModalMessage("An error occurred while cancelling subscription");
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <ModalSuccess
        isVisible={isModalVisible}
        modalType={modalType}
        message={modalMessage}
        onClose={() => setIsModalVisible(false)}
      />
      <Container>
        <ImageUp src={up} />
        <FirstBox>
          <AvenirH2>Account Details</AvenirH2>
          <Row>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              placeholder={userData.name || "Justin Mac"}
              value={userData.name || ""}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Row>
          <Row>
            <EmailContainer>
              <label htmlFor="email">Email</label>
              <VerificationIcon>
                {userData.isVerified ? (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    style={{ color: "red" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "green" }}
                  />
                )}
              </VerificationIcon>
            </EmailContainer>
            <input
              type="email"
              id="email"
              placeholder={userData.email || ""}
              value={userData.email || ""}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              style={{
                borderColor: emailError ? "red" : "",
              }}
            />
          </Row>
          <Row>
            <label htmlFor="phone">Phone number</label>
            <InputMask
              mask="+380 99 999 99 99"
              value={userData.phone || ""}
              placeholder="+380 99 999 99 99"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              style={{
                borderColor: phoneError ? "red" : "",
              }}
            >
              {(inputProps: any) => <input {...inputProps} type="tel" />}
            </InputMask>
          </Row>
          <Row>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              style={{
                borderColor: passwordError ? "red" : "",
              }}
            />
          </Row>
          <ButtonContainer>
            <Button onClick={handleUpdateUserData} disabled={!isFormValid}>
              SAVE
            </Button>
          </ButtonContainer>
        </FirstBox>

        {isPaymentUpdated ? (
          <SecondBox>
            <CheckBox>
              <img src={check} alt="check" />
            </CheckBox>
            <AvenirH4 style={{ color: "white", margin: "12px 0" }}>
              You have successfully subscribed!
            </AvenirH4>
            <Text style={{ color: "white" }}>
              A receipt was sent to your email
            </Text>
            <SaveButton onClick={handleStartChatting}>
              START CHATTING
            </SaveButton>
          </SecondBox>
        ) : (
          userData.hasSubscription && (
            <SecondBox>
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
              <Text>
                Next payment will be processed on {formattedDate || "N/A"}
              </Text>
              {!showCardInput ? (
                <div>
                  <ButtonUpdate onClick={handleSubmit}>
                    UPDATE PAYMENT
                  </ButtonUpdate>

                  <ButtonCancel onClick={handleCancelSubscription}>
                    CANCEL SUBSCRIPTION
                  </ButtonCancel>
                </div>
              ) : (
                <CardInputContainer>
                  <CardDetails>
                    <div style={{ marginBottom: "0px", width: "100%" }}>
                      <CardElement options={cardElementOptions} />
                    </div>
                  </CardDetails>
                  {isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                          "#5833EF",
                          "#5833EF",
                          "#F82D98",
                          "#F82D98",
                          "#B5E42E",
                        ]}
                      />
                    </div>
                  ) : (
                    <SaveButtonPay onClick={handleUpdatePayment}>
                      SAVE
                    </SaveButtonPay>
                  )}
                </CardInputContainer>
              )}
            </SecondBox>
          )
        )}

        <ImageDown src={down} />
        <Footer />
      </Container>
    </>
  );
};

export default AccountDetails;
