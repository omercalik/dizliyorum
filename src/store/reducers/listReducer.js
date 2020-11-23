const initState = {
  lists: [
    { id: '1', title: 'help me find peach' },
    { id: '2', title: 'collect all the stars' },
    { id: '3', title: 'egg hunt with yoshi' },
  ],
};

const listReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_LIST':
      console.log('created list', action.list);
      return state;
    case 'CREATE_LIST_ERROR':
      console.log('create list error', action.err);
      return state;
    case 'ADDED_TO_LIST':
      console.log('added to list', action.movie, action.list);
      return state;
    case 'ADDED_TO_LIST_ERROR':
      console.log('error addin to list', action.err);
      return state;
    case 'DELETED_FROM_LIST':
      console.log('Deleted from list', action.movie, action.list);
      return state;
    case 'DELETE_FROM_LIST_ERROR':
      console.log('Delete from list error', action.err);
      return state;
    default:
      return state;
  }
};

export default listReducer;
