// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVa19_jYV-ojrpe5JVpyQyMOEt-LFGS8w",
  authDomain: "fir-practice-fe622.firebaseapp.com",
  projectId: "fir-practice-fe622",
  storageBucket: "fir-practice-fe622.firebasestorage.app",
  messagingSenderId: "216197593988",
  appId: "1:216197593988:web:f4506c813d3fcbd8ee7bd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();