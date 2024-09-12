import React from 'react';
import { 
    NavbarContainer, 
    ImageContainer, 
    Image, 
    CloseIcon,
    ButtonMenu,
    ButtonLogin,
    ButtonStart,
    Icon,
    Box,
    RightContainer
} from './Navbar.styled';
import logo from '../../assets/images/logo.png';
import menu from '../../assets/images/main-page/menu.png';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
    const location = useLocation();
    
  return (
    <div>
         <NavbarContainer>
            <ImageContainer>
                <Image src={logo} alt="logo" />
            </ImageContainer>
            {(  location.pathname === '/login' || 
                location.pathname === '/signup' || 
                location.pathname === '/about') && (
                <CloseIcon />
            )}
            {location.pathname === '/home' && (
              <Box>
                <ButtonMenu><Icon src={menu} alt="menu" /></ButtonMenu>
                <RightContainer>
                    <ButtonLogin>LOGIN</ButtonLogin>
                    <ButtonStart>GET STARTED</ButtonStart>
                </RightContainer>
              </Box>
            )}

        </NavbarContainer>
    </div>
  )
}

export default Navbar;