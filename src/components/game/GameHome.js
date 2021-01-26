import React, { useState, useEffect } from 'react';
import { GAME_API_URL, GAME_SEARCH_API_URL } from '../../config/apiConfig';
import SearchBar from '../dashboard/SearchBar';
import Grid from '../dashboard/Grid';
import { StyledMovieThumb } from '../styles/StyledMovieThumb';
import { Link } from '@reach/router';
import { useGameFetch } from '../hooks/useGameFetch';
import Spinner from '../dashboard/Spinner';
import LoadMoreBtn from '../dashboard/LoadMoreBtn';
import { useMoreGameFetch } from '../hooks/useMoreGameFetch';
import HeroImage from '../dashboard/HeroImage';
const style = {
  height: '250px',
  width: '172px',
};

const GameThumb = ({ image, game, gameSlug, clickable }) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/oyun/${gameSlug}`}>
        <div className="img_container">
          <img
            className="clickable img_self"
            src={image}
            alt="gamethumb"
            style={style}
            name={game.name}
            loading="lazy"
          />
          <div className="overlay">
            <div className="img_text">{game.name}</div>
          </div>
        </div>
      </Link>
    ) : (
      <img src={image} alt="gamethumb" />
    )}
  </StyledMovieThumb>
);

const GameHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [{ data, loading }, fetchData] = useGameFetch(searchTerm);

  const loadMoreGames = async () => {
    const endpoint = data.next;
    await fetchData(endpoint);
  };
  const searchGames = async (search) => {
    let slug = searchTerm.split(' ').join('-').toLowerCase();

    const endpoint = search ? GAME_SEARCH_API_URL + slug : GAME_API_URL;
    console.log(endpoint);
    await fetchData(endpoint);
    setSearchTerm(search);
  };

  if (!data.games[0]) return <Spinner />;

  return (
    <>
      {console.log(data)}
      <>
        <HeroImage
          image={data.games[0].background_image}
          title={data.games[0].name}
        />
        <SearchBar callback={searchGames} />
        <Grid>
          {data.games.map((game) => (
            <GameThumb
              key={game.id}
              clickable
              image={game.background_image}
              game={game}
              gameName={game.name}
              content={game}
              oyunId={game.id}
              gameSlug={game.slug}
            />
          ))}
        </Grid>

        {loading && <Spinner />}
        {!loading ? (
          <LoadMoreBtn text="Load More" callback={loadMoreGames} />
        ) : (
          ''
        )}
      </>
    </>
  );
};

export default GameHome;
