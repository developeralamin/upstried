/* eslint-disable no-undef */

importScripts(
  'https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyDTQNUqoPmEdV2h7WRT4dfhFXp4OyAbTus',
  authDomain: 'virtunus-todo.firebaseapp.com',
  databaseURL: 'https://virtunus-todo-default-rtdb.firebaseio.com',
  projectId: 'virtunus-todo',
  storageBucket: 'virtunus-todo.appspot.com',
  messagingSenderId: '618046938393',
  appId: '1:618046938393:web:a49c33f0f87dd45b7ef988',
  measurementId: 'G-04QLD2X15B',
};

firebase.initializeApp(firebaseConfig);

firebase.messaging();
