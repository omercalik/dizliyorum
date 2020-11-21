import React from 'react';

import NoImage from '../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config/apiConfig';

import TVThumb from '../dashboard/TVThumb';
import { StyledMovieInfo } from '../styles/StyledMovieInfo';

export const TVInfo = ({ TV }) => {
  return (
    <StyledMovieInfo backdrop={TV.backdrop_path}>
      <div className="movieinfo-content">
        <div className="movieinfo-thumb">
          <TVThumb
            image={
              TV.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${TV.poster_path}`
                : NoImage
            }
            clickable={false}
          />
        </div>
        <div className="movieinfo-text">
          <h1>{TV.title}</h1>
          <h3>PLOT</h3>
          <p>{TV.overview}</p>

          <div className="rating-director">
            <div>
              <h3>IMDB RATING</h3>
              <div className="score">{TV.vote_average}</div>
            </div>
           
            <div className="director">
              <h3>DIRECTOR{TV.directors.length > 1 ? 'S' : ''}</h3>
              {TV.directors.map((element) => (
                <p key={element.credit_id}>{element.name}</p>
              ))}
            </div>
            <div className="director">
              <h3>TÜR{TV.genres.length > 1 ? '' : ''}</h3>
              {TV.genres.map((element) => (
                <p key={element.credit_id}>{element.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StyledMovieInfo>
  );
};
