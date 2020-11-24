import React from 'react';
import { Navigation } from './Navigation';
import { MovieInfo } from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import { Actor } from './Actor';
import Spinner from '../dashboard/Spinner';
import { ActorCarousel } from './ActorCarousel';

import { useMovieFetch } from '../hooks/useMovieFetch';

const Movie = ({ movieId, content }) => {
  const [movie, loading, error] = useMovieFetch(movieId);

  if (error) {
    console.log(error);
    return <div>Something went wrong ...</div>;
  }
  if (loading) return <Spinner />;
  return (
    <>
      {/* <Navigation content={movie.original_title} /> */}
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
        movie={movie}
      />
      {movie.actors.length > 0 ? (
        <>
          <h1>Actors</h1>
          <ActorCarousel header="Actors">
            {movie.actors.map((actor) => (
              <Actor key={actor.credit_id} actor={actor} />
            ))}
          </ActorCarousel>
        </>
      ) : null}
    </>
  );
};

export default Movie;
