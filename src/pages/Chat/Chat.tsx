import React, { useState, useEffect, useCallback, useRef } from "react";
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
import shadow from "../../assets/images/chat/shadow.png";
import voice from "../../assets/images/chat/Frame 143725185.png";
import share from "../../assets/images/chat/Frame 143725072.png";

const Chat = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0);
  const [response, setResponse] = useState<string | null>(null);
  const [filteredResponses, setFilteredResponses] = useState<any[]>([]);
  const location = useLocation();
  const individual = location.state;

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const top = target.scrollTop;
    setScrolled(top > 0);
  };

  const filterResponses = useCallback((responses: any) => {
    const questionId = Number(individual?.questionId);
    const filterQId = responses.filter((resp: any) => resp[questionId]);
    setCurrentQuestionId(questionId);
    return filterQId;
  }, [individual]);

  const loadResponsesFromIndexedDB = useCallback(async () => {
    const savedResponses = await dbInstance.getData("responses");
    console.log("Retrieved responses:", JSON.stringify(savedResponses, null, 2));
    const relevantResponses = filterResponses(savedResponses);
    setFilteredResponses(relevantResponses);
  }, [filterResponses]);
  

  const hasFetchedResponse = useRef(false);

  const fetchResponse = useCallback(async () => {
    if (!individual || hasFetchedResponse.current) return;
  
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
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  }, [individual]);
  
  useEffect(() => {
    if (individual) {
      loadResponsesFromIndexedDB();
      fetchResponse();
    }
  }, [individual, loadResponsesFromIndexedDB, fetchResponse]);

  return (
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
            <Text>{individual?.questionText}</Text>
          </Question>
          <AnswerBox id="scrollContainer">
            <FadeOverlay scrolled={scrolled} />
            {filteredResponses.length > 0 ? (
              filteredResponses.map((resp, index) => {
                console.log(resp); 

                return Array.isArray(resp[currentQuestionId]) && resp[currentQuestionId][0] ? (
                  <Respond key={index}>
                    <IconBox>
                      <Icon src={resp[currentQuestionId][0]?.smallImage} />
                    </IconBox>
                    <RespondBox>
                      <TextRespond>{resp[currentQuestionId][0]?.text}</TextRespond>
                      <Social>
                        <IconSocial src={voice} />
                        <IconSocial src={share} />
                      </Social>
                    </RespondBox>
                  </Respond>
                ) : (
                  <TextRespond key={index}>Invalid response data</TextRespond>
                );
              })
            ) : (
              <TextRespond>No responses yet</TextRespond>
            )}
          </AnswerBox>
        </RespondContainer>
        <QuestionContainer>
          <PersonAnswer>
            <Text>{response || "Waiting for the answer..."}</Text>
          </PersonAnswer>
        </QuestionContainer>
        <InputBox>
          <InputWrapper>
            <Input placeholder="Enter your message..." disabled />
          </InputWrapper>
          <Button>SUBMIT</Button>
        </InputBox>
      </DialogContainer>
    </ChatContainer>
  );
};

export default Chat;
