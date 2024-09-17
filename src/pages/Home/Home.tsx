import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Question, IndividualWithoutFullImage } from "./types";
import { dbInstance } from "../../db";
import {
  Container,
  MainContainer,
  TextContainer,
  Section,
  Text,
  TextRow,
  Subtitle,
  Row,
  PhotoContainer,
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Wrapper1,
  Wrapper2,
  TextPersonContainer,
  Title,
  Subtext,
  Grid,
  GridRow,
  GridTitle,
  GridSubtext,
  GridText,
  Person,
} from "./Home.styled";
import Footer from "../../components/footer/Footer";
import mask from "../../assets/images/main-page/left2.png";
import jobs from "../../assets/images/main-page/left.png";
import luter from "../../assets/images/main-page/center.png";
import albert from "../../assets/images/main-page/right.png";
import deva from "../../assets/images/main-page/rright2.png";
import shadow from "../../assets/images/main-page/shadow.png";
import conversation from "../../assets/images/main-page/conversation.png";
import bigshadow from "../../assets/images/main-page/bigbrightshadow.png";
import brightpinkshadow from "../../assets/images/main-page/pink-shadow.png";
import pinkshadow from "../../assets/images/main-page/bright-pinkshadow.png";
import { constants } from "fs";

const Main = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [individuals, setIndividuals] = useState<
    IndividualWithoutFullImage[] | null
  >(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedQuestionText, setSelectedQuestionText] = useState<
    string | null
  >(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const storedQuestions = await dbInstance.getData("questions");

      if (storedQuestions.length) {
        setQuestions(storedQuestions);
        return;
      } else {
        try {
          const response = await axios.get(
            "https://eternalai.fly.dev/individuals/questions",
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          const fetchedQuestions = response.data;

          const addedData = await Promise.all(
            fetchedQuestions.map(async (question: Question) => {
              const existingQuestion = await dbInstance.getData("questions");
              if (!existingQuestion) {
                await dbInstance.addData("questions", question);
              }
            })
          );

          setQuestions(fetchedQuestions);

          return;
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const fetchIndividuals = async () => {
      const storedIndividuals = await dbInstance.getData("individuals");
      if (storedIndividuals.length) {
        setIndividuals(storedIndividuals);
      } else {
        try {
          const response = await axios.get(
            "https://eternalai.fly.dev/individuals?page=1&pageSize=15",
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (Array.isArray(response.data)) {
            const individualsWithSmallImages = response.data.map(
              (individual: any) => {
                const base64Flag = "data:image/jpeg;base64,";
                const smallImageStr = arrayBufferToBase64(
                  individual.smallImage.data
                );
                const smallImageSrc = base64Flag + smallImageStr;

                return {
                  id: individual.id,
                  name: individual.name,
                  title: individual.title,
                  smallImage: smallImageSrc,
                };
              }
            );

            setIndividuals(individualsWithSmallImages);
            individualsWithSmallImages.forEach((individual) =>
              dbInstance.addData("individuals", individual)
            );
          } else {
            console.error("Expected array but got:", response.data);
          }
        } catch (error) {
          console.error("Error fetching individuals:", error);
        }
      }
    };

    fetchIndividuals();
  }, []);

  const arrayBufferToBase64 = (buffer: number[]) => {
    let binary = "";
    const len = buffer.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return window.btoa(binary);
  };

  const handleQuestionClick = (questionId: number, questionText: string) => {
    setSelectedQuestion(questionId);
    setSelectedQuestionText(questionText);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleIndividualClick = async (individualId: number) => {
    if (selectedQuestion === null || selectedQuestionText === null) {
      alert("Please select a question first.");

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);

      return;
    }

    try {
      const response = await axios.get(
        `https://eternalai.fly.dev/individuals/image/${individualId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const individualData = response.data;

      if (
        individualData &&
        individualData.imageBuffer &&
        individualData.imageBuffer.data
      ) {
        const base64Flag = "data:image/jpeg;base64,";
        const fullImageStr = arrayBufferToBase64(
          individualData.imageBuffer.data
        );
        const fullImageSrc = base64Flag + fullImageStr;

        const storedIndividuals = await dbInstance.getData("individuals");
        const individual: any = storedIndividuals.find(
          (ind: any) => ind.id === individualId
        );

        if (individual) {
          const selectedIndividual = {
            ...individual,
            fullImage: fullImageSrc,
            questionId: selectedQuestion,
            questionText: selectedQuestionText,
          };

          await dbInstance.addData("individuals", selectedIndividual);

          navigate("/chat", { state: selectedIndividual });
        } else {
          console.error("Individual not found in stored data");
        }
      } else {
        console.error("Full image data not found");
      }
    } catch (error) {
      console.error("Error fetching full image:", error);
    }
  };

  const handleRowClick = (index: number) => {
    setActiveRow(index);
  };

  return (
    <Container>
      <MainContainer>
        <Section>
          <TextContainer>
            <Text>ask important people important questions</Text>
            <Subtitle>
              Choose a question to quickly get a realistic response
            </Subtitle>
            {questions.map((question, index) => (
              <Row
                key={question.questionId}
                isActive={activeRow === index}
                onClick={() => {
                  handleRowClick(index);
                  handleQuestionClick(question.questionId, question.question);
                }}
              >
                <TextRow>{question.question}</TextRow>
              </Row>
            ))}
          </TextContainer>
          <PhotoContainer>
            <Wrapper1>
              <Image1 src={mask} />
              <Image2 src={jobs} />
              <Image3 src={luter} />
              <Image4 src={albert} />
              <Image5 src={deva} />
            </Wrapper1>
            <Wrapper2>
              <Image6 src={shadow} />
              <Image7 src={conversation} />
              <Image8 src={bigshadow} />
              <Image9 src={brightpinkshadow} />
              <Image10 src={pinkshadow} />
            </Wrapper2>
          </PhotoContainer>
        </Section>
        <Section ref={gridRef}>
          <TextPersonContainer>
            <Title ref={gridRef}>individuals</Title>
            <Subtext>
              Ask a question to your favorite person and get a realistic
              response
            </Subtext>
          </TextPersonContainer>
          <Grid>
            {individuals &&
              individuals.map((individual: IndividualWithoutFullImage) => (
                <GridRow
                  key={individual.id}
                  onClick={() => handleIndividualClick(individual.id)}
                >
                  <Person
                    src={
                      typeof individual.smallImage === "string"
                        ? individual.smallImage
                        : ""
                    }
                    alt={individual.name}
                  />
                  <GridText>
                    <GridTitle>{individual.name}</GridTitle>
                    <GridSubtext>{individual.title}</GridSubtext>
                  </GridText>
                </GridRow>
              ))}
          </Grid>
        </Section>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default Main;
