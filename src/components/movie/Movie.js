import React from 'react';
import { connect } from 'react-redux';
import { MovieInfo } from './MovieInfo';
import { addComment } from '../../store/actions/commentActions';
import MovieInfoBar from './MovieInfoBar';
import firebase from '../../config/fbConfig';
import { Actor } from './Actor';
import Spinner from '../dashboard/Spinner';
import { ActorCarousel } from './ActorCarousel';
import './movie.css';
import { useMovieFetch } from '../hooks/useMovieFetch';

let db = firebase.firestore();

const Movie = ({ state, movieId, addComment }) => {
  const [movie, loading, error] = useMovieFetch(movieId);
  const [comment, setComment] = React.useState('');
  const [movieComments, setMovieComments] = React.useState([]);
  const ref = db.collection('comments');
  const getComments = async () => {
    const newState = [];
    const snapshot = await ref.where('contentId', '==', movieId).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      let com = doc.data();
      newState.push(com);
    });

    setMovieComments(newState);
  };
  getComments();

  const handleChange = (e) => {
    setComment({ [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(comment, movieId, 'movie');
  };

  if (error) {
    console.log(error);
    return <div>Something went wrong ...</div>;
  }
  if (loading) return <Spinner />;
  return (
    <>
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

        {movieComments.map((comment) => (
          <p>{comment.comment}</p>
        ))}
      </div>
    </>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
