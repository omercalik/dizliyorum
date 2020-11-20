export const addMovieItem = (movie) => {
    return (dispatch, getState, {getFirestore }) => {
      // make async call to database
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      const title = getState().firebase.auth.uid.title;
      firestore
        .collection('users')
        .doc(authorId)
        .collection('lists')
        
        .add({
          ...movie,
          movieId: movie.id,
          movieName: movie.original_title,     
        })
        .then(() => {
          dispatch({ type: 'ADD_MOVIE_ITEM', project: movie });
        })
        .then(() => {
          
        })
        .catch((err) => {
          dispatch({ type: 'ADD_MOVIE_ITEM_ERROR', err });
        });
    };
  };
  