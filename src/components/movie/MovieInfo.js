import React, { useEffect, useState } from 'react';

import NoImage from '../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config/apiConfig';
import ReactPlayer from 'react-player';
import MovieThumb from '../dashboard/MovieThumb';
import { StyledMovieInfo } from '../styles/StyledMovieInfo';
import Spinner from '../dashboard/Spinner';

export const MovieInfo = ({ movie }) => {
  const [isFetched, setisFetched] = useState(false);
  const [trailer, setTrailer] = useState();

  useEffect(() => {
    const fetchTrailer = async () => {
      setisFetched(false);

      try {
        const trailerResult = await (
          await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=592dc9c56e6fc3de77c6c7e76a1c729d`
          )
        ).json();

        if (trailerResult.results.length === 0) {
          setTrailer('');
          setisFetched(true);
        } else {
          setTrailer((prev) => ({
            ...prev,
            trailer: trailerResult.results,
          }));

          setisFetched(true);
          console.log(trailer);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrailer();
  }, []);

  if (!isFetched) return <Spinner />;
  return (
    <StyledMovieInfo backdrop={movie.backdrop_path}>
      <div className="movieinfo-content">
        <div className="movieinfo-text">
          <h1>{movie.title}</h1>
          <h3>ÖZET</h3>
          <p>{movie.overview}</p>

          <div className="rating-director">
            <div>
              <h3>IMDb PUANI</h3>
              <div className="score">{movie.vote_average}</div>
            </div>

            <div className="director">
              <h3>YÖNETMEN{movie.directors.length > 1 ? 'LER' : ''}</h3>
              {movie.directors.map((element) => (
                <p key={element.credit_id}>{element.name}</p>
              ))}
            </div>
            <div className="director">
              <h3>TÜR{movie.genres.length > 1 ? '' : ''}</h3>
              {movie.genres.map((element) => (
                <p key={element.credit_id}>{element.name}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="player">
          <ReactPlayer
            controls
            height="360px"
            className="react-player"
            url={`https://www.youtube.com/watch?v=${trailer.trailer[0].key}`}
          />
        </div>
      </div>
    </StyledMovieInfo>
  );
};
