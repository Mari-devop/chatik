import React from 'react';
import { 
    FooterContainer,
    LogoContainer,
    Image,
    TinyText, 
    SocialContainer,
    Text,
    Button,
    Icon,
} from './Footer.styled';
import { TextTiny } from '../../assets/css/Global.styled';
import logo from '../../assets/images/logo.png';
import twitter from '../../assets/images/menu/x-twitter-brands-solid.svg';
import fb from '../../assets/images/footer/fb.png';
import youtube from '../../assets/images/footer/youtube.png';
import SmsChat from '../SmsChat/SmsChat';


const Footer = () => {
    const[openSmsChat, setOpenSmsChat] = React.useState(false);

    const handleSmsChat = () => {
        setOpenSmsChat(true);
    }
  return (
    <FooterContainer>
        <LogoContainer>
            <Image src={logo} alt="logo" />
        </LogoContainer>
        <TinyText>
            <TextTiny>
                © 2024 Eternal. All rights reserved.
            </TextTiny>
        </TinyText>
        <SocialContainer>
            <Text>follow us</Text>
            <Button onClick={handleSmsChat}><Icon src={twitter} /></Button>
            <Button><Icon src={fb} /></Button>
            <Button><Icon src={youtube} /></Button>
        </SocialContainer>
        {openSmsChat && <SmsChat setIsLoginOpen={setOpenSmsChat} setIsSignupOpen={setOpenSmsChat} />}
    </FooterContainer>
  )
}

export default Footer