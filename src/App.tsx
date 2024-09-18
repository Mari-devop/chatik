import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUp from './pages/SignUp/SignUp';
import { MainContainer, ContentContainer } from './assets/css/Global.styled';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Navbar from './components/navbar/Navbar';
import Chat from './pages/Chat/Chat';
import Menu from './components/menu/Menu';
import Token from './pages/Token/Token';
import AccountDetails from './pages/AccountDetails/AccountDetails';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isSignupOpen, setIsSignupOpen] = useState(false); 

  return (
    <GoogleOAuthProvider clientId="297917996967-5i0m39clbr19umnqtclsg7gken22896e.apps.googleusercontent.com">
      <Router>
        <MainContainer>
          <Navbar />
          <ContentContainer>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/verify-email' element={<Token />} />
              <Route path='/accountDetails' element={<AccountDetails />} />
            </Routes>
            {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
            {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={setIsSignupOpen}/>}
            {isSignupOpen && <SignUp setIsSignupOpen={setIsSignupOpen} setIsLoginOpen={setIsLoginOpen}/>}
          </ContentContainer>
        </MainContainer>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
