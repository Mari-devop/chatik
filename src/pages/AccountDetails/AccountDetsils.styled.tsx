import styled from "styled-components";

export const FirstBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(
    45deg,
    rgba(4, 4, 16, 1) 0%,
    rgba(15, 3, 6, 1) 100%
  );
  width: 760px;
  height: 742px;
  box-sizing: border-box;
  position: relative;
  border-radius: 32px;
  padding: 48px;
  margin-top: 100px;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(45deg, #5833ef, #f82d98);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }

  @media (max-width: 767px) {
    width: calc(100% - 48px);
    margin-left: 16px;
    margin-right: 16px;
    padding: 32px;
  }
`;

export const SecondBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(
    45deg,
    rgba(4, 4, 16, 1) 0%,
    rgba(15, 3, 6, 1) 100%
  );
  width: 760px;
  height: 365px;
  box-sizing: border-box;
  position: relative;
  border-radius: 32px;
  padding: 48px;
  margin-top: 24px;
  margin-bottom: 80px;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(45deg, #5833ef, #f82d98);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }

  @media (max-width: 767px) {
    width: calc(100% - 48px);
    margin-left: 16px;
    margin-right: 16px;
    padding: 32px;
  }
`;

export const Boxik = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 42px;
    border-radius: 16px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;

    &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(45deg, #5833ef, #f82d98);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }
`;

export const Text = styled.p`
    font-family: 'Avenir';
    font-weight: 800;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
    margin: 0;
    color: var(--border-color-hover);
`;

export const ButtonUpdate = styled.button`
    
`;