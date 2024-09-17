import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            navigate('/about');
        }
    };

    const handleGoogleLogin = async (response: any) => {
        const googleToken = response.credential;
    
        try {
            const res = await axios.post('https://eternalai.fly.dev/user/login', {
                email,
                password,
                googleToken
            });
    
            if (res.data.token) {
                await dbInstance.addData('users', { email, password, googleToken });
                navigate('/about');
            }
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: '297917996967-5i0m39clbr19umnqtclsg7gken22896e.apps.googleusercontent.com', 
            callback: handleGoogleLogin,
        });

        window.google.accounts.id.renderButton(
            document.getElementById('google-button-login'),
            {
                theme: 'filled_black',
                size: 'large',
                text: 'sign_in',
                
        
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
                <div id="google-button-login">
                    {/* <img src={googleIcon} alt="google" />
                    <span>SIGN IN WITH GOOGLE</span> */}
                </div>
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