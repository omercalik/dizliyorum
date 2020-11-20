const initState = {
    movie: [
      { id: '1', title: 'help me find peach' },
      { id: '2', title: 'collect all the stars' },
      { id: '3', title: 'egg hunt with yoshi' },
    ],
  };
  
  const movieListReducer = (state = initState, action) => {
    switch (action.type) {
      case 'ADD_MOVIE_ITEM':
        console.log('created list', action.movie);
        return state;
      case 'ADD_MOVIE_ITEM_ERROR':
        console.log('create list error', action.err);
        return state;
      default:
        return state;
    }
  };
  
  export default movieListReducer;
  