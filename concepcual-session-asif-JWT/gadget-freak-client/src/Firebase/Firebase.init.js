// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  
  // "YOUR API KEY",
  apiKey: "AIzaSyCsFJRDxavIV1p4cI0YrHApIvE7ZyZmXN4",
  authDomain: "volunteer-network-1fb70.firebaseapp.com",
  projectId: "volunteer-network-1fb70",
  storageBucket: "volunteer-network-1fb70.appspot.com",
  messagingSenderId: "160303938791",
  appId: "1:160303938791:web:60cc8607a034778655b642"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;