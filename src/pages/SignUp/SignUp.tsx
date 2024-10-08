import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FocusTrap from "focus-trap-react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { register } from "../../auth/auth";
import { dbInstance } from "../../db";
import { SignupProps } from "./types";
import {
  BoxContainer,
  Row,
  Button,
  ButtonContainer,
  Divider,
  Text,
  TextCenter,
  StyledIcon,
} from "./SignUp.styled";
import {
  ImageContainer,
  Image,
  CloseIcon,
} from "../../components/navbar/Navbar.styled";
import { AvenirH2, TextMedium } from "../../assets/css/Global.styled";
import { UserContainer, CustomGoogleButton } from "../Login/Login.styled";
import { Navbar } from "../../components/menu/Menu.styled";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import logo from "../../assets/images/logo.png";
import googleIcon from "../../assets/images/Group.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUp: React.FC<SignupProps> = ({
  setIsSignupOpen,
  setIsLoginOpen,
  checkAuthentication,
  setIsAuthenticated,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordHint, setPasswordHint] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleCloseClick = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false);
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError(false);
      setPasswordHint("");
      return true;
    }
    
    if (password.length < 8) {
      setPasswordHint("Password should be at least 8 characters");
      setPasswordError(true);
      return false;
    }
    setPasswordHint("");
    setPasswordError(false);
    return true;
  };

  useEffect(() => {
    validatePassword(password);
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

  const handleLogoClick = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false);
  };

  const handleRegister = async () => {
    try {
      const response = await register(email, password);
      if (response && response.token) {
        await dbInstance.addData("users", {
          email: response.email,
          token: response.token,
        });
        setIsAuthenticated(true);
        setIsSignupOpen(false);
        setModalType("success");
        setModalMessage("Registration Successful! ");
        setIsModalVisible(true);
        checkAuthentication();
        navigate("/about");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 402) {
          setModalType("success");
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
    flow: "implicit",
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      try {
        const googleAccessToken = tokenResponse.access_token;

        const profileResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`
        );

        const userProfile = profileResponse.data;
        const userEmail = userProfile.email;
        const userName = userProfile.name;
        const userImage = userProfile.picture;

        const users = await dbInstance.getData("users");
        const shareToken = users?.[0]?.shareToken;

        const res = await axios.post(
          "https://eternalai.fly.dev/user/register",
          {
            googleToken: googleAccessToken,
            email: userEmail,
            name: userName,
            shareToken,
          }
        );
        const token = res.data.token;

        if (token) {
          await dbInstance.addData("users", {
            email: userEmail,
            token,
            name: userName,
            image: userImage,
          });
          setModalType("success");
          setModalMessage(
            "Google Registration Successful! Please, check your email box to verify email!"
          );
          setIsModalVisible(true);
          setIsAuthenticated(true);
          setIsSignupOpen(false);
          navigate("/about");
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

  const handleContainerClick = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    navigate("/");
  };

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

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
              <label htmlFor="password">
                Password
                <StyledIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
                {passwordHint && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginLeft: "10px",
                    }}
                  >
                   <span className={`hint ${passwordHint ? "visible" : ""}`}>{passwordHint}</span> 
                  </span>
                )}
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Row>
            <ButtonContainer>
              <CustomGoogleButton onClick={() => googleSignUp()}>
                <img src={googleIcon} alt="google" />
                SIGN UP WITH GOOGLE
              </CustomGoogleButton>
              <Button onClick={handleRegister}>
                <span className="button-text">SIGN UP</span>
              </Button>
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
                  tabIndex={0}
                >
                  Sign in
                </span>
              </Text>
            </TextCenter>
          </BoxContainer>
        </UserContainer>
      </div>
    </FocusTrap>
  );
};

export default SignUp;
