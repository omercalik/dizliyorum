import React from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../store/actions/commentActions';

const ProfileComments = ({
  auth,

  comment,
  commentRef,
  deleteComment,
  date,

  callback,
}) => {
  const handleClick = (comment) => {
    deleteComment(comment, callback);
  };
  return (
    <div>
      <div className="comment-container profile-comment-container">
        <div className="username-container">
          <p className="content-name">{commentRef.contentName}</p>
          <p className="content-date">{date}</p>
          {auth.uid === commentRef.userId ? (
            <button
              onClick={() => handleClick(commentRef)}
              className="btn-flat"
            >
              <i className="material-icons profile-comment-delete">delete</i>
            </button>
          ) : (
            ''
          )}
        </div>

        <p className="profile-comment-body">{comment}</p>

        <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComments);
