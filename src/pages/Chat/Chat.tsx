import React, { useState, useEffect, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { dbInstance } from "../../db";
import { validateToken } from "../../utils/authUtils";
import { ChatProps, Message } from "./types";
import { User } from "../../components/menu/types";
import { ColorRing } from "react-loader-spinner";
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
import profile from "../../assets/images/profile-user.png";

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

  const [filteredResponses, setFilteredResponses] = useState<any[]>(
    location.state.filteredResponses || []
  );
  const [currentResponse, setCurrentResponse] = useState<string | null>(
    initialResponse
  );
  const [userImage, setUserImage] = useState<string>(profile);
  const [message, setMessage] = useState<string>("");
  const [isGrowing, setIsGrowing] = useState(false);
  const [showResponses, setShowResponses] = useState(true);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [questionVisible, setQuestionVisible] = useState(true);
  const [isDialogStarted, setIsDialogStarted] = useState(false);
  const [wasQuestionClicked, setWasQuestionClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
  const answerBoxRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef(false);
  const currentPageRef = useRef<number | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const handleInputClick = () => {
    if (!isAuthenticated) {
      setModalType("failure");
      setModalMessage("Please login to use this feature.");
      setShowModal(true);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const users = await dbInstance.getData("users");
      const lastUser = users[users.length - 1];
      if (lastUser?.image) {
        setUserImage(lastUser.image || profile);
      }
    };
    fetchUserData();
  }, []);

  const handleShare = async (text: string, individualId: number) => {
    try {
      const individuals = await dbInstance.getData("individuals");
      const individual = individuals.find(
        (ind: any) => ind.id === individualId
      );
      const individualName = individual?.name || "Shared Response";
      const fullMessage = `${text}\n\nGenerated by ${window.location.origin}`;

      if (navigator.share) {
        const shareText = `Response from ${individualName}:\n\n${text}\n\nGenerated by ${window.location.origin}`;

        navigator
          .share({
            text: shareText,
          })
          .then(() => console.log("Successfully shared!"))
          .catch((error) => console.error("Error sharing:", error));
      } else {
        navigator.clipboard.writeText(fullMessage).then(
          () => {
            alert(`Response from ${individualName} copied to clipboard!`);
          },
          (error) => {
            console.error("Could not copy text: ", error);
          }
        );
      }
    } catch (error) {
      console.error("Error fetching individual name:", error);
    }
  };

  useEffect(() => {
    const { filteredResponses } = location.state;

    if (!filteredResponses || filteredResponses.length === 0) {
      console.warn("No filtered responses available");
    }
  }, [location.state]);

  const fetchSmallImageForResponse = async (individualId: number) => {
    const individuals = await dbInstance.getData("individuals");
    const individual = individuals.find((ind: any) => ind.id === individualId);
    return individual?.smallImage || profile;
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

  const breakLongWords = (message: string, maxLength: number = 32): string => {
    return message
      .split(" ")
      .map((word) => {
        if (word.length > maxLength) {
          const brokenWord =
            word.match(new RegExp(`.{1,${maxLength}}`, "g"))?.join("\n") ||
            word;
          return brokenWord;
        }
        return word;
      })
      .join(" ");
  };

  useEffect(() => {
    const initializeSocket = async () => {
      const users = await dbInstance.getData("users");
      const lastUser = users[users.length - 1];
      const token = lastUser?.token;

      if (!token) {
        setModalType("failure");
        setModalMessage("Please login to use this feature.");
        setShowModal(true);
        return;
      }

      if (socketRef.current) {
        return;
      }

      socketRef.current = io("https://eternalai.fly.dev", {
        auth: {
          token: token,
        },
        transports: ["websocket"],
      });

      socketRef.current.on("chatResponse", (response: any) => {
        const newMessage = response.response;
        const smallImage = individual?.smallImage || profile;

        setCurrentResponse(newMessage);

        setChatHistory((prev) => [
          ...prev,
          {
            text: newMessage,
            isUser: false,
            smallImage: smallImage,
          },
        ]);

        setIsLoading(false);
        setIsDialogStarted(false);
      });

      socketRef.current.on("error", (error: any) => {
        console.error("Error:", error);
      });

      return () => {
        socketRef.current?.disconnect();
      };
    };

    initializeSocket();
  }, [individualId, individual?.smallImage]);

  useEffect(() => {
    if (answerBoxRef.current) {
      answerBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, currentResponse]);
  
  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    try {
      const users = await dbInstance.getData("users");
      const lastUser = users[users.length - 1];
      const token = lastUser?.token;

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

      const formattedMessage = breakLongWords(message, 32);

      setChatHistory((prev) => [
        ...prev,
        {
          text: formattedMessage,
          isUser: true,
          smallImage: userImage || profile,
        },
      ]);

      socketRef.current?.emit("userChat", {
        characterId: individualId,
        message: formattedMessage,
      });
      console.log("Message sent to server:", formattedMessage);
      setMessage("");
      setCurrentResponse(null);

      setIsLoading(false);
      answerBoxRef.current?.scrollIntoView({ behavior: "smooth" });

      const input = document.querySelector("textarea") as HTMLTextAreaElement;
      if (input) {
        input.style.height = "auto";
      }

      setIsGrowing(false);
      setQuestionVisible(false);
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
      } else if (error.response?.status === 500) {
        setModalType("failure");
        setModalMessage("Please subscribe to use this feature.");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/paywall");
        }, 3000);
      }
    }
  };

  const fetchChatHistory = useCallback(
    async (page: number) => {
      try {
        const users = await dbInstance.getData("users");
        const lastUser = users[users.length - 1];
        const userToken = lastUser?.token;

        if (!userToken) {
          console.error("Token is missing or user is not authenticated");
          return;
        }

        const response = await axios.get(
          `https://eternalai.fly.dev/api/chatHistory/${individualId}?page=${page}&pageSize=6`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const { chat, totalPages: fetchedTotalPages } =
          response.data.chatHistory;

        const updatedChatHistory = await Promise.all(
          chat.map(async (entry: any) => {
            const smallImage = await fetchSmallImageForResponse(individualId);
            return {
              isUser: entry.sender === "user",
              text: entry.content,
              smallImage:
                entry.sender === "user"
                  ? lastUser.image || profile
                  : smallImage,
            };
          })
        );

        setChatHistory((prev) =>
          page === fetchedTotalPages
            ? updatedChatHistory
            : [...updatedChatHistory, ...prev]
        );
        setTotalPages(fetchedTotalPages);
        currentPageRef.current = page;
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    },
    [individualId]
  );

  const handleScroll = useCallback(() => {
    if (
      !scrollContainerRef.current ||
      isFetching.current ||
      currentPageRef.current === 1
    )
      return;

    const { scrollTop } = scrollContainerRef.current;

    if (
      scrollTop === 0 &&
      currentPageRef.current &&
      currentPageRef.current > 1
    ) {
      isFetching.current = true;
      setIsLoading(true);

      fetchChatHistory(currentPageRef.current - 1).then(() => {
        isFetching.current = false;
        setIsLoading(false);
      });
    }
  }, [fetchChatHistory]);

  useEffect(() => {
    const initFetch = async () => {
      if (!isFetching.current) {
        isFetching.current = true;
        setIsLoading(true);

        await fetchChatHistory(totalPages);
        setIsLoading(false);
        isFetching.current = false;
      }
    };

    initFetch();
  }, [fetchChatHistory, totalPages]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;

    if (e.key === "Enter") {
      if (e.shiftKey) {
        e.preventDefault();

        const { selectionStart, selectionEnd } = target;

        const newValue =
          message.slice(0, selectionStart) + "\n" + message.slice(selectionEnd);
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

    if (e.target.value.trim()) {
      setShowResponses(false);
    } else {
      setShowResponses(true);
    }
  };

  const handleInputFocus = () => {
    setQuestionVisible(false);
    setShowResponses(false);
  };

  const handleQuestionClick = () => {
    setWasQuestionClicked(true);
  };

  useEffect(() => {
    if (!isDialogStarted && !!individual?.questionText) {
      setQuestionVisible(true); 
    } else {
      setQuestionVisible(false); 
    }
  }, [individualId, individual, isDialogStarted]);
  

  return (
    <>
      <ModalSuccess
        isVisible={showModal}
        modalType="failure"
        message={modalMessage}
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
            <AnswerBox ref={scrollContainerRef}>
              {isLoading && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ColorRing
                    visible={true}
                    height="35"
                    width="35"
                    ariaLabel="color-ring-loading"
                    colors={[
                      "#f82d98",
                      "#f82d98",
                      "#F82D98",
                      "#5833ef",
                      "#5833ef",
                    ]}
                  />
                </div>
              )}
            {!isDialogStarted && questionVisible && !!individual?.questionText && (
                <Question
                  $isVisible={questionVisible && !!individual?.questionText}
                  onClick={handleQuestionClick}
                >
                  <Text>{individual?.questionText}</Text>
                </Question>
              )}
              {showResponses &&
                filteredResponses.length > 0 &&
                filteredResponses.map((resp: any, index: number) => (
                  <Respond key={index}>
                    <IconBox>
                      <Icon src={resp?.smallImage || profile} />
                    </IconBox>
                    <RespondBox>
                      <TextRespond>
                        {resp?.text || "No response available"}
                      </TextRespond>
                      <Social>
                        <IconSocial
                          src={share}
                          onClick={() =>
                            handleShare(resp?.text, resp?.individualId)
                          }
                        />
                      </Social>
                    </RespondBox>
                  </Respond>
                ))}

              {chatHistory.length > 0 &&
                chatHistory.map((chat, index) => (
                  <Respond key={index}>
                    <IconBox>
                      <Icon
                        src={
                          chat.isUser
                            ? chat.smallImage
                            : individual?.smallImage || profile
                        }
                      />
                    </IconBox>
                    <RespondBox>
                      <TextRespond>{chat.text}</TextRespond>
                      <Social>
                        <IconSocial
                          src={share}
                          onClick={() =>
                            handleShare(
                              chat?.text,
                              chat?.isUser ? 0 : individualId
                            )
                          }
                        />
                      </Social>
                    </RespondBox>
                  </Respond>
                ))}
              <div ref={answerBoxRef} />
            </AnswerBox>
          </RespondContainer>
          <QuestionContainer>
            {isDialogStarted && (
              <PersonAnswer>
                <Text>{currentResponse || <LoadingDots />}</Text>
              </PersonAnswer>
            )}
          </QuestionContainer>
          <InputBox>
            <InputWrapper isGrowing={isGrowing} onClick={handleInputClick}>
              <Input
                as="textarea"
                placeholder="Enter your message..."
                style={{ pointerEvents: isAuthenticated ? "auto" : "none" }}
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
