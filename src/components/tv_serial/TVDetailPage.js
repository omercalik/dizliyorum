import React from 'react';
import { Navigation } from '../movie/Navigation';
import { connect } from 'react-redux';
import { Actor } from '../movie/Actor';
import { addComment } from '../../store/actions/commentActions';
import Spinner from '../dashboard/Spinner';
import { ActorCarousel } from '../movie/ActorCarousel';
import { TVInfo } from '../tv_serial/TVInfo';
import TVInfoBar from '../tv_serial/TVInfoBar';
import firebase from '../../config/fbConfig';
import { useTVFetch } from '../hooks/useTVFetch';

let db = firebase.firestore();

const TVDetail = ({ TVId, addComment }) => {
  const [TV, loading, error] = useTVFetch(TVId);
  const [comment, setComment] = React.useState('');
  const [TVComments, setTVComments] = React.useState([]);
  const ref = db.collection('comments');
  const getComments = async () => {
    const newState = [];
    const snapshot = await ref.where('contentId', '==', TVId).get();
    if(snapshot.empty){
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      let com = doc.data();
      newState.push(com);
    });

    setTVComments(newState);
  }
  getComments();

  const handleChange = (e) => {
    setComment({ [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(comment, TVId, 'TV');
  };

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
          <h1>Actors</h1>
          <ActorCarousel header="Actors">
            {TV.actors.map((actor) => (
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

      {TVComments.map((comment) => (
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
export default connect(mapStateToProps,mapDispatchToProps)(TVDetail);

