import React, { useState, useEffect } from 'react';

import ReactPlayer from 'react-player';

import { StyledMovieInfo } from '../styles/StyledMovieInfo';
import Spinner from '../dashboard/Spinner';

export const TVInfo = ({ TV }) => {
  const [isFetched, setisFetched] = useState(false);
  const [trailer, setTrailer] = useState();

  useEffect(() => {
    const fetchTrailer = async () => {
      setisFetched(false);

      try {
        const trailerResult = await (
          await fetch(
            `https://api.themoviedb.org/3/tv/${TV.id}/videos?api_key=592dc9c56e6fc3de77c6c7e76a1c729d`
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
    <StyledMovieInfo backdrop={TV.backdrop_path}>
      <div className="movieinfo-content">
        <div className="movieinfo-text">
          <h1>{TV.name}</h1>
          <h3>ÖZET</h3>
          <p>{TV.overview}</p>

          <div className="rating-director">
            <div>
              <h3>PUAN</h3>
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
                <p key={element.id}>{element.name}</p>
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
