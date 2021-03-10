import React, { useState } from 'react';
import './comment.css';
import { connect } from 'react-redux';
import firebase from '../../config/fbConfig';
import { deleteComment } from '../../store/actions/commentActions';
const CommentSection = ({
  auth,

  userName,
  date,
  comment,
  analyze,
  commentRef,
  deleteComment,
  callBack,
  upvote,
  downvote,
}) => {
  const [upvoteCount, setupvoteCount] = useState(upvote);
  const [downvoteCount, setdownvoteCount] = useState(downvote);
  const [voteType, setvoteType] = useState();
  const [clicked, setClicked] = useState(false);

  let db = firebase.firestore();

  const votedComment = db
    .collection('users')
    .doc(auth.uid)
    .collection('votedComments')
    .doc(commentRef.commentId)
    .get()
    .then((doc) => {
      if (!doc.exists) {
      } else {
        if (doc.data().voteType === 'upvote') {
          setvoteType('upvote');
        } else {
          setvoteType('downvote');
        }
      }
    })
    .catch((err) => console.log(err));

  const handleClick = (comment) => {
    deleteComment(comment, callBack);
  };

  const handleVote = (comment, type) => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    const commentRef = db
      .collection('users')
      .doc(auth.uid)
      .collection('votedComments')
      .doc(comment.commentId);

    const getDoc = commentRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          if (type === 'upvote') {
            db.collection('comments')
              .doc(comment.commentId)
              .update({ upvote: increment })
              .then((res) => {
                setupvoteCount(upvoteCount + 1);
                setvoteType('upvote');
                db.collection('users')
                  .doc(auth.uid)
                  .collection('votedComments')
                  .doc(comment.commentId)
                  .set({
                    ...comment,
                    voteType: 'upvote',
                  })

                  .then((res) => {
                    console.log('upvote successfully added to db.', res);
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            db.collection('comments')
              .doc(comment.commentId)
              .update({ downvote: increment })
              .then((res) => {
                setdownvoteCount(downvoteCount + 1);
                setvoteType('downvote');
                db.collection('users')
                  .doc(auth.uid)
                  .collection('votedComments')
                  .doc(comment.commentId)
                  .set({
                    ...comment,
                    voteType: 'downvote',
                  })

                  .then((res) => {
                    console.log('downvote successfully added to db.', res);
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          if (type === 'upvote') {
            if (doc.data().voteType === 'upvote') {
              db.collection('comments')
                .doc(comment.commentId)
                .update({
                  upvote: decrement,
                })
                .then(() => {
                  setupvoteCount(upvoteCount - 1);
                  setvoteType('');
                  db.collection('users')
                    .doc(auth.uid)
                    .collection('votedComments')
                    .doc(comment.commentId)
                    .delete()
                    .then((res) => {
                      console.log('upvote successfully deleted from db.', res);
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              db.collection('comments')
                .doc(comment.commentId)
                .update({
                  upvote: increment,
                  downvote: decrement,
                })
                .then(() => {
                  setupvoteCount(upvoteCount + 1);
                  setdownvoteCount(downvoteCount - 1);
                  setvoteType('upvote');
                  db.collection('users')
                    .doc(auth.uid)
                    .collection('votedComments')
                    .doc(comment.commentId)
                    .update({
                      voteType: 'upvote',
                    })
                    .then((res) => {
                      console.log('downvote changed to upvote', res);
                    })
                    .catch((err) => console.log(err));
                });
            }
          } else {
            if (doc.data().voteType === 'downvote') {
              db.collection('comments')
                .doc(comment.commentId)
                .update({
                  downvote: decrement,
                })
                .then(() => {
                  setdownvoteCount(downvoteCount - 1);
                  setvoteType('');
                  db.collection('users')
                    .doc(auth.uid)
                    .collection('votedComments')
                    .doc(comment.commentId)
                    .delete()
                    .then((res) => {
                      console.log(
                        'downvote successfully deleted from db.',
                        res
                      );
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              db.collection('comments')
                .doc(comment.commentId)
                .update({
                  upvote: decrement,
                  downvote: increment,
                })
                .then(() => {
                  setupvoteCount(upvoteCount - 1);
                  setdownvoteCount(downvoteCount + 1);
                  setvoteType('downvote');
                  db.collection('users')
                    .doc(auth.uid)
                    .collection('votedComments')
                    .doc(comment.commentId)
                    .update({
                      voteType: 'downvote',
                    })
                    .then((res) => {
                      console.log('upvote changed to downvote', res);
                    })
                    .catch((err) => console.log(err));
                });
            }
          }
        }
      })
      .catch((err) => {
        console.log('Error getting document', err);
      });
  };

  return (
    <div className="comment-container">
      <div className="username-container">
        <p className="username">{userName}</p>
        <p className="date">{date}</p>
        {auth.uid === commentRef.userId ? (
          <button onClick={() => handleClick(commentRef)} className="btn-flat">
            <i className="material-icons">delete</i>
          </button>
        ) : (
          ''
        )}
      </div>

      <p className="comment-body">{comment}</p>

      <div>
        <button
          onClick={() => handleVote(commentRef, 'upvote')}
          className={'btn-flat vote ' + (clicked ? 'disabled-button' : '')}
          disabled={clicked}
        >
          <i
            className="tiny material-icons"
            style={{
              color: voteType === 'upvote' ? 'green' : 'white',
            }}
          >
            thumb_up
          </i>{' '}
        </button>
        <span className="vote-count">{upvoteCount}</span>
        <button
          onClick={() => handleVote(commentRef, 'downvote')}
          className={'btn-flat vote ' + (clicked ? 'disabled-button' : '')}
          disabled={clicked}
        >
          <i
            className=" tiny material-icons downvote"
            style={{
              color: voteType === 'downvote' ? 'red' : 'white',
            }}
          >
            thumb_down{' '}
          </i>{' '}
        </button>

        <span className="vote-count">{downvoteCount}</span>
        {analyze === 'pozitif' ? (
          <i className="small material-icons satisfied">
            sentiment_very_satisfied
          </i>
        ) : (
          <i className="small material-icons dissatisfied">
            sentiment_very_dissatisfied
          </i>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    state: state,
    com: state.comment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (comment, callBack) =>
      dispatch(deleteComment(comment, callBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);
