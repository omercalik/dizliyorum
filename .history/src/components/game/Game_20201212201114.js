import Spinner from '../dashboard/Spinner';
import {useGameHomeFetch} from '../hooks/useGameHomeFetch';
import {StyledGameInfo} from '../styles/StyledGameİnfo';
import {StyledMovieThumb} from '../styles/StyledMovieThumb';
import { Link } from '@reach/router';
import {useGamePhotoFetch} from '../hooks/useGamePhotosFetch';
import ReactPlayer from 'react-player';


const GameInfo = ({ game }) => {
  const gamePhoto = useGamePhotoFetch();
  console.log(game.background_image_additional)
  const base = `https://www.youtube.com/watch?v=${game.clip.video}`;
  return (
    <StyledGameInfo backdrop={game.background_image_additional}>
      <div className="movieinfo-content">
        <div className="movieinfo-thumb">
        <GameThumb
        image={
          game.background_image
        }
        clickable={false}
      />
        </div>
        <div className="movieinfo-text">
          <h1>{game.name}</h1>
          <div className='player-wrapper'>
          <ReactPlayer controls className='react-player' url={base} />
          </div>
        <h3>PLOT</h3>
        {game.description_raw}
          
          <h3>Released</h3>
          <p>{game.released}</p>

          <div className="rating-director">
            <div>
              <h3>Website</h3>
              <a target="blank" href={game.website}>{game.website}</a>
            </div>
     <div className="director">
            <h3>Puan</h3>
            <p>{game.rating}  /  {game.rating_top}</p>
             
            </div>
          
          </div>
          
        </div>
      </div>
    </StyledGameInfo>
  );
};

const GameThumb = ({ image, game, gameName, clickable }) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/oyun/${game.slug}`}>
        <div className="img_container">
          <img
            className="clickable img_self"
            src={image}
            alt="gamethumb"
            style={{ height: '250px' }}
            gameName={game.name}
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


const Game = (gameName) => {
  const [game,loading,error] = useGameHomeFetch(gameName);
  if (error) {
    console.log(error);
    return <div>Something went wrong ...</div>;
  }
  if (loading) return <Spinner />;
   console.log(game);  
   

    return (
     <>
     <GameInfo game={game} />
     </>
        

    );


}

export default Game;

