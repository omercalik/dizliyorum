import React from 'react';

import { Navigation } from './Navigation';
import { MovieInfo } from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import { Actor } from './Actor';
import Grid from '../dashboard/Grid';
import Spinner from '../dashboard/Spinner';

import { useMovieFetch } from '../hooks/useMovieFetch';

const Movie = ({ movieId }) => {
  const [movie, loading, error] = useMovieFetch(movieId);
  console.log(movie);
  if (error) {
    console.log(error);
    return <div>Something went wrong ...</div>;
  }
  if (loading) return <Spinner />;
  return (
    <>
      <Navigation movie={movie.title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
        movie={movie}
      />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor key={actor.credit_id} actor={actor} />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
