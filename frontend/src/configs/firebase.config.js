import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBqvEBGbe2cj1bNCGXDRGTOSMvSYK9p-tk",
  authDomain: "metafiction-44c5e.firebaseapp.com",
  projectId: "metafiction-44c5e",
  storageBucket: "metafiction-44c5e.appspot.com",
  messagingSenderId: "1004756537335",
  appId: "1:1004756537335:web:916a96e8f4c3b2c60b28f2",
  measurementId: "G-RRT6QLVNJ5"
};

export default firebase.initializeApp(firebaseConfig)
