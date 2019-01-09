import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA6jGnPjYuOQoNloPSx9QbkpZieCq5GR_8",
    authDomain: "opu-vai-project.firebaseapp.com",
    databaseURL: "https://opu-vai-project.firebaseio.com",
    projectId: "opu-vai-project",
    storageBucket: "opu-vai-project.appspot.com",
    messagingSenderId: "866180635592"
  };
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true});

export default firebase;