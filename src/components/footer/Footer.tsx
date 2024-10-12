import React from "react";
import { socialFooterLinks } from "../../constants/socialIcons";
import {
  FooterContainer,
  LogoContainer,
  TinyText,
  SocialContainer,
  Text,
  Button,
  Icon,
} from "./Footer.styled";
import { TextTiny, Image } from "../../assets/css/Global.styled";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <FooterContainer>
      <LogoContainer>
        <Image src={logo} alt="logo" />
      </LogoContainer>
      <TinyText>
        <TextTiny>© 2024 Eternal. All rights reserved.</TextTiny>
      </TinyText>
      <SocialContainer>
        <Text>follow us</Text>
        {socialFooterLinks.map(({ src, alt }, index) => (
          <Button key={index}>
            <Icon src={src} alt={alt} />
          </Button>
        ))}
      </SocialContainer>
    </FooterContainer>
  );
};

export default Footer;
