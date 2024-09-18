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
} from "./Navbar.styled";
import Menu from "../menu/Menu";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import logo from "../../assets/images/logo.png";
import menu from "../../assets/images/main-page/menu.png";
import share from "../../assets/images/share 1.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    const users = await dbInstance.getData("users");
    const userWithToken = users.find((user: any) => user.token);
    if (userWithToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
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

  return (
    <div>
      <NavbarContainer>
        <ImageContainer>
          <Image src={logo} alt="logo" onClick={handleLogoClick} />
        </ImageContainer>
        {location.pathname === "/" && (
          <Box>
            <ButtonMenu onClick={handleMenuClick}>
              <Icon src={menu} alt="menu" />
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
                <ButtonShare>
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
              <Icon src={menu} alt="menu" />
            </ButtonMenu>
            <RightContainer>
              <ButtonShare>
                <IconShare src={share} />
                SHARE
              </ButtonShare>
            </RightContainer>
          </Box>
        )}
      </NavbarContainer>
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
      {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={setIsSignupOpen}/>}
      {isSignupOpen && <SignUp setIsSignupOpen={setIsSignupOpen} setIsLoginOpen={setIsLoginOpen}/>}
    </div>
  );
};

export default Navbar;
