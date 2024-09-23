import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "./Menu.styled";
import facebook from "../../assets/images/menu/facebook.png";
import instagram from "../../assets/images/menu/instagram.png";
import discord from "../../assets/images/menu/discord-mark-white 1.png";
import twitter from "../../assets/images/menu/twitter.png";
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

  const handleSignOut = async () => {
    try {
      const users = await dbInstance.getData("users");
      const currentUser = users.find((user: User) => user.token);
      if (currentUser) {
        await dbInstance.deleteData("users", currentUser.id);
        setIsMenuOpen(false);
        await checkAuthentication();
        setIsAuthenticated(false);
        navigate("/");
      } else {
        console.error("No user with token found for sign out");
      }
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

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      const isAuth = await checkAuthentication();
      setIsAuthenticatedState(isAuth);
      setLoading(false);
    };
  
    checkAuthStatus();
  }, []);
  
  if (loading) {
    return <div style={{ visibility: 'hidden' }}>Loading...</div>;
  }
  
  return (
    <>
    <MenuContainer>
      <Navbar>
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
              <ButtonStart onClick={handleSignupClick}>GET STARTED</ButtonStart>
            </RightContainer>
          </>
        )}
      </Navbar>

      <Content>
        <Row>
          <Link to="/about" onClick={handleLinkClick}>
            <span>About us</span>
          </Link>
        </Row>
        <Row>
          <Link to="/paywall" onClick={handlePrisingClick}>
            <span>Pricing</span>
          </Link>
        </Row>
        <Row>
        <Link to="/how" onClick={handleHowClick}>
          <span>How it works</span>
          </Link>
        </Row>
        <Row>
          {isAuthenticated ? (
            <Link to="/accountDetails" onClick={handleAccountClick}>
              <span>My account</span>
            </Link>
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
    </>
  );
};

export default Menu;
