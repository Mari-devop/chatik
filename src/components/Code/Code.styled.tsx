import styled from "styled-components";

export const OTPContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  label {
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    max-width: 40px;
    height: 53px;
    font-size: 18px;
    text-align: center;
    background-color: var(--input-color);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    padding: 0px;
    margin: 0px 5px;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }

  @media (max-width: 500px) {
    gap: 15px;
  }

  @media (max-width: 450px) {
    input {
      max-width: 35px; 
      height: 45px;
    }
    gap: 8px;
  }

  @media (max-width: 344px) {
    input {
      max-width: 25px; 
      height: 40px;
    }
    gap: 5px;
  }
`;
