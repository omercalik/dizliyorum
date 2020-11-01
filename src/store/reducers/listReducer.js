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
    default:
      return state;
  }
};

export default listReducer;
