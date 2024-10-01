import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbInstance } from "../../db";
import {
  NavbarContainer,
  ImageContainer,
  Image,
  ButtonMenu,
  ButtonLogin,
  ButtonStart,
  Icon,
  Box,
  RightContainer,
  ButtonShare,
  IconShare,
  CloseIcon,
  Line,
  LineShort,
} from "./Navbar.styled";
import Menu from "../menu/Menu";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import ModalSuccess from "../ModalSuccess/ModalSuccess";
import logo from "../../assets/images/logo.png";
import menu from "../../assets/images/main-page/menu.png";
import share from "../../assets/images/share 1.png";

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const Navbar = ({
  isAuthenticated,
  setIsAuthenticated,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuthentication = async (): Promise<boolean> => {
    const users = await dbInstance.getData("users");
    const userWithToken = users.find((user: any) => user.token);
    return !!userWithToken;
  };

  useEffect(() => {
    const updateAuthStatus = async () => {
      const isAuth = await checkAuthentication();
      setIsAuthenticated(isAuth);
    };
    updateAuthStatus();
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const handleSignupClick = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  const handleShareClick = async () => {
    try {
      const users: any = await dbInstance.getData("users");
      const userToken = users?.[0]?.token;

      if (!userToken) {
        return;
      }

      const generatedLink = `${window.location.origin}/?token=${userToken}`;

      setShareLink(generatedLink);
  
      setShowModal(true);
      console.log("Modal should be shown, showModal:", true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShareClickChat = async () => {
    const generatedLink = `${window.location.origin}`;
    setShareLink(generatedLink);
    setShowModal(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleLogoClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <ModalSuccess
        isVisible={showModal}
        modalType="share"
        shareLink={shareLink}
        message="Share this link to your friend"
        onClose={() => setShowModal(false)}
      />
      <NavbarContainer
        style={{ position: "sticky", top: 0, width: "100%", zIndex: 1000 }}
      >
        <ImageContainer>
          <Image src={logo} alt="logo" onClick={handleLogoClick} />
        </ImageContainer>
        {location.pathname === "/" && (
          <Box>
            <ButtonMenu onClick={handleMenuClick}>
              <Line />
              <LineShort />
              <Line />
            </ButtonMenu>
            <RightContainer>
              {!isAuthenticated && (
                <>
                  <ButtonLogin onClick={handleLoginClick}>LOGIN</ButtonLogin>
                  <ButtonStart onClick={handleSignupClick}>
                    GET STARTED
                  </ButtonStart>
                </>
              )}
              {isAuthenticated && (
                <ButtonShare onClick={handleShareClick}>
                  <IconShare src={share} />
                  SHARE
                </ButtonShare>
              )}
            </RightContainer>
          </Box>
        )}
        {location.pathname === "/chat" && (
          <Box>
            <ButtonMenu onClick={handleMenuClick}>
              <Line />
              <LineShort />
              <Line />
            </ButtonMenu>
            <RightContainer>
              <ButtonShare onClick={handleShareClickChat}>
                <IconShare src={share} />
                SHARE
              </ButtonShare>
            </RightContainer>
          </Box>
        )}
        {location.pathname === "/accountDetails" && (
          <Box style={{ justifyContent: "flex-start" }}>
            <ButtonMenu onClick={handleMenuClick}>
              <Line />
              <LineShort />
              <Line />
            </ButtonMenu>
          </Box>
        )}
        {location.pathname === "/paywall" && (
          <CloseIcon onClick={handleLogoClick} />
        )}
      </NavbarContainer>
      {isMenuOpen && (
        <Menu
          setIsMenuOpen={setIsMenuOpen}
          checkAuthentication={checkAuthentication}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      {isLoginOpen && (
        <Login
          setIsLoginOpen={setIsLoginOpen}
          setIsSignupOpen={setIsSignupOpen}
          checkAuthentication={checkAuthentication}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      {isSignupOpen && (
        <SignUp
          setIsSignupOpen={setIsSignupOpen}
          setIsLoginOpen={setIsLoginOpen}
          checkAuthentication={checkAuthentication}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
    </div>
  );
};

export default Navbar;
