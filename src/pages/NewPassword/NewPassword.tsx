import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, BoxContainer } from "../About/About.styled";
import { Button } from "./NewPassword.styled";
import { AvenirH2 } from "../../assets/css/Global.styled";
import { Row } from "../SignUp/SignUp.styled";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";

interface PasswordProps {
    setIsLoginOpen: (value: boolean) => void;
    setEmailForLogin: (value: string) => void; 
}

const NewPassword: React.FC<PasswordProps > = ({ setIsLoginOpen, setEmailForLogin }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const resetToken = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
       `https://eternalai.fly.dev/user/reset-pass`,
        { token: resetToken, newPassword: password }
      );
      if (response.status === 200) {
        setModalType("success");
        setModalMessage("Password updated successfully!");
        setIsModalVisible(true);
        setIsLoginOpen(true);
      }
    } catch (error) {
      setModalType("failure");
      setModalMessage("Password update failed. Please try again.");
      setIsModalVisible(true);
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
    <Container>
      <BoxContainer>
        <AvenirH2>Change your password</AvenirH2>
        <Row>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Row>
        <Row>
          <label htmlFor="newPassword">Confirm password</label>
          <input
            type="newPassword"
            id="newPassword"
            placeholder="********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Row>
        <Button disabled={isButtonDisabled} onClick={handleSubmit}>SUBMIT</Button>
      </BoxContainer>
      <ModalSuccess
        isVisible={isModalVisible}
        modalType={modalType}
        message={modalMessage}
      />
    </Container>
  );
};

export default NewPassword;
