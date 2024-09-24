import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { dbInstance } from "../../db";
import {
  ChatContainer,
  PersonContainer,
  PersonBox,
  Title,
  Subtitle,
  TextBox,
  DialogContainer,
  RespondContainer,
  QuestionContainer,
  Question,
  Text,
  AnswerBox,
  FadeOverlay,
  Respond,
  RespondBox,
  TextRespond,
  Icon,
  Social,
  IconSocial,
  PersonShadow,
  PersonPhoto,
  IconBox,
  PersonAnswer,
  InputBox,
  Input,
  InputWrapper,
  Button,
} from "./Chat.styled";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import LoadingDots from "../../components/LoadingDots/LoadingDots";
import shadow from "../../assets/images/chat/shadow.png";
import voice from "../../assets/images/chat/Frame 143725185.png";
import share from "../../assets/images/chat/Frame 143725072.png";

interface ChatProps {
  isAuthenticated: boolean;
}

const Chat: React.FC<ChatProps> = ({ isAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const individual = location.state;
  const {
    individualId,
    response: initialResponse,
  } = location.state;
  console.log("Received state from /Home:", location.state);
  const [scrolled, setScrolled] = useState(false);
  const [filteredResponses, setFilteredResponses] = useState<any[]>(
    location.state.filteredResponses || []
  );
  const [currentResponse, setCurrentResponse] = useState<string | null>(
    initialResponse
  );
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [questionVisible, setQuestionVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Received state from /Home:", location.state);
    const { filteredResponses } = location.state;
    console.log("filteredResponses on /chat:", filteredResponses);

    if (!filteredResponses || filteredResponses.length === 0) {
      console.warn("No filtered responses available");
    }
  }, [location.state]);

  const fetchSmallImageForResponse = async (individualId: number) => {
    const individuals = await dbInstance.getData("individuals");
    const individual = individuals.find((ind: any) => ind.id === individualId);
    return individual?.smallImage || shadow;
  };

  useEffect(() => {
    const loadImagesForResponses = async () => {
      const updatedResponses = await Promise.all(
        filteredResponses.map(async (resp: any) => {
          const smallImage = await fetchSmallImageForResponse(
            resp.individualId
          );
          return { ...resp, smallImage };
        })
      );
      setFilteredResponses(updatedResponses);
    };

    if (filteredResponses.length > 0) {
      loadImagesForResponses();
    }
  }, [filteredResponses]);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const top = target.scrollTop;
    setScrolled(top > 0);
  };

  useEffect(() => {
    const scrollContainer = document.getElementById("scrollContainer");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    try {
      const users = await dbInstance.getData("users");
      const lastUser = users[users.length - 1];
      const userToken = lastUser?.token;

      if (!userToken) {
        console.error("Token is missing or user is not authenticated");
        return;
      }

      setIsLoading(true);
      if (currentResponse && currentResponse.trim() !== "") {
        setChatHistory((prev) => [
          ...prev,
          { text: currentResponse, isUser: false }, 
        ]);
      }

      setChatHistory((prev) => [...prev, { text: message, isUser: true }]);

      const body = {
        characterId: individualId,
        message: message,
      };

      const response = await axios.post(
        "https://eternalai.fly.dev/api/chat",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setCurrentResponse(response.data.response);
      setMessage("");
      setQuestionVisible(false);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error sending message:", error);

      if (
        error.response?.status === 500 &&
        error.response?.data?.message.includes(
          "Please subscribe to use this feature"
        )
      ) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/paywall");
        }, 3000);
      }
    }
  };

  const fetchChatHistory = useCallback(async () => {
    if (!individualId) return;

    try {
      const users = await dbInstance.getData("users");
      const lastUser = users[users.length - 1];
      const userToken = lastUser?.token;

      if (!userToken) {
        console.error("Token is missing or user is not authenticated");
        return;
      }

      const response = await axios.get(
        `https://eternalai.fly.dev/api/chatHistory/${individualId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const chatData = response.data.chatHistory;

      const parsedChatHistory = chatData.map((entry: any) => ({
        isUser: entry.sender === "user",
        text: entry.content,
      }));

      setChatHistory(parsedChatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  }, [individualId]);

  useEffect(() => {
    if (individual) {
      fetchChatHistory();
    }
  }, [individual, fetchChatHistory]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isAuthenticated) {
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setQuestionVisible(false);
  };

  const handleInputFocus = () => {
    setQuestionVisible(false);
  };

  return (
    <>
      <ModalSuccess
        isVisible={showModal}
        modalType="failure"
        message="Please subscribe to use this feature"
        onClose={() => setShowModal(false)}
      />

      <ChatContainer>
        <PersonContainer>
          <PersonBox>
            <PersonShadow src={shadow} />
            <PersonPhoto src={individual?.fullImage || ""} />
            <TextBox>
              <Title>{individual?.name}</Title>
              <Subtitle>{individual?.title}</Subtitle>
            </TextBox>
          </PersonBox>
        </PersonContainer>
        <DialogContainer>
          <RespondContainer>
          <Question $isVisible={questionVisible && !!individual?.questionText}>
                <Text>{individual?.questionText}</Text>
              </Question>
          

            <AnswerBox id="scrollContainer">
              <FadeOverlay $scrolled={scrolled} />
              {filteredResponses.length > 0 &&
                filteredResponses.map((resp: any, index: number) => (
                  <Respond key={index}>
                    <IconBox>
                      <Icon src={resp?.smallImage || shadow} />
                    </IconBox>
                    <RespondBox>
                      <TextRespond>
                        {resp?.text || "No response available"}
                      </TextRespond>
                      <Social>
                        <IconSocial src={voice} />
                        <IconSocial src={share} />
                      </Social>
                    </RespondBox>
                  </Respond>
                ))}

              {chatHistory.length > 0 &&
                chatHistory.map((chat, index) => (
                  <Respond key={index}>
                    <IconBox>
                      <Icon
                        src={chat.isUser ? shadow : individual?.smallImage}
                      />
                    </IconBox>
                    <RespondBox>
                      <TextRespond>{chat.text}</TextRespond>
                      <Social>
                        <IconSocial src={voice} />
                        <IconSocial src={share} />
                      </Social>
                    </RespondBox>
                  </Respond>
                ))}
            </AnswerBox>
          </RespondContainer>
          <QuestionContainer>
            <PersonAnswer>
              <Text>{currentResponse || <LoadingDots />}</Text>
            </PersonAnswer>
          </QuestionContainer>
          <InputBox>
            <InputWrapper>
              <Input
                placeholder="Enter your message..."
                disabled={!isAuthenticated}
                value={message}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
              />
            </InputWrapper>
            <Button onClick={handleSendMessage} disabled={!isAuthenticated}>
              SUBMIT
            </Button>
          </InputBox>
        </DialogContainer>
      </ChatContainer>
    </>
  );
};

export default Chat;
