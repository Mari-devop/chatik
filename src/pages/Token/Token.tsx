import React, { useState, useEffect } from "react";
import axios from "axios";
import { TokenProps } from "./types";
import { User } from "../../components/menu/types";
import { Container, BoxContainer } from "../About/About.styled";
import { TextArea, Button, Text } from "../Token/Token.styled";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import { dbInstance } from "../../db";

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

      const { email } = response.data;

      if (response) {
        const users = await dbInstance.getData("users");
        const userToUpdate = users.find((user: User) => user.email === email);
        if (userToUpdate) {
          const updatedUser = { ...userToUpdate, isVerified: true };
          await dbInstance.updateData("users", updatedUser);
      
        setModalType("success");
        setModalMessage("Successful verifacation!");
        setIsModalVisible(false);
        setIsLoginOpen(true);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setModalType("failure");
          setModalMessage("Verification failed. Please try again.");
          setIsModalVisible(true);
        }
        setModalType("failure");
        setModalMessage("Verification failed. Please try again.");
        setIsModalVisible(true);
      }
    }
  };

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
          <Text>Click "Verify" to get access to your account</Text>
          <TextArea value={token} readOnly></TextArea>
          <Button onClick={verify}>VERIFY</Button>
        </BoxContainer>
      </Container>
    </>
  );
};

export default Token;
