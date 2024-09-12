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
} from '../SignUp/SignUp.styled';
import { ButtonSecondary } from './Login.styled';
import { AvenirH2 } from '../../assets/css/Global.styled';
import googleIcon from '../../assets/images/Group.png';

const Login = () => {
  return (
    <UserContainer>  
        <BoxContainer>
            <AvenirH2>Login</AvenirH2>
            <Row>
                <label htmlFor='email'>Email</label>
                <input type="email" id="email" placeholder='justin@gmail.com' />
            </Row>
            <Row>
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" placeholder='********' />
            </Row>
            <Row>
                <ButtonSecondary>Forgot password?</ButtonSecondary>
            </Row>
            <ButtonContainer>
                <ButtonGoogle>
                    <img src={googleIcon} alt="google" />
                    <span>SIGN UP WITH GOOGLE</span>
                </ButtonGoogle>
                <Button>
                    SIGN IN
                </Button>
            </ButtonContainer>
            <Divider />
            <TextCenter>
                <Text>Don’t have an account? <LinkStyled  to="/signup">Sign up</LinkStyled></Text>
            </TextCenter>
        </BoxContainer>
    </UserContainer>
  )
}

export default Login;