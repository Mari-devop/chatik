import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { dbInstance } from "./db";
import SignUp from "./pages/SignUp/SignUp";
import { MainContainer, ContentContainer } from "./assets/css/Global.styled";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Navbar from "./components/navbar/Navbar";
import Chat from "./pages/Chat/Chat";
import Menu from "./components/menu/Menu";
import Token from "./pages/Token/Token";
import AccountDetails from "./pages/AccountDetails/AccountDetails";
import NewPassword from "./pages/NewPassword/NewPassword";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Paywall from "./pages/Paywall/Paywall";
import HowItWorks from "./pages/HowItWorks/HowItWorks";

const stripePromise = loadStripe(
  "pk_test_51PqIRMRxh50Nc0qLf4KgICJ8Gb4lP7e4iOqZp0SJFlG9rIABwbfH0u09I708ArEEkN3VJ3lzojlUcuvwZ0IYXpcU00E7LfZZkG"
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailForLogin, setEmailForLogin] = useState("");

  const checkAuthentication = async (): Promise<boolean> => {
    const users = await dbInstance.getData("users");
    const userWithToken = users.find((user: any) => user.token);
    setIsAuthenticated(!!userWithToken);
    return !!userWithToken;
  };
  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <GoogleOAuthProvider clientId="297917996967-5i0m39clbr19umnqtclsg7gken22896e.apps.googleusercontent.com">
      <Router>
        <MainContainer>
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <ContentContainer>
            <Routes>
              <Route
                path="/"
                element={<Home isAuthenticated={isAuthenticated} />}
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/chat"
                element={<Chat isAuthenticated={isAuthenticated} />}
              />
              <Route
                path="/paywall"
                element={
                  <Elements stripe={stripePromise}>
                    <Paywall />
                  </Elements>
                }
              />
              <Route path="/how" element={<HowItWorks />} />
              <Route
                path="/verify-email"
                element={<Token setIsLoginOpen={setIsLoginOpen} />}
              />
              <Route
                path="/accountDetails"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Elements stripe={stripePromise}>
                      <AccountDetails />
                    </Elements>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/password"
                element={
                  <NewPassword
                    setIsLoginOpen={setIsLoginOpen}
                    setEmailForLogin={setEmailForLogin}
                  />
                }
              />
            </Routes>
            {isMenuOpen && (
              <Menu
                setIsMenuOpen={setIsMenuOpen}
                checkAuthentication={checkAuthentication}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
            {isLoginOpen && (
              <Login
                setIsLoginOpen={setIsLoginOpen}
                setIsSignupOpen={setIsSignupOpen}
                checkAuthentication={checkAuthentication}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
            {isSignupOpen && (
              <SignUp
                setIsSignupOpen={setIsSignupOpen}
                setIsLoginOpen={setIsLoginOpen}
                checkAuthentication={checkAuthentication}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
          </ContentContainer>
        </MainContainer>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
