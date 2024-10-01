import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { dbInstance } from "../../db";
import { validateToken } from "../../utils/authUtils";
import { User } from "../../components/menu/types";
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
import share from "../../assets/images/chat/Frame 143725072.png";

interface Message {
  isUser: boolean;
  text: string;
  smallImage: string;
}

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
    name,
    title,
  } = location.state;
  const [scrolled, setScrolled] = useState(false);
  const [filteredResponses, setFilteredResponses] = useState<any[]>(
    location.state.filteredResponses || []
  );
  const [currentResponse, setCurrentResponse] = useState<string | null>(
    initialResponse
  );
  const [userImage, setUserImage] = useState<string>(shadow); //может и не надо
  const [message, setMessage] = useState<string>("");
  const [isGrowing, setIsGrowing] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [questionVisible, setQuestionVisible] = useState(true);
  const [isDialogStarted, setIsDialogStarted] = useState(false);
  const [wasQuestionClicked, setWasQuestionClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [userIsScrolling, setUserIsScrolling] = useState(false);
  const answerBoxRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const users = await dbInstance.getData("users");
      const lastUser = users[users.length - 1];
      if (lastUser?.image) {
        setUserImage(lastUser.image);  // Store the user's image
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const { filteredResponses } = location.state;

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
  }, [location.state.filteredResponses]);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const top = target.scrollTop;
    const height = target.scrollHeight - target.clientHeight;
    setScrolled(top > 0);

    if (top < height - 100) {
      setUserIsScrolling(true);
    } else {
      setUserIsScrolling(false);
    }
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

  useEffect(() => {
    if (!userIsScrolling && answerBoxRef.current) {
      answerBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filteredResponses, chatHistory]);

  const breakLongWords = (message: string, maxLength: number = 32): string => {
    return message.split(' ').map(word => {
      if (word.length > maxLength) {
        const brokenWord = word.match(new RegExp(`.{1,${maxLength}}`, 'g'))?.join('\n') || word;
        return brokenWord;
      }
      return word;
    }).join(' ');
  };
  
  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    try {
      const users = await dbInstance.getData("users");
      const lastUser = users[users.length - 1];
      const token = lastUser?.token;
      // const userImage = lastUser?.image || shadow; 

      if (!token) {
        setModalType("failure");
        setModalMessage("Your session has expired. Please login again.");
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
          navigate("/");
        }, 3000);
        return;
      }

      const tokenIsValid = await validateToken();
      if (!tokenIsValid) {
        setModalType("failure");
        setModalMessage("Your session has expired. Please login again.");
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
          navigate("/");
        }, 3000);
        return;
      }

      setIsLoading(true);
      setIsDialogStarted(true);
      setChatHistory((prev) => [...prev, { text: formattedMessage, isUser: true, smallImage: userImage }]);

      const formattedMessage = breakLongWords(message, 32); 
      // setChatHistory((prev) => [...prev, { text: message, isUser: true }]);
      if (currentResponse && currentResponse.trim() !== "") {
        setChatHistory((prev) => [
          ...prev,
          { text: currentResponse, isUser: false, smallImage: individual?.smallImage }
        ]);
        setCurrentResponse(null);
      }
     

      const body = {
        characterId: individualId,
        message: formattedMessage,
      };

      const response = await axios.post(
        "https://eternalai.fly.dev/api/chat",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const smallImage =
      //   individual?.smallImage ||
      //   (await fetchSmallImageForResponse(individualId));
      // setChatHistory((prev) => [
      //   ...prev,
      //   { text: response.data.response, isUser: false, smallImage },
      // ]);
      // setCurrentResponse(response.data.response);

      const smallImage = await fetchSmallImageForResponse(individualId);
      setCurrentResponse(response.data.response);
      //setFilteredResponses((prev) => [...prev, { text: response.data.response, smallImage, individualId }]);
      
      setMessage("");
 

      const input = document.querySelector("textarea") as HTMLTextAreaElement;
      if (input) {
        input.style.height = "auto"; 
      }
      
      setIsGrowing(false); 

      setQuestionVisible(false);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error sending message:", error);

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
          setModalMessage("Your session has expired. Please login again.");
          setShowModal(true);

          setTimeout(() => {
            setShowModal(false);
            navigate("/");
          }, 3000);
        } catch (deleteError) {
          console.error("Error deleting token:", deleteError);
        }
      }
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

  const fetchAllChatHistory = useCallback(async () => {
    if (!individualId) return;
  
    try {
      const users = await dbInstance.getData("users");
      const lastUser = users[users.length - 1];
      const userToken = lastUser?.token;
  
      if (!userToken) {
        console.error("Token is missing or user is not authenticated");
        return;
      }
  
      let allChatHistory: Message[] = [];
      let page = 1;
      let totalPages = 1;
  
      while (page <= totalPages) {
        const response = await axios.get(
          `https://eternalai.fly.dev/api/chatHistory/${individualId}?page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
  
        const { chat, totalPages: fetchedTotalPages } = response.data.chatHistory;
        totalPages = fetchedTotalPages;
  
        const updatedChatHistory = await Promise.all(
          chat.map(async (entry: any) => {
            const smallImage = await fetchSmallImageForResponse(individualId);
            return {
              isUser: entry.sender === "user",
              text: entry.content,
              smallImage: entry.sender === "user" ? userImage : smallImage,
            };
          })
        );

        allChatHistory = [...allChatHistory, ...updatedChatHistory];
  
        page += 1;
      }
  
      setChatHistory(allChatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  }, [individualId, userImage]);
  
  useEffect(() => {
    if (individual) {
      fetchAllChatHistory();
    }
  }, [individual, fetchAllChatHistory]);
  



  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement; 
    
    if (e.key === "Enter") {
      if (e.shiftKey) {
        e.preventDefault();

        const { selectionStart, selectionEnd } = target;
        
        const newValue = message.slice(0, selectionStart) + "\n" + message.slice(selectionEnd);
        setMessage(newValue);
  
      
        setTimeout(() => {
        target.style.height = "auto"; 
        target.style.height = `${target.scrollHeight}px`; 
      }, 0);
      } else {
 
        e.preventDefault();

        handleSendMessage();
        setMessage("");
        target.style.height = "auto";
      }
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setIsGrowing(e.target.scrollHeight > 45);
    setQuestionVisible(false);
  };

  const handleInputFocus = () => {
    setQuestionVisible(false);
  };

  const handleQuestionClick = () => {
    setWasQuestionClicked(true);
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
              <Title>{name || individual?.name}</Title>
              <Subtitle>{title || individual?.title}</Subtitle>
            </TextBox>
          </PersonBox>
        </PersonContainer>
        <DialogContainer>
          <RespondContainer>
            {(isDialogStarted || !!individual?.questionText) && (
              <Question
                $isVisible={questionVisible && !!individual?.questionText}
                onClick={handleQuestionClick}
              >
                <Text>{individual?.questionText}</Text>
              </Question>
            )}
            <AnswerBox id="scrollContainer" ref={scrollContainerRef}>
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
                        <IconSocial src={share} />
                      </Social>
                    </RespondBox>
                  </Respond>
                ))}
 
              {chatHistory.length > 0 &&
                chatHistory.map((chat, index) => (
                  <Respond key={index}>
                    <IconBox>
                    <Icon src={chat.isUser ? chat.smallImage : individual?.smallImage || shadow} />
                    </IconBox>
                    <RespondBox>
                      <TextRespond>{chat.text}</TextRespond>
                      <Social>
                        <IconSocial src={share} />
                      </Social>
                    </RespondBox>
                  </Respond>
                ))}
              <div ref={answerBoxRef} />
            </AnswerBox>
          </RespondContainer>
          <QuestionContainer>
            {((isDialogStarted && currentResponse) || !!individual?.questionText) && (
              <PersonAnswer>
                <Text>{currentResponse || <LoadingDots />}</Text>
              </PersonAnswer>
            )}
          </QuestionContainer>
          <InputBox>
            <InputWrapper isGrowing={isGrowing}>
              <Input
                as="textarea"
                placeholder="Enter your message..."
                disabled={!isAuthenticated}
                value={message}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                rows={1}
                isGrowing={isGrowing}
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