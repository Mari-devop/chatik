import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { register } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { dbInstance } from "../../db";
import {
  BoxContainer,
  Row,
  Button,
  ButtonContainer,
  Divider,
  Text,
  TextCenter,
  LinkStyled,
} from "./SignUp.styled";
import { UserContainer, CustomGoogleButton } from "../Login/Login.styled";
import { Navbar } from "../../components/menu/Menu.styled";
import {
  ImageContainer,
  Image,
  CloseIcon,
} from "../../components/navbar/Navbar.styled";
import { AvenirH2, TextMedium } from "../../assets/css/Global.styled";
import logo from "../../assets/images/logo.png";
import googleIcon from "../../assets/images/Group.png";

interface SignupProps {
  setIsSignupOpen: (value: boolean) => void;
  setIsLoginOpen: (value: boolean) => void; 
}

const SignUp: React.FC<SignupProps> = ({ setIsSignupOpen, setIsLoginOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCloseClick = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false); 
  };

  const handleLogoClick = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false); 
  };

  const handleRegister = async () => {
    const response = await register(email, password);
    if (response) {
      navigate("/about");
    }
  };

  // const handleGoogleRegister = async (response: any) => {
  //   const googleToken = response.credential;

  //   try {
  //     const res = await axios.post("https://eternalai.fly.dev/user/register", {
  //       email,
  //       password,
  //       googleToken,
  //     });

  //     if (res.data.token) {
  //       await dbInstance.addData("users", { email, password, googleToken });
  //       navigate("/about");
  //     }
  //   } catch (error) {
  //     console.error("Registration Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   window.google.accounts.id.initialize({
  //     client_id:
  //       "297917996967-5i0m39clbr19umnqtclsg7gken22896e.apps.googleusercontent.com",
  //     callback: handleGoogleRegister,
  //   });

  //   window.google.accounts.id.renderButton(
  //     document.getElementById("google-button-signup"),
  //     {
  //       theme: "filled_black",
  //       size: "large",
  //       text: "sign_up_with_google",
  //     }
  //   );
  // }, []);

  const googleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleToken = tokenResponse.access_token;

        const res = await axios.post(
          "https://eternalai.fly.dev/user/register",
          {
            googleToken,
          }
        );

        if (res.data.token) {
          await dbInstance.addData("users", {
            email: res.data.email,
            googleToken,
          });
          navigate("/about");
          setIsSignupOpen(false);
        }
      } catch (error) {
        console.error("Google Registration Error:", error);
      }
    },
    onError: (error) => {
      console.error("Google Sign-Up Failed:", error);
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <UserContainer>
        <Navbar>
          <CloseIcon onClick={handleCloseClick} />
          <ImageContainer>
            <Image src={logo} alt="logo" onClick={handleLogoClick} />
          </ImageContainer>
        </Navbar>
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
            <CustomGoogleButton onClick={() => googleSignUp()}>
              <img src={googleIcon} alt="google" />
              SIGN UP WITH GOOGLE
            </CustomGoogleButton>
            <Button onClick={handleRegister}>SIGN UP</Button>
          </ButtonContainer>
          <Divider />
          <TextCenter>
            <Text>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsSignupOpen(false);
                  setIsLoginOpen(true);
                }}
                style={{ cursor: "pointer", color: "#F82D98" }}
              >
                Sign in
              </span>
            </Text>
          </TextCenter>
        </BoxContainer>
      </UserContainer>
    </>
  );
};

export default SignUp;
