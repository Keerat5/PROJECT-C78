import * as firebase from 'firebase'
require('@firebase/firestore')

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDYuvuvRveGLg0jys0w8JLDtX83FPmpvdo",
    authDomain: "bartersystemapp-310e2.firebaseapp.com",
    projectId: "bartersystemapp-310e2",
    storageBucket: "bartersystemapp-310e2.appspot.com",
    messagingSenderId: "881262384243",
    appId: "1:881262384243:web:780564164aa7c3f480c606"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore()  
