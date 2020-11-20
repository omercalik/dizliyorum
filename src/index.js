import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from './store/reducers/rootReducer';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import firebase from './config/fbConfig';
import { PersistGate } from 'redux-persist/integration/react';

import {
  createFirestoreInstance,
  reduxFirestore,
  getFirestore,
} from 'redux-firestore';
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from 'react-redux-firebase';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase)
  )
);

export const persistor = persistStore(store);

const rffProps = {
  firebase,
  useFirestoreForProfile: true,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  presence: 'presence',
  sessions: 'sessions',
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <div></div>;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rffProps}>
      <AuthIsLoaded>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
