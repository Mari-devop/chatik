import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { dbInstance } from "../../db";
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
  SaveButton,
} from "./AccountDetsils.styled";
import {
  AvenirH2,
  AvenirH4,
  ArquitectaH5,
} from "../../assets/css/Global.styled";
import Footer from "../../components/footer/Footer";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import up from "../../assets/images/accountDetails/up.png";
import down from "../../assets/images/accountDetails/down.png";

const AccountDetails = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    hasSubscription: false,
  });
  const [isPaymentUpdated, setIsPaymentUpdated] = useState(false);
  const [showCardInput, setShowCardInput] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
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

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateUserData = async () => {
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
        await dbInstance.addData("users", updatedData);
      }

    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleUpdatePayment = async () => {
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
        setModalMessage("An error occurred during payment processing");
        setIsModalVisible(true);
        return;
      }

      if (!paymentMethod) {
        setModalType("failure");
        setModalMessage("An error occurred during payment processing");
        setIsModalVisible(true);
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
        setModalType("success");
        setModalMessage("Payment updated successfully");
        setIsModalVisible(true);
      }
      if (result.error) {
        setModalType("failure");
        setModalMessage("An error occurred during payment processing");
        setIsModalVisible(true);
        return;
      }
      setIsPaymentUpdated(true);
    } catch (error: any) {
      console.error(error);
      setModalType("failure");
      setModalMessage("An error occurred during payment processing");
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder={userData.email || ""}
              value={userData.email || ""}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Row>
          <Row>
            <label htmlFor="tel">Phone number</label>
            <input
              type="tel"
              id="tel"
              placeholder={userData.phone || "+380 055 555-55-55"}
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
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
            />
          </Row>
          <ButtonContainer>
            <Button onClick={handleUpdateUserData}>SAVE</Button>
          </ButtonContainer>
        </FirstBox>

        {userData.hasSubscription && (
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
            <Text>Next payment will be processed on April 6, 2023</Text>
            {!showCardInput ? (
              <>
                <ButtonUpdate onClick={() => setShowCardInput(true)}>
                  UPDATE PAYMENT
                </ButtonUpdate>
                <ButtonCancel onClick={handleCancelSubscription}>
                  CANCEL SUBSCRIPTION
                </ButtonCancel>
              </>
            ) : (
              <CardInputContainer>
                <CardDetails>
                  <div style={{ marginBottom: "0px", width: "100%" }}>
                    <CardElement options={cardElementOptions} />
                  </div>
                </CardDetails>
                <SaveButton onClick={handleUpdatePayment}>SAVE</SaveButton>
              </CardInputContainer>
            )}
          </SecondBox>
        )}

        <ImageDown src={down} />
        <Footer />
      </Container>
    </>
  );
};

export default AccountDetails;
