// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDvoaLBsvJNuLjNYJ5Y-I_naPUImzdbr3o",
  authDomain: "cword-1d3c0.firebaseapp.com",
  projectId: "cword-1d3c0",
  storageBucket: "cword-1d3c0.appspot.com",
  messagingSenderId: "883632823125",
  appId: "1:883632823125:web:01e7501358feb08984eddc",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
