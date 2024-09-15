import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
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
    Button
} from './Chat.styled';
import shadow from '../../assets/images/chat/shadow.png';
import jobs from '../../assets/images/chat/image 118-2.png';
import voice from '../../assets/images/chat/Frame 143725185.png';
import share from '../../assets/images/chat/Frame 143725072.png';

const Chat = () => {
    const [scrolled, setScrolled] = useState(false);
    const [response, setResponse] = useState<string | null>(null); 
    const [filteredResponses, setFilteredResponses] = useState<any[]>([]);
    const location = useLocation(); 
    const individual = location.state;

    const handleScroll = (e: Event) => {
        const target = e.target as HTMLElement;
        const top = target.scrollTop; 
        setScrolled(top > 0);
    };

    const filterResponses = (responses: any) => {
        const questionId = Number(individual?.questionId);
        console.log("Question ID:", questionId);
        console.log("Ответы в localStorage:", responses);

        if (responses && responses[questionId]) {
            let allResponses: any[] = [];
            Object.values(responses[questionId]).forEach((individualResponses: any) => {
                if (Array.isArray(individualResponses)) {
                    // allResponses = [...allResponses, ...individualResponses];
                    
                }
            });
            console.log("Найденные ответы для вопроса:", allResponses);
            return allResponses;
            console.log(responses[questionId])
        }

        console.log("Ответы для данного вопроса не найдены");
        return [];
    };

    const loadResponsesFromLocalStorage = () => {
        const savedResponses = JSON.parse(localStorage.getItem('chatResponses') || '{}');
        console.log('Загруженные ответы из localStorage:', savedResponses);

        const relevantResponses = filterResponses(savedResponses); 
        console.log('Отфильтрованные ответы для данного вопроса:', relevantResponses);

        if (relevantResponses.length > 0) {
            setFilteredResponses(relevantResponses);
        }
    };
    useEffect(() => {
        if (individual) {
            loadResponsesFromLocalStorage(); 

            const fetchResponse = async () => {
                try {
                    const savedResponses = JSON.parse(localStorage.getItem('chatResponses') || '{}');

                    const body = {
                        questionId: individual.questionId,
                        characterId: individual.id,
                    };

                    const response = await axios.post('https://eternalai.fly.dev/api/freeChat', body, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                 
                    const storedIndividuals = JSON.parse(localStorage.getItem('individuals') || '[]');
                    const foundIndividual = storedIndividuals.find((ind: any) => ind.id === individual.id);
                    const smallImage = foundIndividual ? foundIndividual.smallImage : jobs;

                    const newResponse = {
                        text: response.data.response,
                        smallImage: smallImage, 
                        individualId: individual.id,
                        questionId: individual.questionId, 
                    };

                    setResponse(newResponse.text);

         
                    const existingResponsesForQuestion = savedResponses[Number(individual.questionId)] || {};

                    const updatedResponsesForIndividual = [
                        ...(existingResponsesForQuestion[Number(individual.id)] || []),
                        newResponse,
                    ];

                 
                    const updatedResponses = {
                        ...savedResponses,
                        [Number(individual.questionId)]: {
                            ...existingResponsesForQuestion,
                            [Number(individual.id)]: updatedResponsesForIndividual,
                        },
                    };

                    localStorage.setItem('chatResponses', JSON.stringify(updatedResponses));
                    console.log('Обновленные ответы в localStorage:', updatedResponses);

          
                    setFilteredResponses(filterResponses(updatedResponses));

                } catch (error) {
                    console.error('Error fetching response:', error);
                }
            };

            fetchResponse();
        }
    }, [individual]);


  return (
    <ChatContainer>
        <PersonContainer>
            <PersonBox>
                <PersonShadow src={shadow} />
                <PersonPhoto src={individual?.fullImage || ''} />
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
                        filteredResponses.map((resp, index) => (
                            <Respond key={index}>
                                <IconBox>
                                    <Icon src={resp.smallImage} /> 
                                </IconBox>
                                <RespondBox>
                                    <TextRespond>{resp.text}</TextRespond>
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
                    <Text>{response || "Waiting for the answer..."}</Text>
                </PersonAnswer>
            </QuestionContainer>
            <InputBox>
                <InputWrapper>
                    <Input placeholder="Enter your message..." />
                </InputWrapper>
                <Button>SUBMIT</Button>
            </InputBox>
        </DialogContainer>
    </ChatContainer>
  );
};

export default Chat;
