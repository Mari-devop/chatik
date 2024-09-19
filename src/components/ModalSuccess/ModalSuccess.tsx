import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalContainer = styled.div<{ type: 'success' | 'failure' }>`
  position: fixed;
  top: 50%;
transform: translate(-50%, -50%);
  transform: translateX(-50%);
  padding: 16px;
  border-radius: 4px;
  z-index: 10000;
  width: 100%;
  max-width: 400px;
  text-align: center;
  animation: ${slideDown} 0.5s ease-out;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
  background: ${({ type }) =>
    type === 'success'
      ? `linear-gradient(45deg, rgba(4, 4, 16, 1) 0%, rgba(15, 3, 6, 1) 100%)`
      : `linear-gradient(45deg, rgba(30, 30, 30, 1) 0%, rgba(50, 50, 50, 1) 100%)`};

  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: ${({ type }) =>
      type === 'success'
        ? `linear-gradient(45deg, #5833ef, #f82d98)`
        : `linear-gradient(45deg, rgba(80, 80, 80, 1), rgba(120, 120, 120, 1))`};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }
`;

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
