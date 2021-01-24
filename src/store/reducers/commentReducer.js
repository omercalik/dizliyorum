const initState = {};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      console.log('comment submitted', action.comment);
      return state;
    case 'ADD_COMMENT_ERROR':
      console.log('comment submit error', action.err);
      return state;
    case 'DELETE_COMMENT':
      console.log('comment deleted', action.comment);
      return state;
    case 'DELETE_COMMENT_ERROR':
      console.log('comment delete error', action.error);
      return state;
    case 'UPVOTE_COMMENT':
      console.log('comment upvoted', action.comment);
      return { ...state.comment };
    case 'UPVOTE_ERROR':
      console.log(action.error);
      return state;
    case 'DOWNVOTE_COMMENT':
      console.log('comment downvoted', action.comment);
      return { ...state.comment };
    case 'DOWNVOTE_ERROR':
      console.log(action.error);
      return state;
    default:
      return state;
  }
};

export default commentReducer;
