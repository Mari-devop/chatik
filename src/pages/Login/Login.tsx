import React, { useState, useEffect } from 'react';
import { login } from '../../auth/auth';
import { dbInstance } from '../../db';
import { useNavigate } from 'react-router-dom';
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await login(email, password);
        if (response) {
            navigate('/home');
        }
    };

    const handleGoogleLogin = async (response: any) => {
        const token = response.credential;
        await dbInstance.addData('users', { email, password, token });
        navigate('/home');
    };

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: '297917996967-5i0m39clbr19umnqtclsg7gken22896e.apps.googleusercontent.com', 
            callback: handleGoogleLogin,
        });

        window.google.accounts.id.renderButton(
            document.getElementById('google-button'),
            {
                theme: 'filled_black',
                size: 'large',
                text: 'continue_with',
            }
        );
    },[]);

  return (
    <UserContainer>  
        <BoxContainer>
            <AvenirH2>Login</AvenirH2>
            <Row>
                <label htmlFor='email'>Email</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder='justin@gmail.com' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Row>
            <Row>
                <label htmlFor='password'>Password</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder='********'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Row>
            <Row>
                <ButtonSecondary>Forgot password?</ButtonSecondary>
            </Row>
            <ButtonContainer>
                <ButtonGoogle id="google-button">
                    <img src={googleIcon} alt="google" />
                    <span>SIGN IN WITH GOOGLE</span>
                </ButtonGoogle>
                <Button onClick={handleLogin}>
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