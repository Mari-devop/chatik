import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FocusTrap from "focus-trap-react";
import axios from "axios";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { ColorRing } from "react-loader-spinner";
import { login } from "../../auth/auth";
import { dbInstance } from "../../db";
import { LoginProps } from "./types";
import { User } from "../../components/menu/types";
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
import { ImageContainer, Image, CloseIcon } from "../../assets/css/Global.styled";
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { googleSignInOrSignUp } = useGoogleAuth({
    setModalType,
    setModalMessage,
    setIsModalVisible,
    setIsAuthenticated,
    setIsOpen: setIsLoginOpen,
    isLogin: true,  
  });

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
    setIsLoading(true);

    try {
      const users = await dbInstance.getData("users");
      console.log("Users from IndexedDB:", users);

      if (users && users.length > 0) {
        console.log("Users in IndexedDB:", users);

        const userFromDB = users.find((user: User) => user.email === email);

        if (userFromDB) {
          console.log("Found user in IndexedDB:", userFromDB);

          if (userFromDB.isVerified === false) {
            console.log("Unverified user found in IndexedDB:", userFromDB);
            setModalType("failure");
            setModalMessage(
              "Please, check your email box to verify your email! If you didn't receive the email, please check spam box."
            );
            setIsModalVisible(true);
            setIsLoading(false);
            return;
          }
        } else {
          console.log("User not found in IndexedDB.");
        }
      }

      const response = await login(email, password);

      if (response && response.token) {
        setIsAuthenticated(true);

        if (response.hasAcceptedPolicy === false) {
          navigate("/about"); 
        } else {
          navigate("/"); 
        }

        setModalType("success");
        setModalMessage("Login Successful!");
        setIsModalVisible(true);
        setIsLoginOpen(false);
      }
    } catch (error: any) {
      console.log("Error details:", error);

      if (error.response) {
        if (error.response.status === 400) {
          setModalType("failure");
          setModalMessage("Invalid email or password");
        } else if (error.response.status === 404) {
          setModalType("failure");
          setModalMessage("Email not found. Sign up first.");
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
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  // const googleLogin = useGoogleLogin({
  //   flow: "implicit",
  //   scope: "openid email profile",
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       const googleAccessToken = tokenResponse.access_token;

  //       const profileResponse = await axios.get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`
  //       );

  //       const userProfile = profileResponse.data;
  //       const userEmail = userProfile.email;
  //       const userName = userProfile.name;
  //       const userImage = userProfile.picture;

  //       const res = await axios.post("https://eternalai.fly.dev/user/login", {
  //         googleToken: googleAccessToken,
  //         email: userEmail,
  //         password,
  //         name: userName,
  //       });

  //       const token = res.data.token;

  //       if (token) {
  //         await dbInstance.addData("users", {
  //           email: userEmail,
  //           token,
  //           name: userName,
  //           image: userImage,
  //         });
  //         setModalType("success");
  //         setModalMessage("Google Login Successful!");
  //         setIsAuthenticated(true);
  //         setIsModalVisible(true);
  //         setIsLoginOpen(false);
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       setModalType("failure");
  //       setModalMessage("Google Login Failed. Please try again.");
  //       setIsModalVisible(true);
  //     }
  //   },
  //   onError: (error) => {
  //     setModalType("failure");
  //     setModalMessage("Google Login Failed. Please try again.");
  //     setIsModalVisible(true);
  //   },
  // });

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
                onKeyDown={handleKeyDown}
              />
            </Row>
            <Row>
              <ButtonSecondary onClick={handleForgotPassword} tabIndex={0}>
                Forgot password?
              </ButtonSecondary>
            </Row>
            <ButtonContainer>
              <CustomGoogleButton onClick={() => googleSignInOrSignUp()} tabIndex={0}>
                <img src={googleIcon} alt="google" />
                SIGN IN WITH GOOGLE
              </CustomGoogleButton>
              <Button onClick={handleLogin} tabIndex={0}>
                SIGN IN
                {isLoading && (
                  <div className="spinner-wrapper">
                    <ColorRing
                      visible={true}
                      height="35"
                      width="35"
                      ariaLabel="color-ring-loading"
                      colors={[
                        "#f82d98",
                        "#f82d98",
                        "#F82D98",
                        "#5833ef",
                        "#5833ef",
                      ]}
                    />
                  </div>
                )}
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
