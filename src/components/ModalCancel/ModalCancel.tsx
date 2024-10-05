import React, { useEffect } from "react";
import {
  ModalContainer,
  Title,
  Button,
  BtnContainer,
  CloseIcon,
} from "./ModalCancel.styled";
import { BoxContainer } from "../SmsChat/SmsChat.styled";

interface ModalCancelProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ModalCancel: React.FC<ModalCancelProps> = ({ onClose, onConfirm }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <ModalContainer>
      <BoxContainer>
        <CloseIcon onClick={onClose} />
        <Title>Are you sure you want to cancel?</Title>
        <BtnContainer>
          <Button onClick={onConfirm}>YES</Button>
          <Button onClick={onClose}>NO</Button>
        </BtnContainer>
      </BoxContainer>
    </ModalContainer>
  );
};

export default ModalCancel;
