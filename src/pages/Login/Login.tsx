import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FocusTrap from "focus-trap-react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "../../auth/auth";
import { dbInstance } from "../../db";
import { LoginProps } from "./types";
import {
  BoxContainer,
  Row,
  Button,
  ButtonContainer,
  Text,
  TextCenter,
} from "../SignUp/SignUp.styled";
import {
  ButtonSecondary,
  UserContainer,
  CustomGoogleButton,
  StyledIcon,
  AvenirTitle,
  Divider,
} from "./Login.styled";
import {
  ImageContainer,
  Image,
  CloseIcon,
} from "../../components/navbar/Navbar.styled";
import { Navbar } from "../../components/menu/Menu.styled";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import googleIcon from "../../assets/images/Group.png";
import logo from "../../assets/images/logo.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleContainerClick = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    navigate("/"); 
  };

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

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
        // await dbInstance.addData("users", {
        //   email: response.email,
        //   token: response.token,
        // });
        setIsAuthenticated(true);
        setIsModalVisible(true);

        setIsLoginOpen(false);
        navigate("/");
      }
    } catch (error: any) {
      console.log("Error details:", error);

      if (error.response) {
        if (error.response.status === 401) {
          setModalType("failure");
          setModalMessage("Invalid email or password");
        } else if (error.response.status === 500) {
          setModalType("failure");
          setModalMessage("Server error. Please try again later.");
        } else {
          setModalType("failure");
          setModalMessage("Login Failed. Please try again.");
        }
      } else {
        setModalType("failure");
        setModalMessage("Network error. Please check your connection.");
      }
      setIsModalVisible(true);
      console.log("Modal should now be visible");
      setIsAuthenticated(false);
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
      if (users && users.length > 0) {
        const lastRegisteredUser = users[users.length - 1];
        setEmail(lastRegisteredUser.email);
      }
    };
    getEmailFromDB();
  }, []);

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
      } else if (error.response.status === 500) {
        setModalType("failure");
        setModalMessage("Email or password is invalid");
      } else {
        setModalType("failure");
        setModalMessage("Failed to send reset email. Please try again.");
      }
      setIsModalVisible(true);
    }
  };

  useEffect(() => {
    if (email) {
      setIsEmailValid(true);
    }
  }, [email]);

  useEffect(() => {
    console.log("Modal visibility state:", isModalVisible);
  }, [isModalVisible]);

  return (
    <FocusTrap>
      <div role="dialog" aria-modal="true">
        <ModalSuccess
          isVisible={isModalVisible}
          modalType={modalType}
          message={modalMessage}
          onClose={() => setIsModalVisible(false)}
        />
        <UserContainer onClick={handleContainerClick}>
          <Navbar>
            <CloseIcon onClick={handleCloseClick} />
            <ImageContainer>
              <Image src={logo} alt="logo" onClick={handleLogoClick} />
            </ImageContainer>
          </Navbar>
          <BoxContainer onClick={handleInnerClick}>
            <AvenirTitle>Login</AvenirTitle>
            <Row>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="justin@gmail.com"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderColor: !isEmailValid ? "red" : "",
                }}
              />
            </Row>
            <Row>
              <label htmlFor="password">
                Password
                <StyledIcon
                icon={isPasswordVisible ? faEye : faEyeSlash}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Row>
            <Row>
              <ButtonSecondary onClick={handleForgotPassword} tabIndex={0}>
                Forgot password?
              </ButtonSecondary>
            </Row>
            <ButtonContainer>
              <CustomGoogleButton onClick={() => googleLogin()} tabIndex={0}>
                <img src={googleIcon} alt="google" />
                SIGN IN WITH GOOGLE
              </CustomGoogleButton>
              <Button onClick={handleLogin} tabIndex={0}>
                SIGN IN
              </Button>
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
                  tabIndex={0}
                >
                  Sign up
                </span>
              </Text>
            </TextCenter>
          </BoxContainer>
        </UserContainer>
      </div>
    </FocusTrap>
  );
};

export default Login;
