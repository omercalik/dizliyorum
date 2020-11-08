import React from 'react';
import styled from 'styled-components';
import { StyledHeroImage } from '../styles/StyledHeroImage';

const HeroImage = ({ image, title, text }) => {
  return (
    <StyledHeroImage image={image}>
      <div className="heroimage-content">
        <div className="heroimage-text">
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      </div>
    </StyledHeroImage>
  );
};

export default HeroImage;
