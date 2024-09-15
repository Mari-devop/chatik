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
import twitter from '../../assets/images/footer/twitter.png';
import fb from '../../assets/images/footer/fb.png';
import youtube from '../../assets/images/footer/youtube.png';

const Footer = () => {
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
            <Button><Icon src={twitter} /></Button>
            <Button><Icon src={fb} /></Button>
            <Button><Icon src={youtube} /></Button>
        </SocialContainer>
    </FooterContainer>
  )
}

export default Footer