import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyCnWRN6KtnY5SyEefiu6MqbyzlExX5Fzh4",
  authDomain: "todolist-5f16f.firebaseapp.com",
  databaseURL: "https://todolist-5f16f.firebaseio.com",
  projectId: "todolist-5f16f",
  storageBucket: "todolist-5f16f.appspot.com",
  messagingSenderId: "274076560824",
  appId: "1:274076560824:web:b3c1253a8897bcfeb5f34d",
  measurementId: "G-2RH2EF6C7F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
