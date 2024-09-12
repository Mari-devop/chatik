import React from 'react';
import {
  Container,
  MainContainer,
  TextContainer,
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
  Person
} from './Home.styled';
import Footer from '../../components/footer/Footer';
import mask from '../../assets/images/main-page/left2.png';
import jobs from '../../assets/images/main-page/left.png';
import luter from '../../assets/images/main-page/center.png';
import albert from '../../assets/images/main-page/right.png';
import deva from '../../assets/images/main-page/rright2.png';
import shadow from '../../assets/images/main-page/shadow.png';
import conversation from '../../assets/images/main-page/conversation.png';
import bigshadow from '../../assets/images/main-page/bigbrightshadow.png';
import brightpinkshadow from '../../assets/images/main-page/pink-shadow.png';
import pinkshadow from '../../assets/images/main-page/bright-pinkshadow.png';
import person from '../../assets/images/main-page/person.png';

const Main = () => {
  return (
    <Container>
      <MainContainer>
        <TextContainer>
          <Text>
              ask important people 
              important questions
          </Text>
          <Subtitle>
              Choose a question to quickly get a realistic response
          </Subtitle>
          <Row>
            <TextRow>
              What did you want to be when you grew up?
            </TextRow>
          </Row>
          <Row>
            <TextRow>
              What is the meaning of life?
            </TextRow>
          </Row>
          <Row>
            <TextRow>
              What is your greatest accomplishment???
            </TextRow>
          </Row>
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
        <TextPersonContainer>
          <Title>
            individuals
          </Title>
          <Subtext>
            Ask a question to your favorite person and get a realistic response
          </Subtext>
        </TextPersonContainer>
        <Grid>
          <GridRow>
            <Person src={person} />
            <GridText>
              <GridTitle>
                John Doe
              </GridTitle>
              <GridSubtext>
                CEO of Apple
              </GridSubtext>
            </GridText>
          </GridRow>
          
          <GridRow>
            <Person src={person} />
            <GridText>
              <GridTitle>
                John Doe
              </GridTitle>
              <GridSubtext>
                CEO of Apple
              </GridSubtext>
            </GridText>
          </GridRow>

          <GridRow>
            <Person src={person} />
            <GridText>
              <GridTitle>
                John Doe
              </GridTitle>
              <GridSubtext>
                CEO of Apple
              </GridSubtext>
            </GridText>
          </GridRow>

          <GridRow>
            <Person src={person} />
            <GridText>
              <GridTitle>
                John Doe
              </GridTitle>
              <GridSubtext>
                CEO of Apple
              </GridSubtext>
            </GridText>
          </GridRow>

          <GridRow>
            <Person src={person} />
            <GridText>
              <GridTitle>
                John Doe
              </GridTitle>
              <GridSubtext>
                CEO of Apple
              </GridSubtext>
            </GridText>
          </GridRow>
        </Grid>
      </MainContainer>
      <Footer />
    </Container>
  )
}

export default Main