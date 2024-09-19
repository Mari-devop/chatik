import React from 'react';
import { ModalContainer } from './ModalSuccess.styled';

interface ModalSuccessProps {
  isVisible: boolean;
  modalType: 'success' | 'failure';
  message: string;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({ isVisible, modalType, message }) => {
  if (!isVisible) return null;

  return (
    <ModalContainer type={modalType}>
      {message}
    </ModalContainer>
  );
};

export default ModalSuccess;
