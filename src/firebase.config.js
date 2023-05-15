// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMFVL7nSGy_GdnGfFm0YSU-OJ39NRopL0",
  authDomain: "otp-login-verification-8800f.firebaseapp.com",
  projectId: "otp-login-verification-8800f",
  storageBucket: "otp-login-verification-8800f.appspot.com",
  messagingSenderId: "475855359467",
  appId: "1:475855359467:web:c92767deb161ebe5ca9dae",
  measurementId: "G-H951N25QQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)