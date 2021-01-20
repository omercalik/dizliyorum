import React, { useEffect } from 'react';
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
import * as tf from '@tensorflow/tfjs';
import padSequences from './paddedSeq';
import { blue } from '@material-ui/core/colors';

let db = firebase.firestore();

const Movie = ({ state, movieId, addComment }) => {
  useEffect(() => {
    tf.ready().then(() => {
      loadModel(url);
      loadMetadata(url);
    });
  }, []);
  const [movie, loading, error] = useMovieFetch(movieId);
  const [comment, setComment] = React.useState('');
  const [analyze, setAnalyze] = React.useState('');
  const [movieComments, setMovieComments] = React.useState([]);
  const [model, setModel] = React.useState();
  const [metadata, setMetadata] = React.useState();
  const [testText, setText] = React.useState('');
  const [testScore, setScore] = React.useState('');
  const [trimedText, setTrim] = React.useState('');
  const [seqText, setSeq] = React.useState('');
  const [padText, setPad] = React.useState('');
  const [inputText, setInput] = React.useState('');
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
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(comment, movieId, 'movie', analyze);
  };

  if (error) {
    console.log(error);
    return <div>Something went wrong ...</div>;
  }

  const url = {
    model:
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
    metadata:
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json',
  };

  async function loadModel(url) {
    const model = await tf.loadLayersModel(url.model);
    setModel(model);
    console.log(model);
  }
  async function loadMetadata(url) {
    try {
      const metadataJson = await fetch(url.metadata);
      const metadata = await metadataJson.json();
      setMetadata(metadata);
    } catch (err) {
      console.log(err);
    }
  }
  const OOV_INDEX = 2;
  const getSentimentScore = (text) => {
    console.log(text);
    const inputText = text
      .trim()
      .toLowerCase()
      .replace(/(\.|,|!)/g, '')
      .split(' ');
    setTrim(inputText);
    console.log(inputText);
    const sequence = inputText.map((word) => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    setSeq(sequence);
    console.log(sequence);
    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], metadata.max_len);
    console.log(metadata.max_len);
    setPad(paddedSequence);

    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
    console.log(input);
    setInput(input);
    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    setScore(score);
    if (score >= 0.5) {
      setAnalyze('pozitif');
    } else {
      setAnalyze('negatif');
    }
    return score;
  };
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
        <div className="row">
          <form onSubmit={handleSubmit} className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="comment"
                  className="materialize-textarea"
                  onChange={handleChange}
                  value={testText}
                ></textarea>
                <label for="comment">Yorumunuzu yazın</label>
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={() => getSentimentScore(testText)}
                >
                  Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>

        {movieComments.map((comment) => (
          <div style={{ color: 'blue' }} variant="h3">
            {comment.comment}
            <div
              style={
                comment.analyze === 'pozitif'
                  ? { color: 'green' }
                  : { color: 'red' }
              }
              variant="h5"
            >
              {comment.analyze}
            </div>
          </div>
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
    addComment: (comment, contentId, type, analyze) =>
      dispatch(addComment(comment, contentId, type, analyze)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
