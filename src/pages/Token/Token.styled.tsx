import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 95%;
  height: 150px;
  background-color: #000000;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  font-family: "Avenir";
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -1%;
  color: #ffffff80;
  padding: 15px 16px;
  outline: none;
`;

export const Button = styled.button`
  width: 100%;
  height: 56px;
  background: ${({ disabled }) =>
    disabled
      ? "linear-gradient(135deg, rgba(34,34,34,1) 0%, rgba(48,48,48,1) 50%, rgba(64,64,64,1) 100%);"
      : "var(--primary-gradient)"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border-radius: 120px;
  border: none;
  cursor: pointer;
  font-family: "Arquitecta";
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.3em;
  color: #ffffff;
  transition: background 0.3s ease;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  margin-top: 32px;

  &:hover {
    background: var(--primary-gradient-hover);
  }
`;

export const Text = styled.p`
  font-family: "Avenir";
  font-weight: 800;
  font-size: 24px;
  line-height: 27px;
  letter-spacing: -0.01em;
  color: var(--white-color);
  text-align: center;
  padding: 0;
  margin-bottom: 32px;
`;
