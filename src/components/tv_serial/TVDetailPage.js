import React from 'react';
import { Navigation } from '../movie/Navigation';
import { MovieInfo } from '../movie/MovieInfo';
import MovieInfoBar from '../movie/MovieInfoBar';
import { Actor } from '../movie/Actor';
import Spinner from '../dashboard/Spinner';
import { ActorCarousel } from '../movie/ActorCarousel';
import { TVInfo } from '../tv_serial/TVInfo';
import TVInfoBar from '../tv_serial/TVInfoBar';

import { useTVFetch } from '../hooks/useTVFetch';

const TVDetail = ({ TVId }) => {
  const [TV, loading, error] = useTVFetch(TVId);

  if (error) {
    console.log(error);
    return <div>Something went wrong ...</div>;
  }
  if (loading) return <Spinner />;
  return (
    <>
      <Navigation content={TV.name} />
      <TVInfo TV={TV} />
      <TVInfoBar
        time={TV.episode_run_time}
        season_count={TV.number_of_seasons}
        status={TV.status}
        TV={TV}
      />
      {TV.actors.length > 0 ? (
        <>
          <h1>Aktörler</h1>
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
