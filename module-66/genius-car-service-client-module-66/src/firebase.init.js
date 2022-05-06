// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey:process.env.REACT_APP_apiKey,
  // authDomain:process.env.REACT_APP_authDomain,
  // projectId:process.env.REACT_APP_projectId,
  // storageBucket:process.env.REACT_APP_storageBucket,
  // messagingSenderId:process.env.REACT_APP_messagingSenderId,
  // appId:process.env.REACT_APP_appId,

  apiKey: "AIzaSyD06g2B7LqMTUmK7CRIQDYIzk0Yivw0x48",
  authDomain: "genius-car-services-60-38f52.firebaseapp.com",
  projectId: "genius-car-services-60-38f52",
  storageBucket: "genius-car-services-60-38f52.appspot.com",
  messagingSenderId: "328537723678",
  appId: "1:328537723678:web:7218068e83098d5b3f2f0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
