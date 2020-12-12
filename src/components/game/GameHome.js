import React, {useState, useEffect} from "react";
import { GAME_API_URL} from '../../config/apiConfig';
import SearchBar from '../dashboard/SearchBar';
import Grid from '../dashboard/Grid';
import {StyledMovieThumb} from '../styles/StyledMovieThumb';
import { Link } from '@reach/router';
import {useGameFetch} from '../hooks/useGameFetch';
import Spinner from '../dashboard/Spinner';
import LoadMoreBtn from '../dashboard/LoadMoreBtn';
import {useMoreGameFetch} from '../hooks/useMoreGameFetch';

const GameThumb = ({ image, game, gameSlug, clickable }) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/oyun/${gameSlug}`}>
        <div className="img_container">
          <img
            className="clickable img_self"
            src={image}
            alt="gamethumb"
            style={{ height: '250px' }}
            name={game.name}
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

 
 let [pageNumber, setpageNumber] = useState(1);
 
 const [{data, loading}, fetchData] = useGameFetch(pageNumber);
 const loadMoreGames = async () => {

   setpageNumber(pageNumber + 1);

  await fetchData(pageNumber);
  
  

  
  
 };

  return (
    <>
    <>
    <SearchBar/>
    <Grid>
          {loading ? <h1>loading</h1> : data.games.map( game => 
            
              <GameThumb
                key={game.id}
                clickable
                image={
                
                  game.background_image
                   
                }
                game={game}
                gameName={game.name}
                content={game}
                oyunId = {game.id}
                gameSlug = {game.slug}
              />
            )
           }
        </Grid>

        {loading && <Spinner />}
        {!loading ?
        <LoadMoreBtn text="Load More" callback={loadMoreGames} /> : <h3>bekle</h3>
        }
    </>
    </>
  ); 
};

export default GameHome;
