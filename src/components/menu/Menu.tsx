import React, { useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { dbInstance } from "../../db";
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
} from "./Menu.styled";
import facebook from "../../assets/images/menu/facebook.png";
import instagram from "../../assets/images/menu/instagram.png";
import discord from "../../assets/images/menu/discord-mark-white 1.png";
import twitter from "../../assets/images/menu/twitter.png";
import logo from "../../assets/images/logo.png";
import { ImageContainer, Image } from "../navbar/Navbar.styled";

interface MenuProps {
  setIsMenuOpen: (value: boolean) => void;
}

interface User {
  id: number;
  email: string;
  password: string;
  token?: string; 
}

const Menu: React.FC<MenuProps> = ({ setIsMenuOpen }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    const users = await dbInstance.getData("users");
    const userWithToken = users.find((user: User) => user.token); 
    setIsAuthenticated(!!userWithToken); 
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

  const handleSignOut = async () => {
    try {
      const users = await dbInstance.getData('users');
      const currentUser = users.find((user: User) => user.token);
      if (currentUser) {
        await dbInstance.deleteData('users', currentUser.id); 
        setIsMenuOpen(false); 
        navigate("/login"); 
      } else {
        console.error("No user with token found for sign out");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

useEffect(() => {
  checkAuthentication();
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "auto";
  };
},[])
  
  return (
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
          <ImageContainer>
            <Image src={logo} alt="logo" onClick={handleLogoClick} />
          </ImageContainer>
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
          <span>Pricing</span>
        </Row>
        <Row>
          <span>How it works</span>
        </Row>
        <Row>
          <span>My account</span>
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
  );
};

export default Menu;
