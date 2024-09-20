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
  checkAuthentication: () => Promise<boolean>;
  setIsAuthenticated: (value: boolean) => void;
  emailFromReset?: string;
}

const Login: React.FC<LoginProps> = ({
  setIsLoginOpen,
  setIsSignupOpen,
  checkAuthentication,
  setIsAuthenticated,
  emailFromReset,
}) => {
  const [email, setEmail] = useState(emailFromReset || "");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("failure");
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
        setModalType("success");
        setModalMessage("Login Successful!");
        await dbInstance.addData("users", {
          email: response.email,
          token: response.token,
        });
        setIsAuthenticated(true);
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
          setIsLoginOpen(false);
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setModalType("failure");
          setModalMessage("Invalid email or password");
          setIsModalVisible(true);
          setIsAuthenticated(false);
          setTimeout(() => {
            setIsModalVisible(false);
          }, 5000);
        } else {
          setModalType("failure");
          setModalMessage("Login Failed. Please try again.");
          setIsModalVisible(true);
          setIsAuthenticated(false);
          setTimeout(() => {
            setIsModalVisible(false);
          }, 5000);
        }
      }
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
          await dbInstance.addData("users", {
            email: res.data.email,
            token,
            name: userName,
          });
          setModalType("success");
          setModalMessage("Google Login Successful!");
          setIsAuthenticated(true);
          setIsModalVisible(true);
          setIsLoginOpen(false);
          navigate("/");
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

  useEffect(() => {
    const getEmailFromDB = async () => {
      const users = await dbInstance.getData("users");
      if(users && users.length > 0) {
        const lastRegisteredUser = users[users.length - 1];
        setEmail(lastRegisteredUser.email);
      } 
    };
    getEmailFromDB();
  },[])
  
  const handleForgotPassword = async () => {
    if (!email) {
      setIsEmailValid(false); 
      return; 
    }
    try {
      const response = await axios.post(
        "https://eternalai.fly.dev/user/forgotten-pass",
        { email }
      );
      if (response.status === 200) {
        setModalType("success");
        setModalMessage("An email has been sent to reset your password.");
        setIsModalVisible(true);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        setModalType("failure");
        setModalMessage("Email not found. Sign up first.");
        setIsModalVisible(true);
      } else {
        setModalType("failure");
        setModalMessage("Failed to send reset email. Please try again.");
        setIsModalVisible(true);
      }
    }
  };

  useEffect(() => {
    if (email) {
      setIsEmailValid(true); 
    }
  }, [email]);

  return (
    <>
      <ModalSuccess
        isVisible={isModalVisible}
        modalType={modalType}
        message={modalMessage}
        onClose={() => setIsModalVisible(false)} 
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
              style={{
                borderColor: !isEmailValid ? "red" : "", 
              }}
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
            <ButtonSecondary onClick={handleForgotPassword}>
              Forgot password?
            </ButtonSecondary>
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
