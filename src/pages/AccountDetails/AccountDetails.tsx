import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../../utils/authUtils";
import axios from "axios";
import InputMask from "react-input-mask";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { User } from "../../components/menu/types";
import { ColorRing } from "react-loader-spinner";
import { dbInstance } from "../../db";
import { Container } from "../Home/Home.styled";
import { Row } from "../SignUp/SignUp.styled";
import Loader from "../../components/Loader/Loader";
import {
  FirstBox,
  SecondBox,
  Boxik,
  Text,
  ButtonUpdate,
  ButtonContainer,
  ButtonCancel,
  ImageDown,
  CardInputContainer,
  CardDetails,
  SaveButtonPay,
  Button,
  VerificationIcon,
  EmailContainer,
} from "./AccountDetsils.styled";
import { StyledIcon } from "../Login/Login.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  AvenirH2,
  AvenirH4,
  ArquitectaH5,
} from "../../assets/css/Global.styled";
import Footer from "../../components/Footer/Footer";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import ModalCancel from "../../components/ModalCancel/ModalCancel";
import down from "../../assets/images/accountDetails/down.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AccountDetails = () => {
  const [userData, setUserData] = useState({
    email: localStorage.getItem("userEmail") || "",
    name: "",
    phone: "",
    password: "",
    hasSubscription: false,
    isVerified: false,
    isSubscriptionCanceled: false,
    nextBillingDate: "",
  });
  const [initialUserData, setInitialUserData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });
  const [dataLoaded, setDataLoaded] = useState(true);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [initialEmail, setInitialEmail] = useState("");
  const [isEmailLoaded, setIsEmailLoaded] = useState(false);
  const [emailHint, setEmailHint] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordHint, setPasswordHint] = useState("");
  const [isPaymentUpdated, setIsPaymentUpdated] = useState(false);
  const [showCardInput, setShowCardInput] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
  const [emailUnverified, setEmailUnverified] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleStartChatting = () => {
    navigate("/", { state: { scrollToIndividuals: true } });
  };

  const handleSubmit = () => {
    setShowCardInput(true);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;

    if (!newEmail) {
      setEmailEmpty(true);
      setEmailHint("Email is required");
      setEmailError(true);
    } else {
      setEmailEmpty(false);

      if (!validateEmail(newEmail)) {
        setEmailHint("Please enter a valid email address");
        setEmailError(true);
      } else {
        setEmailError(false);
        setEmailHint("");

        if (newEmail !== initialEmail) {
          setEmailUnverified(true);
          setEmailHint("Unverified email");
        } else {
          setEmailUnverified(false);
          setEmailHint("");
        }
      }
    }

    setUserData((prev) => ({
      ...prev,
      email: newEmail,
      isVerified: newEmail === initialEmail,
    }));
    localStorage.setItem("userEmail", newEmail);
    setIsFormChanged(newEmail !== initialEmail);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true;
    const phoneRegex = /^\+380 \d{2} \d{3} \d{2} \d{2}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string | undefined) => {
    if (!password) {
      setPasswordError(false);
      setPasswordHint("");
      return true;
    }

    if (password.length < 8) {
      setPasswordHint("Password should be at least 8 characters");
      setPasswordError(true);
      return false;
    }

    setPasswordHint("");
    setPasswordError(false);
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setUserData((prev) => ({ ...prev, password }));
    validatePassword(password);
  };

  const checkFormChanged = () => {
    const hasEmailChanged =
      userData.email !== localStorage.getItem("newEmailInput");

    const hasChanged =
      hasEmailChanged ||
      (userData.name || "") !== (initialUserData.name || "") ||
      (userData.phone || "") !== (initialUserData.phone || "") ||
      (userData.password || "") !== (initialUserData.password || "");

    setIsFormChanged(hasChanged);
  };

  useEffect(() => {
    checkFormChanged();
  }, [userData]);

  const validateForm = () => {
    const isEmailValid = validateEmail(userData.email);
    const isPasswordValid = validatePassword(userData.password);
    const isPhoneValid = userData.phone ? validatePhone(userData.phone) : true;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setPhoneError(!isPhoneValid);

    const isFormValid = isEmailValid && isPasswordValid && isPhoneValid;
    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    if (isEmailLoaded) {
      checkFormChanged();
      validateForm();
    }
  }, [userData, initialUserData]);

  const formattedDate = new Date(userData.nextBillingDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const fetchUserProfile = async () => {
    try {
      const tokenIsValid = await validateToken();
      if (!tokenIsValid) {
        setModalType("failure");
        setModalMessage("Your session has expired. Please login again.");
        setIsModalVisible(true);

        setTimeout(() => {
          setIsModalVisible(false);
          navigate("/");
        }, 3000);
        return;
      }

      const users = await dbInstance.getData("users");
      if (!users || users.length === 0) {
        console.error("No user data found in IndexedDB");
        return;
      }

      const verifiedUser = users.find((user: any) => user.token);

      if (!verifiedUser) {
        console.error("No verified user with token found");
        return;
      }

      const userToken = verifiedUser.token;

      const response = await axios.get(
        "https://eternalai.fly.dev/user/profile",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const profileData = response.data;

      const storedEmail = localStorage.getItem("userEmail");

      const updatedEmail = storedEmail || profileData.email;

      localStorage.setItem("newEmailInput", profileData.email);

      setInitialEmail(profileData.email);

      if (!profileData.isVerified) {
        setTimeout(() => {
          setModalType("success");
          setModalMessage("Please, check your email box to verify your email!");
          setIsModalVisible(true);
        }, 3000);
      }

      setInitialUserData({
        email: profileData.email,
        name: profileData.name,
        phone: profileData.phone,
        password: "",
      });

      setUserData({
        ...profileData,
        email: updatedEmail,
        nextBillingDate: profileData.nextBillingDate,
        isVerified: false,
        isSubscriptionCancelled: false,
      });

      setIsEmailLoaded(true);
      setDataLoaded(false);
    } catch (error: any) {
      console.error("Error fetching user profile:", error);

      if (error.response?.status === 401) {
        console.error(
          "Token is expired or invalid, deleting token and redirecting to login..."
        );

        try {
          const users = await dbInstance.getData("users");
          const tokensToDelete: number[] = [];

          users.forEach((user: User) => {
            if (user.token) {
              tokensToDelete.push(user.id);
            }
          });

          for (const userId of tokensToDelete) {
            await dbInstance.deleteData("users", userId);
          }

          setModalType("failure");
          setModalMessage("Please, check your email box to verify your email!");
          setIsModalVisible(true);

          setTimeout(() => {
            setIsModalVisible(false);
            navigate("/");
          }, 3000);
        } catch (error) {
          console.error("Error deleting token:", error);
        }
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleUpdateUserData = async () => {
    if (!isFormValid) return;

    try {
      const users = await dbInstance.getData("users");
      if (!users || users.length === 0) {
        console.error("No user data found in IndexedDB");
        return;
      }

      const verifiedUser = users.find((user: any) => user.token);

      if (!verifiedUser) {
        console.error("No verified user with token found");
        return;
      }

      const userToken = verifiedUser.token;

      const tokenIsValid = await validateToken();
      if (!tokenIsValid) {
        setModalType("failure");
        setModalMessage("Your session has expired. Please login again.");
        setIsModalVisible(true);

        setTimeout(() => {
          setIsModalVisible(false);
          navigate("/");
        }, 3000);
        return;
      }

      const updatedData = {
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        password: userData.password,
        isVerified: userData.isVerified,
      };

      const response = await axios.put(
        "https://eternalai.fly.dev/user/profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { email, name, phone } = response.data;

      setInitialUserData({
        email: email,
        name: name,
        phone: phone,
        password: "",
      });
      setIsFormChanged(false);

      if (response.status === 200) {
        setUserData((prev) => ({
          ...prev,
          password: "",
        }));

        setInitialEmail(userData.email);

        localStorage.setItem("newEmailInput", userData.email);

        await dbInstance.addData("users", { ...updatedData });
        setModalType("success");
        setModalMessage("User data updated successfully");
        setIsModalVisible(true);

        setTimeout(() => {
          setIsModalVisible(false);

          if (userData.email !== initialEmail) {
            setModalMessage(
              "Please check your email to verify the new address"
            );
            setIsModalVisible(true);
          }
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error updating user data:", error);

      if (error.response?.status === 401) {
        console.error(
          "Token is expired or invalid, deleting token and redirecting to login..."
        );

        try {
          const users = await dbInstance.getData("users");
          const tokensToDelete: number[] = [];

          users.forEach((user: User) => {
            if (user.token) {
              tokensToDelete.push(user.id);
            }
          });

          for (const userId of tokensToDelete) {
            await dbInstance.deleteData("users", userId);
          }

          setModalType("failure");
          setModalMessage("Please login to access your profile");
          setIsModalVisible(true);

          setTimeout(() => {
            setIsModalVisible(false);
            navigate("/");
          }, 3000);
        } catch (error) {
          console.error("Error deleting token:", error);
        }
      } else if (error.response?.status === 500) {
        setModalType("failure");
        setModalMessage("Email already in use");
        setIsModalVisible(true);
      }
    }
  };

  const handleResumeSubscription = async () => {
    try {
      const users = await dbInstance.getData("users");
      if (!users || users.length === 0) {
        console.error("No user data found in IndexedDB");
        return;
      }

      const verifiedUser = users.find((user: any) => user.token);

      if (!verifiedUser) {
        console.error("No verified user with token found");
        return;
      }

      const userToken = verifiedUser.token;

      const response = await axios.put(
        "https://eternalai.fly.dev/payment/renew-subscription",
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        setUserData((prevData) => ({
          ...prevData,
          hasSubscription: true,
          isSubscriptionCanceled: false,
        }));
        setModalType("success");
        setModalMessage("Subscription resumed successfully");
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error("Error resuming subscription:", error);
      setModalType("failure");
      setModalMessage("An error occurred while resuming the subscription");
      setIsModalVisible(true);
    }
  };

  const handleUpdatePayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    setIsLoading(true);
    try {
      const users = await dbInstance.getData("users");
      if (!users || users.length === 0) {
        console.error("No user data found in IndexedDB");
        setIsLoading(false);
        return;
      }

      const verifiedUser = users.find((user: any) => user.token);

      if (!verifiedUser) {
        console.error("No verified user with token found");
        setIsLoading(false);
        return;
      }

      const userToken = verifiedUser.token;

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        console.error("CardElement not found");
        setIsLoading(false);
        return;
      }
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
      });

      if (error) {
        setModalType("failure");
        setModalMessage("An error occurred during payment processing");
        setIsModalVisible(true);
        setIsLoading(false);
        return;
      }

      if (!paymentMethod) {
        setModalType("failure");
        setModalMessage("An error occurred during payment processing");
        setIsModalVisible(true);
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        "https://eternalai.fly.dev/payment/update-subscription",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            priceId: "price_1JZ5ZwJ9z1Z6ZzZzZzZzZzZz",
          }),
        }
      );

      const result = await response.json();
      if (response.status === 200) {
        setIsPaymentUpdated(true);
        setShowCardInput(false);
      }
      if (result.error) {
        setModalType("failure");
        setModalMessage("An error occurred during payment processing");
        setIsModalVisible(true);
        setIsLoading(false);
        return;
      }

      setIsPaymentUpdated(true);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setModalType("failure");
      setModalMessage("An error occurred during payment processing");
      setIsModalVisible(true);
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#FFFFFF80",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#FFFFFF80",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
    autoComplete: "off",
  };

  const handleCancelSubscription = () => {
    setIsCancelModalVisible(true);
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalVisible(false);
  };

  const handleConfirmCancel = async () => {
    try {
      const users = await dbInstance.getData("users");
      if (!users || users.length === 0) {
        console.error("No user data found in IndexedDB");
        return;
      }

      const verifiedUser = users.find((user: any) => user.token);

      if (!verifiedUser) {
        console.error("No verified user with token found");
        return;
      }

      const userToken = verifiedUser.token;

      const response = await axios.delete(
        "https://eternalai.fly.dev/payment/cancel-subscription",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        setUserData((prevData) => ({
          ...prevData,
          hasSubscription: true,
          isSubscriptionCanceled: true,
        }));
        setModalType("success");
        setModalMessage("Subscription cancelled successfully");
        setIsModalVisible(true);
      }
      setIsCancelModalVisible(false);
    } catch (error) {
      setModalType("failure");
      setModalMessage("An error occurred while cancelling subscription");
      setIsModalVisible(true);
    } finally {
      setIsCancelModalVisible(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchUserProfile()]);
      setDataLoaded(false);
    };
    loadData();
  }, []);

  if (dataLoaded) {
    return <Loader />;
  }

  return (
    <>
      <ModalSuccess
        isVisible={isModalVisible}
        modalType={modalType}
        message={modalMessage}
        onClose={() => setIsModalVisible(false)}
      />
      {isCancelModalVisible && (
        <>
          <ModalCancel
            onConfirm={handleConfirmCancel}
            onClose={handleCloseCancelModal}
          />
        </>
      )}

      <Container>
        <FirstBox>
          <AvenirH2>Account Details</AvenirH2>
          <Row>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              placeholder={userData.name || "Justin Mac"}
              value={userData.name || ""}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Row>
          <Row>
            <EmailContainer>
              <label htmlFor="email">Email</label>
              <VerificationIcon>
                <FontAwesomeIcon
                  icon={
                    userData.email !== initialUserData.email
                      ? faTimesCircle
                      : faCheckCircle
                  }
                  style={{
                    width: "15px",
                    height: "15px",
                    color:
                      userData.email !== initialUserData.email
                        ? "red"
                        : "green",
                  }}
                />
                {emailHint && (
                  <span
                    style={{
                      color: emailError || emailUnverified ? "red" : "green",
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    {emailHint}
                  </span>
                )}
              </VerificationIcon>
            </EmailContainer>
            <input
              type="email"
              id="email"
              placeholder={userData.email || ""}
              value={userData.email || ""}
              onChange={handleEmailChange}
              disabled={isLoading}
              style={{
                borderColor: emailError ? "red" : "",
              }}
            />
          </Row>
          <Row>
            <label htmlFor="phone">Phone number</label>
            <InputMask
              mask="+380 99 999 99 99"
              value={userData.phone || ""}
              placeholder="add your phone number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              style={{
                borderColor: phoneError ? "red" : "",
              }}
            >
              {(inputProps: any) => <input {...inputProps} type="tel" />}
            </InputMask>
          </Row>
          <Row>
            <label htmlFor="password">
              Password
              <StyledIcon
                icon={isPasswordVisible ? faEye : faEyeSlash}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
              {passwordHint && (
                <span
                  style={{ color: "red", fontSize: "12px", marginLeft: "10px" }}
                >
                  {passwordHint}
                </span>
              )}
            </label>

            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="add your password"
              value={userData.password}
              onChange={handlePasswordChange}
              style={{
                borderColor: passwordError ? "red" : "",
              }}
            />
          </Row>
          <ButtonContainer>
            <Button
              onClick={handleUpdateUserData}
              disabled={!isFormChanged || !isFormValid}
            >
              SAVE
            </Button>
          </ButtonContainer>
        </FirstBox>

        {userData.hasSubscription && (
          <SecondBox>
            <Boxik>
              <ArquitectaH5 style={{ color: "white" }}>PRO</ArquitectaH5>
            </Boxik>
            <AvenirH4
              style={{
                color: "white",
                marginTop: "12px",
                marginBottom: "12px",
              }}
            >
              $10 / month
            </AvenirH4>
            <Text>
              {!userData.isSubscriptionCanceled
                ? `Next payment will be processed on ${formattedDate || "N/A"}`
                : `Your subscription will expire on ${formattedDate || "N/A"}`}
            </Text>

            {userData.hasSubscription && !userData.isSubscriptionCanceled ? (
              !showCardInput ? (
                <div style={{ width: "100%" }}>
                  <ButtonUpdate onClick={handleSubmit}>
                    UPDATE PAYMENT
                  </ButtonUpdate>
                  <ButtonCancel onClick={handleCancelSubscription}>
                    CANCEL SUBSCRIPTION
                  </ButtonCancel>
                </div>
              ) : (
                <CardInputContainer>
                  <CardDetails>
                    <div
                      style={{
                        marginBottom: "0px",
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <CardElement options={cardElementOptions} />
                    </div>
                  </CardDetails>
                  {isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperClass="color-ring-wrapper"
                        colors={[
                          "#f82d98",
                          "#f82d98",
                          "#F82D98",
                          "#5833ef",
                          "#5833ef",
                        ]}
                      />
                    </div>
                  ) : (
                    <SaveButtonPay onClick={handleUpdatePayment}>
                      SAVE
                    </SaveButtonPay>
                  )}
                </CardInputContainer>
              )
            ) : (
              <>
                {userData.isSubscriptionCanceled && !showCardInput && (
                  <>
                    <ButtonUpdate onClick={handleSubmit}>
                      UPDATE PAYMENT
                    </ButtonUpdate>
                    <ButtonUpdate onClick={handleResumeSubscription}>
                      RESUME SUBSCRIPTION
                    </ButtonUpdate>
                  </>
                )}
                {userData.isSubscriptionCanceled && showCardInput && (
                  <CardInputContainer>
                    <CardDetails>
                      <div
                        style={{
                          marginBottom: "0px",
                          width: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <CardElement options={cardElementOptions} />
                      </div>
                    </CardDetails>
                    {isLoading ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ColorRing
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="color-ring-loading"
                          wrapperClass="color-ring-wrapper"
                          colors={[
                            "#f82d98",
                            "#f82d98",
                            "#F82D98",
                            "#5833ef",
                            "#5833ef",
                          ]}
                        />
                      </div>
                    ) : (
                      <SaveButtonPay onClick={handleUpdatePayment}>
                        SAVE
                      </SaveButtonPay>
                    )}
                  </CardInputContainer>
                )}
              </>
            )}
          </SecondBox>
        )}
        <ImageDown src={down} />
        <Footer />
      </Container>
    </>
  );
};

export default AccountDetails;
