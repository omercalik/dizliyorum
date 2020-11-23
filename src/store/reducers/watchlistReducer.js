const initState = {};

const watchlistReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      console.log('added to watch list', action.movie);
      return state;
    case 'ADD_TO_WATCHLIST_ERROR':
      console.log('add to watchlist error', action.err);
      return state;
    case 'DELETED_FROM_WATCHLIST':
      console.log('deleted from watchlist', action.movie);
      return state;
    case 'DELETE_FROM_WATCHLIST_ERROR':
      console.log('delete from watchlist error', action.err);
      return state;
    default:
      return state;
  }
};

export default watchlistReducer;
