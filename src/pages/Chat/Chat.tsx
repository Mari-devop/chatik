import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
  const [scrolled, setScrolled] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0);
  const [response, setResponse] = useState<string | null>(null);
  const [filteredResponses, setFilteredResponses] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const individual = location.state;

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
  
  const filterResponses = useCallback(
    (responses: any) => {
      const questionId = Number(individual?.questionId);
      const filterQId = responses.filter((resp: any) => resp[questionId]);
      setCurrentQuestionId(questionId);
      return filterQId;
    },
    [individual]
  );

  const loadResponsesFromIndexedDB = useCallback(async () => {
    const savedResponses = await dbInstance.getData("responses");

    const relevantResponses = filterResponses(savedResponses);
    setFilteredResponses(relevantResponses);
  }, [filterResponses]);

  const hasFetchedResponse = useRef(false);

  const fetchResponse = useCallback(async () => {
    if (!individual || hasFetchedResponse.current) return;
    if (!individual.questionId) return;

    hasFetchedResponse.current = true;

    try {
      const body = {
        questionId: individual.questionId,
        characterId: individual.id,
      };

      const response = await axios.post(
        "https://eternalai.fly.dev/api/freeChat",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newResponse = {
        text: response.data.response,
        smallImage: individual.smallImage || "",
        individualId: individual.id,
        questionId: individual.questionId,
      };

      setResponse(newResponse.text);

      if (
        !isAuthenticated ||
        (isAuthenticated && individual?.questionId && individual?.id)
      ) {
        const responsesFromDB = await dbInstance.getData("responses");

        let existingResponses = responsesFromDB[individual.questionId];

        if (!Array.isArray(existingResponses)) {
          existingResponses = [];
        }

        const isDuplicate = existingResponses.some(
          (resp: any) => resp.text === newResponse.text
        );

        if (!isDuplicate) {
          existingResponses.push(newResponse);

          await dbInstance.addData("responses", {
            [individual.questionId]: existingResponses,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  }, [individual, isAuthenticated]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const users = await dbInstance.getData("users");
      const userToken = users?.[0]?.token;

      if (!userToken) {
        console.error("Token is missing or user is not authenticated");
        return;
      }

      const body = {
        characterId: individual.id,
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

      setChatHistory((prev) => [...prev, { text: message, isUser: true }]);

      setResponse(response.data.response);

      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { text: response.data.response, isUser: false },
        ]);
        setResponse(null); 
      }, 3000);

      setMessage("");
    } catch (error: any) {
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
        }, 5000);
      } else if (error.response?.status === 401) {
        console.error("Unauthorized - Redirect to login or re-authenticate");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isAuthenticated) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (individual) {
      loadResponsesFromIndexedDB();
      fetchResponse();
    }
  }, [individual, loadResponsesFromIndexedDB, fetchResponse]);

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
            <Question>
              <Text>{message || individual?.questionText}</Text>
            </Question>
            <AnswerBox id="scrollContainer">
            <FadeOverlay $scrolled={scrolled} />
              {filteredResponses.length > 0
                ? filteredResponses.map((resp, index) => (
                    <Respond key={index}>
                      <IconBox>
                        <Icon
                          src={resp[currentQuestionId][0]?.smallImage || shadow}
                        />
                      </IconBox>
                      <RespondBox>
                        <TextRespond>
                          {resp[currentQuestionId][0]?.text}
                        </TextRespond>
                        <Social>
                          <IconSocial src={voice} />
                          <IconSocial src={share} />
                        </Social>
                      </RespondBox>
                    </Respond>
                  ))
                : null}
              {chatHistory.length > 0 ? (
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
                ))
              ) : (
                <TextRespond>No responses yet</TextRespond>
              )}
            </AnswerBox>
          </RespondContainer>
          <QuestionContainer>
            <PersonAnswer>
              <Text>{response || <LoadingDots />}</Text>
            </PersonAnswer>
          </QuestionContainer>
          <InputBox>
            <InputWrapper>
              <Input
                placeholder="Enter your message..."
                disabled={!isAuthenticated}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
