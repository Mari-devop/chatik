import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Question, IndividualWithoutFullImage, MainProps } from "./types";
import { ColorRing } from "react-loader-spinner";
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
import Footer from "../../components/Footer/Footer";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import Loader from "../../components/Loader/Loader";
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

const Main: React.FC<MainProps> = ({ isAuthenticated }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [individuals, setIndividuals] = useState<
    IndividualWithoutFullImage[] | null
  >(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedQuestionText, setSelectedQuestionText] = useState<
    string | null
  >(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "failure">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [loadingQuestionId, setLoadingQuestionId] = useState<number | null>(
    null
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const shareToken = queryParams.get("token");

    if (shareToken) {
      dbInstance.addData("users", { shareToken: shareToken });
      console.log(`Share token saved: ${shareToken}`);
    }
  }, []);

  const fetchQuestions = async () => {
    try {
      const storedQuestions = await dbInstance.getData("questions");

      if (storedQuestions.length > 0) {
        setQuestions(storedQuestions);
        return;
      }
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
          if (existingQuestion.length === 0) {
            await dbInstance.addData("questions", question);
          }
        })
      );
      setQuestions(fetchedQuestions);

      return;
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

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

  const fetchFullImage = async (
    individualId: number
  ): Promise<string | null> => {
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
        return base64Flag + fullImageStr;
      } else {
        console.error("Full image data not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching full image:", error);
      return null;
    }
  };

  const arrayBufferToBase64 = (buffer: number[]) => {
    let binary = "";
    const len = buffer.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return window.btoa(binary);
  };

  const filterResponses = useCallback(
    (responses: any[], questionId: number) => {
      console.log("Filtering responses by questionId:", questionId);
      const filtered = responses.filter(
        (resp: any) => resp.questionId === questionId
      );
      return filtered;
    },
    []
  );

  const saveResponseToIndexedDB = async (
    questionId: number,
    individualId: number,
    response: string
  ) => {
    const responseData = {
      questionId,
      individualId,
      text: response,
    };
    await dbInstance.addData("responses", responseData);
  };

  const fetchFreeChatResponse = async (questionId: number) => {
    try {
      const response = await axios.post(
        "https://eternalai.fly.dev/api/freeChat",
        { questionId },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error during freeChat:", error);
      return null;
    }
  };

  const handleQuestionClick = async (
    questionId: number,
    questionText: string
  ) => {
    setSelectedQuestion(questionId);
    setSelectedQuestionText(questionText);
    setLoadingQuestionId(questionId);

    try {
      const freeChatData = await fetchFreeChatResponse(questionId);
      if (!freeChatData) return;

      const { individualId, response } = freeChatData;

      const fullImage = await fetchFullImage(individualId);

      const storedIndividuals = await dbInstance.getData("individuals");
      const selectedIndividual = storedIndividuals.find(
        (ind: any) => ind.id === individualId
      );

      if (selectedIndividual) {
        await saveResponseToIndexedDB(questionId, individualId, response);

        const savedResponses = await dbInstance.getData("responses");
        const relevantResponses = filterResponses(savedResponses, questionId);
        const filteredWithoutLast = relevantResponses.slice(
          0,
          relevantResponses.length - 1
        );

        navigate("/chat", {
          state: {
            questionId,
            questionText,
            individualId,
            fullImage,
            smallImage: selectedIndividual.smallImage,
            response,
            filteredResponses: filteredWithoutLast,
            name: selectedIndividual.name,
            title: selectedIndividual.title,
          },
        });
      } else {
        console.error("Individual not found in stored data");
      }
    } catch (error) {
      console.error("Error during question click:", error);
    } finally {
      setLoadingQuestionId(null);
    }
  };

  const handleIndividualClick = async (individualId: number) => {
    if (isAuthenticated) {
      setDataLoaded(true);
      try {
        const fullImage = await fetchFullImage(individualId);

        if (fullImage) {
          const storedIndividuals = await dbInstance.getData("individuals");
          const individual: any = storedIndividuals.find(
            (ind: any) => ind.id === individualId
          );

          if (individual) {
            const selectedIndividual = {
              ...individual,
              fullImage,
            };

            navigate("/chatindividuals", {
              state: { ...selectedIndividual, individualId },
            });
          } else {
            console.error("Individual not found in stored data");
          }
        }
      } catch (error) {
        console.error("Error fetching individual data:", error);
      } finally {
        setDataLoaded(false);
      }
    } else {
      setModalType("failure");
      setModalMessage("Please, log in to chat with individuals");
      setIsModalVisible(true);
    }
  };

  const handleRowClick = (index: number) => {
    setActiveRow(index);
  };

  useEffect(() => {
    if (location.state?.scrollToIndividuals && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const loadData = async () => {
      setDataLoaded(true);
      await Promise.all([fetchQuestions(), fetchIndividuals()]);
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
      {dataLoaded && <Loader />}
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
                  $isActive={activeRow === index}
                  onClick={() => {
                    handleRowClick(index);
                    handleQuestionClick(question.questionId, question.question);
                  }}
                >
                  <TextRow
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {question.question}
                    {loadingQuestionId === question.questionId && (
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
                    )}
                  </TextRow>
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
    </>
  );
};

export default Main;
