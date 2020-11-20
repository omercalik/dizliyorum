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
        dispatch({ type: 'CREATE_PROJECT', project: list });
      })
      .then(() => {
        
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_PROJECT_ERROR', err });
      });
  };
};
