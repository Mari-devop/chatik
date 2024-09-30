import styled from 'styled-components';



export const ModalContainer = styled.div<{ type: 'success' | 'failure' | 'share' | 'confirm' }>`
  position: fixed;
  top: 25px; 
  left: 50%; 
  transform: translateX(-50%); 
  padding: 16px;
  border-radius: 32px;
    box-sizing: border-box;
    border: none;
  z-index: 10000; 
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
  background: ${({ type }) =>
    type === 'success'
      ? `linear-gradient(45deg, rgba(4, 4, 16, 1) 0%, rgba(15, 3, 6, 1) 100%)`
      : type === 'failure'
      ? `linear-gradient(45deg, rgba(4, 4, 16, 1) 0%, rgba(40, 30, 50, 1) 100%)`
      : `linear-gradient(45deg, rgba(4, 4, 16, 1) 0%, rgba(15, 3, 6, 1) 100%)`}; 
 

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: inherit;
    padding: 1px;
    border-image-slice: 1;
    background: ${({ type }) =>
      type === 'success'
        ? `linear-gradient(45deg, #5833ef, #B5E42E)` 
        : type === 'failure'
        ? `linear-gradient(45deg, rgba(250, 0, 80, 1), rgba(250, 120, 120, 1))` 
        : `linear-gradient(45deg, #5833EF 0%, #F82D98 100%)`}; 
         -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1; 
  }

  @media (min-width: 375px) {
    max-width: 400px;
    width: 90%;
    top: 3px;
  }
`;

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 16px;
  margin-top: 16px;
`;

export const Social = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;