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

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;  
}

export const Navbar = ({ isAuthenticated, setIsAuthenticated }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
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
