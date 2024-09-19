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
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
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
    try {
      const response = await register(email, password);
      if (response && response.token) {
        setModalType("success");
        setModalMessage("Registration Successful! ");
        setIsModalVisible(true);
        setTimeout(() => navigate("/about"), 3000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setModalType("failure");
          setModalMessage("Please, check your email box to verify email!");
          setIsModalVisible(true);
        } else {
          setModalType("failure");
          setModalMessage("Error to sign up. Check your credentials!");
          setIsModalVisible(true);
        }
      }
      
    }
  };

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
          setModalType("success");
          setModalMessage(
            "Google Registration Successful! Please, check your email box to verify email!"
          );
          setIsModalVisible(true);
          setIsSignupOpen(false);
          setTimeout(() => navigate("/about"), 3000);
        }
      } catch (error) {
        setModalType("failure");
        setModalMessage("Google Registration Failed. Please try again.");
        setIsModalVisible(true);
      }
    },
    onError: (error) => {
      setModalType("failure");
      setModalMessage("Google Registration Failed. Please try again.");
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
