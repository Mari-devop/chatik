import React, { useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";
import { useNavigate } from "react-router-dom";
import { dbInstance } from "../../db";
import { MenuProps, User } from "./types";
import {
  MenuContainer,
  Row,
  Divider,
  SocialContainer,
  Social,
  Content,
  CloseIcon,
  ButtonSignOut,
  Navbar,
  ButtonStart,
  ButtonLogin,
  RightContainer,
  StyledLink,
} from "./Menu.styled";
import facebook from "../../assets/images/menu/facebook.png";
import instagram from "../../assets/images/menu/instagram.png";
import discord from "../../assets/images/menu/discord-mark-white 1.png";
import twitter from "../../assets/images/menu/x-twitter-brands-solid.svg";
import logo from "../../assets/images/logo.png";
import { ImageContainer, Image } from "../navbar/Navbar.styled";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";

const Menu: React.FC<MenuProps> = ({
  setIsMenuOpen,
  checkAuthentication,
  setIsAuthenticated,
}) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleContainerClick = () => {
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleCloseClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const handleSignupClick = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  const handleAccountClick = () => {
    setIsMenuOpen(false);
  };

  const checkAuthStatus = async () => {
    setLoading(true);
    const isAuth = await checkAuthentication();
    setIsAuthenticatedState(isAuth);
    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, [isLoginOpen, isSignupOpen]);

  const handleSignOut = async () => {
    try {
      const users = await dbInstance.getData("users");
      const tokensToDelete: number[] = [];

      users.forEach((user: User) => {
        if (user.token) {
          tokensToDelete.push(user.id);
        }
      });

      for (const userId of tokensToDelete) {
        await dbInstance.deleteData("users", userId);
      }

      setIsMenuOpen(false);
      await checkAuthentication();
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handlePrisingClick = () => {
    setIsMenuOpen(false);
  };

  const handleHowClick = () => {
    setIsMenuOpen(false);
  };

  if (loading) {
    return <div style={{ visibility: "hidden" }}>Loading...</div>;
  }

  return (
    <FocusTrap>
      <div role="dialog" aria-modal="true">
        <MenuContainer onClick={handleContainerClick}>
          <Navbar onClick={handleInnerClick}>
            {isAuthenticated ? (
              <>
                <CloseIcon onClick={handleCloseClick} />
                <ImageContainer>
                  <Image src={logo} alt="logo" onClick={handleLogoClick} />
                </ImageContainer>
                <ButtonSignOut onClick={handleSignOut}>SIGN OUT</ButtonSignOut>
              </>
            ) : (
              <>
                <CloseIcon onClick={handleCloseClick} />
                <ImageContainer>
                  <Image src={logo} alt="logo" onClick={handleLogoClick} />
                </ImageContainer>
                <RightContainer>
                  <ButtonLogin onClick={handleLoginClick}>LOGIN</ButtonLogin>
                  <ButtonStart onClick={handleSignupClick}>
                    GET STARTED
                  </ButtonStart>
                </RightContainer>
              </>
            )}
          </Navbar>

          <Content onClick={handleInnerClick}>
            <Row>
              <StyledLink to="/about" onClick={handleLinkClick}>
                <span>About us</span>
              </StyledLink>
            </Row>
            <Row>
              <StyledLink to="/paywall" onClick={handlePrisingClick}>
                <span>Pricing</span>
              </StyledLink>
            </Row>
            <Row>
              <StyledLink to="/how" onClick={handleHowClick}>
                <span>How it works</span>
              </StyledLink>
            </Row>
            <Row>
              {isAuthenticated ? (
                <StyledLink to="/accountDetails" onClick={handleAccountClick}>
                  <span>My account</span>
                </StyledLink>
              ) : (
                <span style={{ display: "none" }}></span>
              )}
            </Row>
            <Divider />
            <SocialContainer>
              <Social src={facebook} alt="facebook" />
              <Social src={instagram} alt="instagram" />
              <Social src={twitter} alt="twitter" />
              <Social src={discord} alt="discord" />
            </SocialContainer>
          </Content>
        </MenuContainer>
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
    </FocusTrap>
  );
};

export default Menu;
