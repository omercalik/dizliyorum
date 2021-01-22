import React from 'react';
import './comment.css';
import { connect } from 'react-redux';
import { deleteComment } from '../../store/actions/commentActions';
const CommentSection = ({
  auth,
  state,
  userName,
  date,
  comment,
  analyze,
  commentRef,
  deleteComment,
  callBack,
  com,
}) => {
  const handleClick = (comment) => {
    deleteComment(comment, callBack);
  };

  return (
    <div className="comment-container">
      <div className="username-container">
        <p className="username">{userName}</p>
        <p className="date">{date}</p>
        {auth.uid === commentRef.userId ? (
          <button onClick={() => handleClick(commentRef)} className="btn">
            <i className="material-icons">delete</i>
          </button>
        ) : (
          ''
        )}
      </div>

      <p className="comment-body">{comment}</p>
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
