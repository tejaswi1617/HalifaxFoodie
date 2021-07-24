import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

// import firebase from "./firebase";
// const ref = firebase.firestore().collection("users")

// const user = {
//   username: Auth.user.username,
//   email: Auth.user.attributes.email,
//   question: question,
//   answer: answer,
// }
// ref.doc().set(user).then(() => {
//   console.log("security question recorded in firebase")
//   history.push("/list");
//   // return <Redirect to="/list"/>
// }).catch((err)=>(
//   console.err("error in saving to firebase" + err)
// ))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
