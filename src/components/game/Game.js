import Spinner from '../dashboard/Spinner';
import {useGameHomeFetch} from '../hooks/useGameHomeFetch';
import {StyledGameInfo} from '../styles/StyledGameİnfo';
import {StyledMovieThumb} from '../styles/StyledMovieThumb';
import { Link } from '@reach/router';
import {useGamePhotoFetch} from '../hooks/useGamePhotosFetch';
import ReactPlayer from 'react-player';
import firebase from '../../config/fbConfig';
import { addComment } from '../../store/actions/commentActions';
import { connect } from 'react-redux';
import React from 'react';

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

let db = firebase.firestore();
const Game = (gameName, addComment) => {
  const [game,loading,error] = useGameHomeFetch(gameName);
  const [comment, setComment] = React.useState('');
  const [gameComments, setGameComments] = React.useState([]);
  const ref = db.collection('comments');
  const getComments = async () => {
    const newState = [];
    const snapshot = await ref.where('contentId', '==', gameName).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      let com = doc.data();
      newState.push(com);
    });

    setGameComments(newState);
  };
  getComments();
  const handleChange = (e) => {
    setComment({ [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(comment, gameName, 'game');
  };


  if (error) {
    console.log(error);
    return <div>Something went wrong ...</div>;
  }
  if (loading) return <Spinner />;
   console.log(game);  
   

    return (
     <>
     <GameInfo game={game} />
     <h3>Yorumlar</h3>
     <div className="comment-section">
     <div class="row">
       <form onSubmit={handleSubmit} class="col s12">
         <div class="row">
           <div class="input-field col s12">
             <textarea
               id="comment"
               class="materialize-textarea"
               onChange={handleChange}
             ></textarea>
             <label for="comment">Yorumunuzu yazın</label>
             <button
               class="btn waves-effect waves-light"
               type="submit"
               name="action"
             >
               Submit
               <i class="material-icons right">send</i>
             </button>
           </div>
         </div>
       </form>
     </div>

     {gameComments.map((comment) => (
       <p>{comment.comment}</p>
     ))}
   </div>
     </>
        

    );


}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment, contentId, type) =>
      dispatch(addComment(comment, contentId, type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);

