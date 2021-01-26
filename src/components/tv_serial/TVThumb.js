import React from 'react';
import { StyledMovieThumb } from '../styles/StyledMovieThumb';
import { Link } from '@reach/router';

const TVThumb = ({ image, TVId, clickable, content }) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/tvserials/${TVId}`}>
        <div className="img_container">
          <img
            className="clickable img_self"
            src={image}
            alt="moviethumb"
            style={{ height: '250px' }}
            title={content.name}
            loading="lazy"
          />
          <div className="overlay">
            <div className="img_text">{content.name}</div>
          </div>
        </div>
      </Link>
    ) : (
      <img src={image} alt="moviethumb" />
    )}
  </StyledMovieThumb>
);

export default TVThumb;
