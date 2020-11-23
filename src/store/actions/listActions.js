export const createList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(authorId)
      .collection('lists')
      .add({
        ...list,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: 'CREATE_LIST', list: list });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_LIST_ERROR', err });
      });
  };
};

export const addToList = (movie, list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    let userRef = firestore.collection('users').doc(userId);
    userRef
      .collection('lists')
      .doc(list.id)
      .update({
        list: firebase.firestore.FieldValue.arrayUnion(movie),
      })
      .then(() => {
        dispatch({ type: 'ADDED_TO_LIST', movie: movie, list: list });
      })
      .catch((err) => {
        dispatch({ type: 'ADDED_TO_LIST_ERROR', err });
      });
  };
};

export const deleteFromList = (movie, list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log('asd');
    // make async call to database
    const firebase = getFirebase();
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    let userRef = firestore.collection('users').doc(authorId);

    userRef
      .collection('lists')
      .doc(list.id)
      .update({
        list: firebase.firestore.FieldValue.arrayRemove(movie),
      })
      .then(() => {
        dispatch({ type: 'DELETED_FROM_LIST', movie: movie, list: list });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_FROM_LIST_ERROR', err });
      });
  };
};
