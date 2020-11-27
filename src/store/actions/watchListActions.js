import { allowedNodeEnvironmentFlags } from 'process';

export const addToWatchList = (movie) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firebase = getFirebase();
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    let userRef = firestore.collection('users').doc(authorId);

    userRef
      .update({
        watchlist: firebase.firestore.FieldValue.arrayUnion(movie),
      })
      .then(() => {
        dispatch({ type: 'ADD_TO_WATCHLIST', movie: movie });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_TO_WATCHLIST_ERROR', err });
      });
  };
};

export const deleteFromWatchList = (movie, index) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firebase = getFirebase();
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    let userRef = firestore.collection('users').doc(authorId);

    userRef
      .update({
        watchlist: firebase.firestore.FieldValue.arrayRemove(movie),
      })
      .then(() => {
        dispatch({ type: 'DELETED_FROM_WATCHLIST', movie: movie });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_FROM_WATCHLIST_ERROR', err });
      });
  };
};
