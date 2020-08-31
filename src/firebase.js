import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCbQhFjS_WVrxxOxuev56rSvHqcdkCTt-0",
  authDomain: "crud-app-9a589.firebaseapp.com",
  databaseURL: "https://crud-app-9a589.firebaseio.com",
  projectId: "crud-app-9a589",
  storageBucket: "crud-app-9a589.appspot.com",
  messagingSenderId: "127798415588",
  appId: "1:127798415588:web:e85e9799bd5025d3d4dcf1",
  measurementId: "G-F3Z9WXXB5R",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
//   const auth = firebase.auth();

export default db;
