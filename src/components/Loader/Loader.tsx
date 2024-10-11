import React from 'react';
import { LoaderContainer, PictureContainer, LoaderImage } from './Loader.styled';
import loader from '../../assets/images/bigLogo.png';

const Loader = () => {
  return (
    <LoaderContainer>
        <PictureContainer>
            <LoaderImage src={loader} alt="loader" />
        </PictureContainer>
    </LoaderContainer>
  )
}

export default Loader;