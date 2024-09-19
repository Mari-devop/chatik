import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, BoxContainer } from "../About/About.styled";
import { TextArea, Button, Text } from "../Token/Token.styled";
import ModalSuccess from '../../components/ModalSuccess/ModalSuccess';

interface TokenProps {
  setIsLoginOpen: (value: boolean) => void;
}

const Token: React.FC<TokenProps> = ({ setIsLoginOpen }) => {
  const [token, setToken] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const verify = async () => {
    try {
      const response = await axios.post(
        `https://eternalai.fly.dev/user/verify-email?token=${token}`,
        {
          token,
        }
      );

      if (response.status === 200) {
        setModalType("success");
        setModalMessage("Successful!");
        setIsModalVisible(true);
        setIsLoginOpen(true);
      }
    } catch (error) {
      setModalType("failure");
      setModalMessage("Verification failed. Please try again.");
      setIsModalVisible(true);
    }
  };

  return (
    <Container>
      <BoxContainer>
        <Text>Click "Verify" to get access to your account</Text>
        <TextArea value={token} readOnly></TextArea>
        <Button onClick={verify}>VERIFY</Button>
      </BoxContainer>
      <ModalSuccess
        isVisible={isModalVisible}
        modalType={modalType}
        message={modalMessage}
      />
    </Container>
  );
};

export default Token;
