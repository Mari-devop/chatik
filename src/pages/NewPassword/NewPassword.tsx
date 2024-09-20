import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, BoxContainer } from "../About/About.styled";
import { Button } from "./NewPassword.styled";
import { AvenirH2 } from "../../assets/css/Global.styled";
import { Row } from "../SignUp/SignUp.styled";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface PasswordProps {
  setIsLoginOpen: (value: boolean) => void;
  setEmailForLogin: (value: string) => void;
}

const NewPassword: React.FC<PasswordProps> = ({
  setIsLoginOpen,
  setEmailForLogin,
}) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const resetToken = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://eternalai.fly.dev/user/reset-pass`,
        { token: resetToken, password: newPassword }
      );
      if (response.status === 200) {
        // setModalType("success");
        // setModalMessage("Password updated successfully!");
        // setIsModalVisible(true);
        // setTimeout(() => {
        //   setIsModalVisible(false);
        //   setIsLoginOpen(true); 
        // }, 5000);
        setIsLoginOpen(true); 
      }
    } catch (error) {
      setModalType("failure");
      setModalMessage("Password update failed. Please try again.");
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
      }, 5000);
    }
  };
  useEffect(() => {
    if (password === newPassword && password !== "" && newPassword !== "") {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [password, newPassword]);

  return (
    <>
      <ModalSuccess
        isVisible={isModalVisible}
        modalType={modalType}
        message={modalMessage}
        onClose={() => setIsModalVisible(false)}
      />

      <Container>
        <BoxContainer>
          <AvenirH2>Change your password</AvenirH2>
          <Row>
            <label htmlFor="password">Password</label>
            <input
               type={isPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           <FontAwesomeIcon
              icon={isPasswordVisible ? faEye : faEyeSlash}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: "absolute",
                color: 'white',
                cursor: "pointer",
                bottom: "305px",
                right: "100px",
              }}
            />
          </Row>
          <Row>
            <label htmlFor="newPassword">
              Confirm password 
              
            </label>
            <input
              type={isNewPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={isNewPasswordVisible ? faEye : faEyeSlash}
              onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
              style={{
                position: "absolute",
                color: 'white',
                cursor: "pointer",
                bottom: "180px",
                right: "100px",
              }}
            />
             
          </Row>
          <Button disabled={isButtonDisabled} onClick={handleSubmit}>
            SUBMIT
          </Button>
        </BoxContainer>
      </Container>
    </>
  );
};

export default NewPassword;
