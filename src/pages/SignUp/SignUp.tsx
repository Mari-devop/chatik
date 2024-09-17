import React, { useState, useEffect } from "react";
import axios from "axios";
import { register } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { dbInstance } from "../../db";
import {
  UserContainer,
  BoxContainer,
  Row,
  ButtonGoogle,
  Button,
  ButtonContainer,
  Divider,
  Text,
  TextCenter,
  LinkStyled,
} from "./SignUp.styled";
import { AvenirH2, TextMedium } from "../../assets/css/Global.styled";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await register(email, password);
    if (response) {
      navigate("/about");
    }
  };

  const handleGoogleRegister = async (response: any) => {
    const googleToken = response.credential;

    try {
      const res = await axios.post("https://eternalai.fly.dev/user/register", {
        email,
        password,
        googleToken,
      });

      if (res.data.token) {
        await dbInstance.addData("users", { email, password, googleToken });
        navigate("/about");
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "297917996967-5i0m39clbr19umnqtclsg7gken22896e.apps.googleusercontent.com",
      callback: handleGoogleRegister,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-button-signup"),
      {
        theme: "filled_black",
        size: "large",
        text: "sign_up_with_google",
      }
    );
  }, []);

  return (
    <UserContainer>
      <BoxContainer>
        <AvenirH2>Get started</AvenirH2>
        <TextMedium>To continue please create an account</TextMedium>
        <Row>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="justin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Row>
        <Row>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Row>
        <ButtonContainer>
          <div id="google-button-signup">
            {/* <img src={googleIcon} alt="google" />
            <span>SIGN UP WITH GOOGLE</span> */}
          </div>
          <Button onClick={handleRegister}>SIGN UP</Button>
        </ButtonContainer>
        <Divider />
        <TextCenter>
          <Text>
            Already have an account?{" "}
            <LinkStyled to="/login">Sign in</LinkStyled>
          </Text>
        </TextCenter>
      </BoxContainer>
    </UserContainer>
  );
};

export default SignUp;
