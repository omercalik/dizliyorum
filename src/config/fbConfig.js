import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyAB2WToxEKSCg0fqnRWWSW7A422x2X-w9k',
  authDomain: 'dizliyorum-d45aa.firebaseapp.com',
  databaseURL: 'https://dizliyorum-d45aa.firebaseio.com',
  projectId: 'dizliyorum-d45aa',
  storageBucket: 'dizliyorum-d45aa.appspot.com',
  messagingSenderId: '356561122360',
  appId: '1:356561122360:web:75fce2d38d3c158273a2cd',
  measurementId: 'G-4KTRXTL37E',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
