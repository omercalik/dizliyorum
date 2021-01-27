export const addComment = (comment, contentId, type, analyze, name) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;

    firestore
      .collection('comments')

      .add({
        ...comment,
        userId: userId,
        userFirstName: profile.firstName,
        userLastName: profile.lastName,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        createdAt: new Date(),
        contentId: contentId,
        type: type,
        upvote: 0,
        downvote: 0,
        analyze: analyze,
        contentName: name,
      })
      .then(() => {
        dispatch({ type: 'ADD_COMMENT', comment: comment });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_COMMENT_ERROR', err });
      });
  };
};

export const deleteComment = (comment, callBack) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection('comments')
      .doc(comment.commentId)
      .delete()
      .then((res) => {
        dispatch({ type: 'DELETE_COMMENT', comment: comment });
        callBack();
      })
      .catch((error) => {
        dispatch({ type: 'DELETE_COMMENT_ERROR', error });
      });
  };
};
