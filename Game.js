import { useState, useEffect, useCallback } from 'react';
import { GAME_API_URL, GAME_API_KEY } from '../../config/apiConfig';
import { MovieInfo } from '../movie/MovieInfo';
import Spinner from '../dashboard/Spinner';
import MovieInfoBar from '../movie/MovieInfoBar';
import { Actor } from '../movie/Actor';
import { StyledActor } from '../styles/StyledActor';
import NoImage from '../images/no_image.jpg';
import { StyledMovieThumb } from '../styles/StyledMovieThumb';
import { Link } from '@reach/router';
import { StyledHeroImage } from '../styles/StyledHeroImage';
import Grid from '../dashboard/Grid';
import SearchBar from '../dashboard/SearchBar';


export const useGameFetch = (gameId) => {
  const [state, setState] = useState({games: []});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchGames = async (endpoint) => {
    setError(false);
    setLoading(true);
    const isLoadMore = endpoint.search('page');
    try{
      const result = await(await fetch(endpoint)).json();
      if(result.results.length === 0) {
        setState((prev) => ({
          ...prev,
          games: [{}],
          heroImage: prev.background_image,
          notFound: true,
        }));
        setLoading(false);
      } else {
        result.results.forEach((game) => {
          game.isGame = true;
        });
        setState((prev) => ({
          ...prev,
          games:
            isLoadMore !== -1
            ?[...prev.games, ...result.results] : [...result.results],
            heroImage: prev.background_image,
            notFound: false,
            isGame: true,
        }));
        setLoading(false);
      }
    } catch(error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGames(GAME_API_URL);
  }, []);
  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      const endpoint = `${GAME_API_URL}`;
      const result = await (await fetch(endpoint)).json();   
      console.log(result);
      result.isGame = true;
      setState({
        ...result,      
        isGame: true,
        
      });
    } catch (error) {
        
      setError(true);
    }
    setLoading(false);
  }, [gameId]);

  

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [state, loading, error];
};

const Game = ({content}) => {
    const [game, loading, error] = useGameFetch();
    const [searchTerm, setSearchTerm] = useState('');
    const [
      
    
    fetchGames,
    ] = useGameFetch(searchTerm);
    
    const searchGames = async (search) => {
      const endpoint = search ? GAME_API_URL + search : GAME_API_URL;
      await fetchGames(endpoint);
      setSearchTerm(search);
    }
    const loadMoreGames = async() => {
      const searchEndPoint = `${game.next}`;
      const endpoint = searchTerm ? GAME_API_URL + searchTerm : GAME_API_URL;
      await fetchGames(endpoint);
    }

    if (error) {
        console.log(error);
        return <div>Something went wrong ...</div>;
      }
    if (loading) return <Spinner />;
    
    return (
        
          
         <div>
         <SearchBar callback={searchGames} />
        <Grid>
        {(game.results.map((oyun) => (
          <GameThumb
          key = {oyun.id}
          clickable
          image = {
            oyun.background_image ? `${oyun.background_image}` : NoImage
          }
          oyun = {oyun}
          movieName={oyun.name}
          />
        )))}
        </Grid>
         
       
         </div> 
    )
};

export default Game;

export const GamePicture = ({ name }) => {
  return (
    <>
    <>
  
    <StyledActor>
      <img
        style={{ width: '185px' }}
        src={
          name.background_image
            ? `${name.background_image}`
            : NoImage
        }
        alt="gamethumb"
      />
      <span className="actor-name">{name.name}</span>
      
    </StyledActor>
    </>
    </>
  );
};

const GameThumb = ({ image, oyun, clickable }) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/${oyun.id}`}>
        <div className="img_container">
          <img
            className="clickable img_self"
            src={image}
            alt="gamethumb"
            style={{ height: '250px' }}
            title={oyun.name}
          />
          <div className="overlay">
            <div className="img_text">{oyun.name}</div>
          </div>
        </div>
      </Link>
    ) : (
      <img src={image} alt="gamethumb" />
    )}
  </StyledMovieThumb>
);

const HeroImage = ({image, name, text}) => {
  return (
    <StyledHeroImage image = {image}>
    <div className = "heroimage-content">
    <div className="heroimage-text">
    <h1>{name}</h1>
   
    </div>
    
    </div>
    </StyledHeroImage>
  );
}

