import React from 'react';
import { StyledMovieThumb } from '../styles/StyledMovieThumb';
import { Link } from '@reach/router';

const MovieThumb = ({ image, movie, clickable }) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/${movie.id}`}>
        <div className="img_container">
          <img
            className="clickable img_self"
            src={image}
            alt="moviethumb"
            style={{ height: '250px' }}
            title={movie.title}
            loading="lazy"
          />
          <div className="overlay">
            <div className="img_text">{movie.title}</div>
          </div>
        </div>
      </Link>
    ) : (
      <img src={image} alt="moviethumb" />
    )}
  </StyledMovieThumb>
);

export default MovieThumb;
