import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA_Tt03EYwL4gWvstwspy3uM0It6c-TVDA',
  authDomain: 'admin-venstop.firebaseapp.com',
  databaseURL: 'https://admin-venstop.firebaseio.com',
  projectId: 'admin-venstop',
  storageBucket: 'admin-venstop.appspot.com',
  messagingSenderId: '252185797650',
  appId: '1:252185797650:web:f75ca34350e7ecf6e624cb'
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;
export default fire;
