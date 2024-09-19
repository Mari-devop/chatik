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
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
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
  checkAuthentication: () => Promise<void>; 
}

const Login: React.FC<LoginProps> = ({ setIsLoginOpen, setIsSignupOpen, checkAuthentication }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
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
    try {
      const response = await login(email, password);
      if (response && response.token) {
        setModalType('success');
        setModalMessage('Login Successful!');
        setIsModalVisible(true);
        checkAuthentication();
        setTimeout(() => navigate("/about"), 3000);
      }
    } catch (error) {
      setModalType('failure');
      setModalMessage('Login Failed. Please try again.');
      setIsModalVisible(true);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      try {
        const googleAccessToken = tokenResponse.access_token;

        const profileResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`
        );

        const userProfile = profileResponse.data;
        const userName = userProfile.name;

        const res = await axios.post("https://eternalai.fly.dev/user/login", {
          googleToken: googleAccessToken,
          email,
          password,
          name: userName,
        });

        const token = res.data.token;

        if (token) {
          console.log("HERE");
          await dbInstance.addData("users", {
            email: res.data.email,
            token,
            name: userName,
          });
          setModalType("success");
          setModalMessage("Google Login Successful!");
          setIsModalVisible(true);
          checkAuthentication();
          setIsLoginOpen(false);
          setTimeout(() => navigate("/about"), 3000);
        }
      } catch (error) {
        setModalType("failure");
        setModalMessage("Google Login Failed. Please try again.");
        setIsModalVisible(true);
      }
    },
    onError: (error) => {
      setModalType("failure");
      setModalMessage("Google Login Failed. Please try again.");
      setIsModalVisible(true);
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
      <ModalSuccess
        isVisible={isModalVisible}
        modalType={modalType}
        message={modalMessage}
      />
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
