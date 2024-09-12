import React from 'react';
import { 
    UserContainer, 
    BoxContainer,
    Row,
    ButtonGoogle,
    Button,
    ButtonContainer,
    Divider,
    Text,
    TextCenter,
    LinkStyled 
} from './SignUp.styled';
import { AvenirH2, TextMedium } from '../../assets/css/Global.styled';
import googleIcon from '../../assets/images/Group.png';

const SignUp = () => {
  return (
    <UserContainer>
        <BoxContainer>
            <AvenirH2>Get started</AvenirH2>
            <TextMedium>
                To continue please create an account
            </TextMedium>
            <Row>
                <label htmlFor='email'>Email</label>
                <input type="email" id="email" placeholder='justin@gmail.com' />
            </Row>
            <Row>
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" placeholder='********' />
            </Row>
            <ButtonContainer>
                <ButtonGoogle>
                    <img src={googleIcon} alt="google" />
                    <span>SIGN UP WITH GOOGLE</span>
                </ButtonGoogle>
                <Button>
                    SIGN UP
                </Button>
            </ButtonContainer>
            <Divider />
            <TextCenter>
                <Text>Already have an account? <LinkStyled to="/login">Sign in</LinkStyled></Text>
            </TextCenter>
        </BoxContainer>
        
        
    </UserContainer>
  )
}

export default SignUp;