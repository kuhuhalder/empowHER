// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATbkBjVZBxXNkLzNikB40JfKGHojQwsWY",
  authDomain: "empowher-66f52.firebaseapp.com",
  projectId: "empowher-66f52",
  storageBucket: "empowher-66f52.appspot.com",
  messagingSenderId: "259692034913",
  appId: "1:259692034913:web:0da4ba8776099bcdf92320",
  measurementId: "G-CDYD8ZTF56",
  databaseURL: 'https://empowher-66f52.firebaseio.com',
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export default firebase;
// Path: src/firebase/config.js
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig)
// } else {
//   app = firebase.app();
// }



// export { firebase };

const app = initializeApp(firebaseConfig)
