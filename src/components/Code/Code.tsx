import React, { useState, useRef } from "react";
import FocusTrap from "focus-trap-react";
import { Row, Divider } from "../../pages/SignUp/SignUp.styled";
import { BoxContainer, Button } from "../SmsChat/SmsChat.styled";
import { OTPContainer } from "./Code.styled";
import {
  AvenirH4,
  TextSmall,
  TextSmallBold,
} from "../../assets/css/Global.styled";

const Code = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "Enter" && otp.every((value) => value !== "")) {
      setIsSuccess(true);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (pastedData.length === otp.length) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      newOtp.forEach((value, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = value;
        }
      });
      inputRefs.current[otp.length - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (otp.every((value) => value !== "")) {
      setIsSuccess(true);
    }
  };

  return (
    <FocusTrap>
      <div role="dialog" aria-modal="true">
        {!isSuccess ? (
          <BoxContainer>
            <AvenirH4
              style={{ color: "white", marginTop: "0px", marginBottom: "4px" }}
            >
              Enter Code
            </AvenirH4>
            <TextSmall
              style={{
                color: "#FFFFFF80",
                marginTop: "0",
                marginBottom: "0px",
              }}
            >
              Enter the 6 digit code texted to you
            </TextSmall>
            <Row>
              <label htmlFor="code">6 Digit Code</label>
              <OTPContainer>
                {otp.map((data, index) => (
                  <input
                    type="text"
                    name="code"
                    maxLength={1}
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                  />
                ))}
              </OTPContainer>
            </Row>
            <Button onClick={handleSubmit}>ENTER</Button>
            <Divider />
            <TextSmallBold style={{ color: "white", margin: "24px auto 0" }}>
              Need a new code?{" "}
              <span style={{ cursor: "pointer", color: "#F82D98" }}>
                Resend Code
              </span>
            </TextSmallBold>
          </BoxContainer>
        ) : (
          <BoxContainer>
            <AvenirH4
              style={{ color: "white", marginTop: "0px", marginBottom: "4px" }}
            >
              You’re ready to chat!
            </AvenirH4>
            <TextSmall
              style={{
                color: "#FFFFFF80",
                marginTop: "0",
                marginBottom: "0px",
              }}
            >
              Code confirmed. You may chat 1:1 now through SMS
            </TextSmall>
            <Button>BACK TO CHAT</Button>
          </BoxContainer>
        )}
      </div>
    </FocusTrap>
  );
};

export default Code;
