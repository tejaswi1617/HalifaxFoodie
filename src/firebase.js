import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA1iJCe9l-N9zWTagvWfwZnFsRQRYtmtnM",
    authDomain: "vivek-halifaxfoodie.firebaseapp.com",
    projectId: "vivek-halifaxfoodie",
    storageBucket: "vivek-halifaxfoodie.appspot.com",
    messagingSenderId: "620165221839",
    appId: "1:620165221839:web:635012e62d6c1243ef96ba"
  };


  firebase.initializeApp(firebaseConfig);

  export default firebase;  
  //users