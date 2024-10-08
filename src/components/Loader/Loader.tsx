import React from 'react';
import { LoaderContainer, PictureContainer, LoaderImage, LoaderText } from './Loader.styled';
import loader from '../../assets/images/bigLogo.png';
import text from '../../assets/images/ETERNAL.png';

const Loader = () => {
  return (
    <LoaderContainer>
        <PictureContainer>
            <LoaderImage src={loader} alt="loader" />
            {/* <LoaderText src={text} alt="loader" /> */}
        </PictureContainer>
    </LoaderContainer>
  )
}

export default Loader