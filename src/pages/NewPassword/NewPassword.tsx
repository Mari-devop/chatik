import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, BoxContainer } from "../About/About.styled";
import { Button } from "./NewPassword.styled";
import { StyledIcon } from "../../pages/Login/Login.styled";
import { AvenirH2 } from "../../assets/css/Global.styled";
import { Row } from "../SignUp/SignUp.styled";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import { ColorRing } from "react-loader-spinner";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHint, setPasswordHint] = useState("");
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [isLoading, setIsLoading] = useState(false);
  const resetToken = new URLSearchParams(window.location.search).get("token");

  const validatePassword = (password: string | undefined) => {
    if (!password) {
      setPasswordError(false);
      setPasswordHint("");
      return true;
    }

    if (password.length < 8) {
      setPasswordHint("Password should be at least 8 characters");
      setPasswordError(true);
      return false;
    }

    setPasswordHint("");
    setPasswordError(false);
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);

    if (value !== password) {
      setPasswordHint("Passwords do not match.");
      setPasswordError(true);
    } else {
      setPasswordHint("");
      setPasswordError(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://eternalai.fly.dev/user/reset-pass`,
        { token: resetToken, password: newPassword }
      );
      if (response.status === 200) {
        setModalType("success");
        setModalMessage("Password updated successfully!");
        setIsModalVisible(true);

        setTimeout(() => {
          setIsModalVisible(false);
          setIsLoginOpen(true);
        }, 5000);
      }
    } catch (error) {
      setModalType("failure");
      setModalMessage("Password update failed. Please try again.");
      setIsModalVisible(true);

      setTimeout(() => {
        setIsModalVisible(false);
      }, 5000);
    } finally {
      setIsLoading(false);
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
            <label htmlFor="password">
              Password
              <StyledIcon
                icon={isPasswordVisible ? faEye : faEyeSlash}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
              {passwordHint && (
                <span className={`hint ${passwordHint ? "visible" : ""}`}>{passwordHint}</span>
              )}
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Row>
          <Row>
            <label htmlFor="newPassword">
              Confirm password
              <StyledIcon
                icon={isNewPasswordVisible ? faEye : faEyeSlash}
                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
              />
            </label>
            <input
              type={isNewPasswordVisible ? "text" : "password"}
              id="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </Row>
          <Button disabled={isButtonDisabled} onClick={handleSubmit}>
            <span className="button-text">SUBMIT</span>
            {isLoading && (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="color-ring-loading"
                colors={["#f82d98", "#f82d98", "#F82D98", "#5833ef", "#5833ef"]}
              />
            )}
          </Button>
        </BoxContainer>
      </Container>
    </>
  );
};

export default NewPassword;
