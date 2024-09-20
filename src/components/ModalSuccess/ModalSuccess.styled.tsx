import styled from 'styled-components';

export const ModalContainer = styled.div<{ type: 'success' | 'failure' }>`
  position: fixed;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px;
  border-radius: 4px;
  z-index: 10000;
  width: 100%;
  max-width: 400px;
  text-align: center;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
  background: ${({ type }) =>
    type === 'success'
      ? `linear-gradient(45deg, rgba(4, 4, 16, 1) 0%, rgba(15, 3, 6, 1) 100%)`
      : `linear-gradient(45deg, rgba(4, 4, 16, 1) 0%, rgba(40, 30, 50, 1) 100%)`};

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
        ? `linear-gradient(45deg, #5833ef, #B5E42E)`
        : `linear-gradient(45deg, rgba(250, 0, 80, 1), rgba(250, 120, 120, 1))`};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }
`;