import authReducer from './authReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import listReducer from './listReducer';
import { combineReducers } from 'redux';
import watchlistReducer from './watchlistReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  watchlist: watchlistReducer,
});

export default rootReducer;
