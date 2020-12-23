export const addComment = (comment, contentId, type) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;

    firestore
      .collection('comments')

      .add({
        ...comment,
        userId: userId,
        userFirstName: profile.firstName,
        userLastName: profile.lastName,
        createdAt: new Date(),
        contentId: contentId,
        type: type,
      })
      .then(() => {
        dispatch({ type: 'ADD_COMMENT', comment: comment });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_COMMENT_ERROR', err });
      });
  };
};
