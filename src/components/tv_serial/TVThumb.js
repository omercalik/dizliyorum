import React from 'react';
import { StyledMovieThumb } from '../styles/StyledMovieThumb';
import { Link } from '@reach/router';

const TVThumb = ({ image, TVId, clickable }) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/tvserials/${TVId}`}>
        <img
          className="clickable"
          src={image}
          alt="moviethumb"
          style={{ height: '250px' }}
        />
      </Link>
    ) : (
      <img src={image} alt="moviethumb" />
    )}
  </StyledMovieThumb>
);

export default TVThumb;
