import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    hasSubscription: false, 
  });

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

        const response = await axios.get("https://eternalai.fly.dev/user/profile", {
          headers: {
            Authorization: `Bearer ${userToken}`, 
          },
        });

        console.log("User profile fetched:", response.data);
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
      console.log("Updated data:", updatedData);

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

      if(response.status === 200) {
        await dbInstance.addData("users", updatedData);
      }

      console.log("User data updated:", response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

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
          <input
            type="name"
            id="name"
            placeholder={userData.name || "Justin Mac"}
            value={userData.name || ""}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </Row>
        <Row>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder={userData.email || ""}
            value={userData.email || ""}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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

              <MaskedInput mask="9999 9999 9999 9999" maskChar=" ">
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <CardNumberInput {...inputProps} placeholder="Card Number" />
                )}
              </MaskedInput>

              <MaskedInput mask="99/99" maskChar=" ">
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <ExpiryInput {...inputProps} placeholder="MM / YY" />
                )}
              </MaskedInput>

              <MaskedInput mask="999" maskChar=" ">
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <CvcInput {...inputProps} placeholder="CVC" />
                )}
              </MaskedInput>
            </CardDetails>
            <SaveButton>SAVE</SaveButton>
          </CardInputContainer>
          )}
        </SecondBox>
      )}

      <ImageDown src={down} />
      <Footer />
    </Container>
  );
};

export default AccountDetails;
