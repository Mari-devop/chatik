import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    RightContainer,
    ButtonShare,
    IconShare
} from './Navbar.styled';
import logo from '../../assets/images/logo.png';
import menu from '../../assets/images/main-page/menu.png';
import share from '../../assets/images/share 1.png';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleCloseClick = () => {
        navigate('/');
    }

  return (
    <div>
         <NavbarContainer>
            <ImageContainer>
                <Image 
                  src={logo} 
                  alt="logo"
                  onClick={handleLogoClick}
                />
            </ImageContainer>
            {(  location.pathname === '/login' || 
                location.pathname === '/signup' || 
                location.pathname === '/about') && (
                <CloseIcon onClick={handleCloseClick} />
            )}
            {location.pathname === '/' && (
              <Box>
                <ButtonMenu><Icon src={menu} alt="menu" /></ButtonMenu>
                <RightContainer>
                    <ButtonLogin><Link to="/login">LOGIN</Link></ButtonLogin>
                    <ButtonStart><Link to="/signup">GET STARTED</Link></ButtonStart>
                </RightContainer>
              </Box>
            )}
            {location.pathname === '/chat' && (
              <Box>
                <ButtonMenu><Icon src={menu} alt="menu" /></ButtonMenu>
                <RightContainer>
                    <ButtonShare><IconShare src={share} />SHARE</ButtonShare>       
                </RightContainer>
              </Box>
            )}

        </NavbarContainer>
    </div>
  )
}

export default Navbar;