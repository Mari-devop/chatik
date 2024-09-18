import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "../../auth/auth";
import { dbInstance } from "../../db";
import { useNavigate } from "react-router-dom";
import {
  BoxContainer,
  Row,
  Button,
  ButtonContainer,
  Divider,
  Text,
  TextCenter,
} from "../SignUp/SignUp.styled";
import {
  ButtonSecondary,
  UserContainer,
  CustomGoogleButton,
} from "./Login.styled";
import { Navbar } from "../../components/menu/Menu.styled";
import {
  ImageContainer,
  Image,
  CloseIcon,
} from "../../components/navbar/Navbar.styled";
import { AvenirH2 } from "../../assets/css/Global.styled";
import googleIcon from "../../assets/images/Group.png";
import logo from "../../assets/images/logo.png";

interface LoginProps {
  setIsLoginOpen: (value: boolean) => void;
  setIsSignupOpen: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoginOpen, setIsSignupOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCloseClick = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  const handleLogoClick = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response) {
      navigate("/about");
    }
  };

  // const handleGoogleLogin = async (response: any) => {
  //   const googleToken = response.credential;

  //   try {
  //     const res = await axios.post("https://eternalai.fly.dev/user/login", {
  //       email,
  //       password,
  //       googleToken,
  //     });

  //     if (res.data.token) {
  //       await dbInstance.addData("users", { email, password, googleToken });
  //       navigate("/about");
  //     }
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   window.google.accounts.id.initialize({
  //     client_id:
  //       "297917996967-5i0m39clbr19umnqtclsg7gken22896e.apps.googleusercontent.com",
  //     callback: handleGoogleLogin,
  //   });

  //   window.google.accounts.id.renderButton(
  //     document.getElementById("google-button-login"),
  //     {
  //       theme: "outline",
  //       size: "large",
  //       text: "continue_with",
  //     }
  //   );
  // }, []);

  
  const googleLogin = useGoogleLogin({
    flow: "implicit",
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      try {
        const googleAccessToken = tokenResponse.access_token;
        console.log(googleAccessToken)
        const profileResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`
        );
  
        const userProfile = profileResponse.data;
        const userName = userProfile.name; 
        console.log("User Name:", userName);

        const res = await axios.post("https://eternalai.fly.dev/user/login", {
          googleToken: googleAccessToken,
          email,
          password,
          name: userName
        });

        const token = res.data.token;
        console.log(`"Token": ${token}`);
        console.log(`Data: ${res.data}`);

        if (token) {
          console.log('HERE');
          await dbInstance.addData("users", {
            email: res.data.email,
            token,
            name: userName
          });
          navigate("/about");
        }
      } catch (error) {
        console.error("Google Login Error:", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
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
          <AvenirH2>Login</AvenirH2>
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
          <Row>
            <ButtonSecondary>Forgot password?</ButtonSecondary>
          </Row>
          <ButtonContainer>
            <CustomGoogleButton onClick={() => googleLogin()}>
              <img src={googleIcon} alt="google" />
              SIGN IN WITH GOOGLE
            </CustomGoogleButton>
            <Button onClick={handleLogin}>SIGN IN</Button>
          </ButtonContainer>
          <Divider />
          <TextCenter>
            <Text>
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsSignupOpen(true);
                }}
                style={{ cursor: "pointer", color: "#F82D98" }}
              >
                Sign up
              </span>
            </Text>
          </TextCenter>
        </BoxContainer>
      </UserContainer>
    </>
  );
};

export default Login;
