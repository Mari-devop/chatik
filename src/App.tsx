import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import { MainContainer, ContentContainer } from './assets/css/Global.styled';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Router>
      <MainContainer>
        <Navbar />
        <ContentContainer>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </ContentContainer>
      </MainContainer>
    </Router>
  );
}

export default App;
