import Spinner from '../dashboard/Spinner';
import { useGameHomeFetch } from '../hooks/useGameHomeFetch';
import { StyledGameInfo } from '../styles/StyledGameİnfo';
import { StyledMovieThumb } from '../styles/StyledMovieThumb';
import { Link } from '@reach/router';
import { useGamePhotoFetch } from '../hooks/useGamePhotosFetch';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import firebase from '../../config/fbConfig';
import './game.css';
import * as tf from '@tensorflow/tfjs';
import padSequences from '../movie/paddedSeq';
import CommentSection from '../layout/CommentSection';
import { addComment } from '../../store/actions/commentActions';
import React from 'react';

let db = firebase.firestore();

let dayjs = require('dayjs');

const GameInfo = ({ game }) => {
  const base = `https://www.youtube.com/watch?v=${game.clip.video}`;
  console.log(game);
  return (
    <StyledGameInfo backdrop={game.background_image_additional}>
      <div className="movieinfo-content">
        <div className="movieinfo-text">
          <h1>{game.name}</h1>
          <h3>PLOT</h3>
          {game.description_raw}

          <h3>Released</h3>
          <p>{game.released}</p>

          <div className="rating-director">
            <div>
              <h3>Website</h3>
              <a target="blank" href={game.website}>
                {game.website}
              </a>
            </div>
            <div className="director">
              <h3>Puan</h3>
              <p>
                {game.rating} / {game.rating_top}
              </p>
            </div>
          </div>
        </div>

        <div className="player-wrapper">
          <ReactPlayer controls className="react-player" url={base} />
        </div>
      </div>
    </StyledGameInfo>
  );
};

const GameThumb = ({ image, game, clickable }) => (
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

const Game = ({ gameSlug, addComment}) => {
  const [game, loading, error] = useGameHomeFetch(gameSlug);
  const [comment, setComment] = React.useState('');
  const [analyze, setAnalyze] = React.useState('');
  const [gameComments, setGameComments] = React.useState([]);
  const [contentName, setcontentName] = React.useState('');
  const [model, setModel] = React.useState();
  const [metadata, setMetadata] = React.useState();
  const [testText, setText] = React.useState('');
  const [testScore, setScore] = React.useState('');
  const [trimedText, setTrim] = React.useState('');
  const [seqText, setSeq] = React.useState('');
  const [padText, setPad] = React.useState('');
  const [inputText, setInput] = React.useState('');
  const [submitted, setSubmitted] = React.useState();
  const [reload, setReload] = React.useState(false);
  const [commentCount, setCommentCount] = React.useState();

  const ref = db.collection('comments');

  const test = () => {
    setReload(!reload);
  };

  const handleChange = (e) => {
    setComment({ [e.target.id]: e.target.value });
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(comment, gameSlug, 'game', analyze,contentName);
    setText('');

    setReload(!reload);
  };

  const url = {
    model:
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
    metadata:
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json',
  };

  async function loadModel(url) {
    const model = await tf.loadLayersModel(url.model);
    setModel(model);
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
    const inputText = text
      .trim()
      .toLowerCase()
      .replace(/(\.|,|!)/g, '')
      .split(' ');
    setTrim(inputText);

    const sequence = inputText.map((word) => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    setSeq(sequence);

    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], metadata.max_len);

    setPad(paddedSequence);

    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

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

  React.useEffect(() => {
    tf.ready().then(() => {
      loadModel(url);
      loadMetadata(url);
    });

    const getComments = async () => {
      const newState = [];

      const snapshot = await ref
        .where('contentId', '==', gameSlug)

        .orderBy('timestamp', 'desc')
        .get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        setGameComments([]);
        return;
      }

      snapshot.forEach((doc) => {
        let com = doc.data();

        const formatDate = dayjs
          .unix(com.createdAt.seconds)
          .format('DD-MM-YYYY');
        com.createdAt = formatDate;
        com.commentId = doc.id;

        newState.push(com);
      });

      setGameComments(newState);
      setCommentCount(newState.length);
    };

    getComments();
    setcontentName(gameSlug)
  }, [reload]);

  if (error) {
    console.log(error);
    return <div>Something went wrong ...</div>;
  }
  if (loading) return <Spinner />;

  return (
    <>
      <GameInfo game={game} />

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
                <label htmlFor="comment">Yorumunuzu yazın</label>
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={() => getSentimentScore(testText)}
                  style={{ backgroundColor: '#dc2f02' }}
                >
                  Yorum Ekle
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>

        {gameComments.length > 0 &&
          gameComments.map((comment, index) => (
            <CommentSection
              userName={comment.userFirstName + ' ' + comment.userLastName}
              date={comment.createdAt}
              comment={comment.comment}
              analyze={comment.analyze}
              commentRef={comment}
              key={comment.commentId}
              callBack={test}
              upvote={comment.upvote}
              downvote={comment.downvote}
            />
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
    addComment: (comment, contentId, type, analyze,contentName) =>
      dispatch(addComment(comment, contentId, type, analyze,contentName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
