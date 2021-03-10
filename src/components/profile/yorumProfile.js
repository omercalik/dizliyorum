import React, { useEffect } from 'react';

import firebase from '../../config/fbConfig';
import { connect } from 'react-redux';
import ProfileComments from '../layout/ProfileComments';
import './profilecomments.css';

let dayjs = require('dayjs');
let db = firebase.firestore();

const YorumProfile = (state, userId) => {
  const [movieComments, setMovieComments] = React.useState([]);
  const ref = db.collection('comments');
  const [commentCount, setCommentCount] = React.useState();
  const [reload, setReload] = React.useState(false);

  const reloadCallback = () => {
    setReload(!reload);
  };

  useEffect(() => {
    console.log(state);
    const getComments = async () => {
      const newState = [];

      const snapshot = await ref
        .where('userId', '==', state.auth.uid)

        .orderBy('timestamp', 'desc')
        .get();

      if (snapshot.empty) {
        console.log('No matching documents.');
        setMovieComments([]);
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

      setMovieComments(newState);
      setCommentCount(newState.length);
    };

    getComments();
  }, [reload]);

  return (
    <div className="profile-comments-container">
      <h5>Yorumlarım</h5>
      {movieComments.length > 0 &&
        movieComments.map((comment, index) => (
          <ProfileComments
            userName={comment.userFirstName + ' ' + comment.userLastName}
            date={comment.createdAt}
            comment={comment.comment}
            commentRef={comment}
            key={comment.commentId}
            contentName={comment.contentName ? comment.contentName : ''}
            callback={reloadCallback}
          />
        ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    state: state,
  };
};

export default connect(mapStateToProps, null)(YorumProfile);
