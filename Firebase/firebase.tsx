// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4qLnmveRq0QYobmYz1ntPV5POtGhAslg",
  authDomain: "zotnfound2.firebaseapp.com",
  projectId: "zotnfound2",
  storageBucket: "zotnfound2.appspot.com",
  messagingSenderId: "87570599606",
  appId: "1:87570599606:web:6c30917fc9b82f977b6017",
  measurementId: "G-7LSQR22ZSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);