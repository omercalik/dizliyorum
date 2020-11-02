import React from 'react';
import '../../../Results.css';

export const TopListCard = ({ movie }) => {
  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster"></div>
        )}
      </div>

      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title} ({movie.vote_average})</h3>
        
          <br/>
          <h2 className="title">{movie.overview}</h2>
          <h4 className="release-date">
            {movie.release_date ? movie.release_date.substring(0, 4) : '-'}
          </h4>
          <br/>
        </div>

        <div className="controls">
          <button className="btn">Add to watchlist</button>
        </div>
      </div>
    </div>
  );
};
