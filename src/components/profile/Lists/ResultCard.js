import React from 'react';
import '../../../Results.css';
import { navigate } from '@reach/router';
import MovieThumb from '../../dashboard/MovieThumb';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../config/apiConfig';
import NoImage from '../../images/no_image.jpg';
export const ResultCard = ({ movie, index, id, children }) => {
  const handleClick = (movie) => {
    movie.title
      ? navigate(`/${movie.id}`, { state: { id } })
      : navigate(`/tvserials/${movie.id}`, { state: { id } });
  };

  return (
    <>
      {movie ? (
        <div className="movie-thumb-container">
          <div className="gün">
            <MovieThumb
              clickable
              key={movie.id}
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movie={movie}
              movieName={movie.original_title}
              content={movie}
              className="movie-thumb"
            />
          </div>

          <div className="info">
            <div
              onClick={() => {
                handleClick(movie);
              }}
              className="header"
            >
              <h3 className="title">
                {index + 1}. {movie.title ? movie.title : movie.name}
              </h3>

              {movie.release_date ? (
                <h4 className="release-date">
                  {movie.release_date.substring(0, 4)}
                </h4>
              ) : (
                <h4 className="release-date">-</h4>
              )}
            </div>
            {children}
          </div>
        </div>
      ) : (
        <h3>Bu liste boş!</h3>
      )}
    </>
  );
};
