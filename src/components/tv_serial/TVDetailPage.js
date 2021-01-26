import React, { useEffect } from 'react';
import { Navigation } from '../movie/Navigation';
import { MovieInfo } from '../movie/MovieInfo';
import { connect } from 'react-redux';
import MovieInfoBar from '../movie/MovieInfoBar';
import { addComment } from '../../store/actions/commentActions';
import firebase from '../../config/fbConfig';
import * as tf from '@tensorflow/tfjs';
import padSequences from '../movie/paddedSeq';
import { Actor } from '../movie/Actor';
import Spinner from '../dashboard/Spinner';
import { ActorCarousel } from '../movie/ActorCarousel';
import { TVInfo } from '../tv_serial/TVInfo';
import TVInfoBar from '../tv_serial/TVInfoBar';
import CommentSection from '../layout/CommentSection';
import './tv.css';

import { useTVFetch } from '../hooks/useTVFetch';

let db = firebase.firestore();

let dayjs = require('dayjs');

const TVDetail = ({ TVId, addComment }) => {
  const [TV, loading, error] = useTVFetch(TVId);
  const [comment, setComment] = React.useState('');
  const [contentName, setcontentName] = React.useState('');
  const [analyze, setAnalyze] = React.useState('');
  const [tvComments, settvComments] = React.useState([]);
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
    console.log(tvComments);
  };

  const handleChange = (e) => {
    setComment({ [e.target.id]: e.target.value });
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(comment, TVId, 'tv', analyze,contentName);
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

  useEffect(() => {
    tf.ready().then(() => {
      loadModel(url);
      loadMetadata(url);
    });

    const getComments = async () => {
      const newState = [];

      const snapshot = await ref
        .where('contentId', '==', TVId)

        .orderBy('timestamp', 'desc')
        .get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        settvComments([]);
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

      settvComments(newState);
      setCommentCount(newState.length);
    };
    
    getComments();
    setcontentName(TV.name);
  }, [reload]);

  if (error) {
    console.log(error);
    return <div>Something went wrong ...</div>;
  }
  if (loading) return <Spinner />;
  return (
    <>
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

        {tvComments.length > 0 &&
          tvComments.map((comment, index) => (
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
    addComment: (comment, contentId, type, analyze, contentName) =>
      dispatch(addComment(comment, contentId, type, analyze, contentName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TVDetail);
