import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX2S3J2K2exAe-dyyV2g2wjgQJnULjdgM",
  authDomain: "mymoney-fbb88.firebaseapp.com",
  projectId: "mymoney-fbb88",
  storageBucket: "mymoney-fbb88.appspot.com",
  messagingSenderId: "409010452698",
  appId: "1:409010452698:web:3d66cdc074f03e9b7b8de3",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
