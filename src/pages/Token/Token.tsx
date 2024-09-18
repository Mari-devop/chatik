import React from 'react';
import { Container, BoxContainer } from '../About/About.styled';
import { TextArea, Button, Text } from '../Token/Token.styled';

const Token = () => {
  return (
    <Container>
        <BoxContainer>
            <Text>Please, enter your token here</Text>
            <TextArea></TextArea>
            <Button>VERIFY</Button>
        </BoxContainer>
    </Container>
  )
}

export default Token