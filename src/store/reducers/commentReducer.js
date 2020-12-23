const initState = {};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      console.log('comment submitted', action.comment);
      return state;
    case 'ADD_COMMENT_ERROR':
      console.log('comment submit error', action.err);
      return state;
    default:
      return state;
  }
};

export default commentReducer;
