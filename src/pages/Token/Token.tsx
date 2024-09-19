import React, { useState, useEffect } from 'react';
import { Container, BoxContainer } from '../About/About.styled';
import { TextArea, Button, Text } from '../Token/Token.styled';

const Token = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if(tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  },[])
  return (
    <Container>
        <BoxContainer>
            <Text>Please, enter your token here</Text>
            <TextArea value={token} readOnly></TextArea>
            <Button>VERIFY</Button>
        </BoxContainer>
    </Container>
  )
}

export default Token