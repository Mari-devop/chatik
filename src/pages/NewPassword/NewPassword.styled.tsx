import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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

  .button-text {
    flex-grow: 1;
    text-align: center;
  }

  &:hover {
    background: var(--primary-gradient-hover);
  }
`;
