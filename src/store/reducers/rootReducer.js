import authReducer from './authReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import listReducer from './listReducer';
import commentReducer from './commentReducer';
import { combineReducers } from 'redux';
import watchlistReducer from './watchlistReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['list', 'watchlist'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  watchlist: watchlistReducer,
  comment: commentReducer,
});

export default persistReducer(persistConfig, rootReducer);
