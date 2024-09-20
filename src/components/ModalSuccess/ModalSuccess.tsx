import React, { useEffect } from 'react';
import { ModalContainer } from './ModalSuccess.styled';

interface ModalSuccessProps {
  isVisible: boolean;
  modalType: 'success' | 'failure';
  message: string;
  onClose: () => void;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({ isVisible, modalType, message, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose(); 
      }, 5000);

      return () => clearTimeout(timer); 
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <ModalContainer type={modalType}>
      {message}
    </ModalContainer>
  );
};

export default ModalSuccess;
