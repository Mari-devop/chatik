import React, { useEffect } from "react";
import { ModalSuccessProps } from "./types";
import { ModalContainer, Social, SocialContainer } from "./ModalSuccess.styled";
import facebook from "../../assets/images/menu/facebook.png";
import instagram from "../../assets/images/menu/instagram.png";
import telegram from "../../assets/images/paywall/telegram-brands-solid.svg";
import twitter from "../../assets/images/menu/x-twitter-brands-solid.svg";

const ModalSuccess: React.FC<ModalSuccessProps> = ({
  isVisible,
  modalType,
  message,
  shareLink,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  if (!isVisible) return null;

  return (
    <ModalContainer type={modalType}>
      {modalType === "share" ? (
        <>
          <p>{message}</p>
         
          <SocialContainer>
            <Social
              src={facebook}
              alt="facebook"
              onClick={() =>
                handleSocialClick(
                  `https://wa.me/?text=${encodeURIComponent(shareLink || "")}`
                )
              }
            />
            <Social
              src={instagram}
              alt="instagram"
              onClick={() =>
                handleSocialClick(
                  `https://www.instagram.com/?url=${encodeURIComponent(
                    shareLink || ""
                  )}`
                )
              }
            />
            <Social
              src={twitter}
              alt="twitter"
              onClick={() =>
                handleSocialClick(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    shareLink || ""
                  )}`
                )
              }
            />
            <Social
              src={telegram}
              alt="telegram"
              onClick={() =>
                handleSocialClick(
                  `https://t.me/share/url?url=${encodeURIComponent(
                    shareLink || ""
                  )}`
                )
              }
            />
          </SocialContainer>
        </>
      ) : (
        <p>{message}</p>
      )}

      {children && <div>{children}</div>}
    </ModalContainer>
  );
};

export default ModalSuccess;
