import React from 'react';
import { Navigation } from '../movie/Navigation';
import { MovieInfo } from '../movie/MovieInfo';
import MovieInfoBar from '../movie/MovieInfoBar';
import { Actor } from '../movie/Actor';
import Spinner from '../dashboard/Spinner';
import { ActorCarousel } from '../movie/ActorCarousel';

import { useTVFetch } from '../hooks/useTVFetch';

const TVDetail = ({ TVId }) => {
  const [TV, loading, error] = useTVFetch(TVId);
  console.log(TV);
  if (error) {
    console.log(error);
    return <div>Something went wrong ...</div>;
  }
  if (loading) return <Spinner />;
  return (
    <>
      <Navigation TV={TV.name} />
      <MovieInfo TV={TV} />
      <MovieInfoBar
        time={TV.first_air_date}
        budget={TV.budget}
        revenue={TV.revenue}
        TV={TV}
      />
      {TV.actors.length > 0 ? (
        <>
          <h1>Actors</h1>
          <ActorCarousel header="Actors">
            {TV.actors.map((actor) => (
              <Actor key={actor.credit_id} actor={actor} />
            ))}
          </ActorCarousel>
        </>
      ) : null}
    </>
  );
};

export default TVDetail;
