// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "twittish-newdb.firebaseapp.com",
  databaseURL: "https://twittish-newdb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "twittish-newdb",
  storageBucket: "twittish-newdb.appspot.com",
  messagingSenderId: "659612079562",
  appId: "1:659612079562:web:8f3e370e46cda4f7eceb33"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;



//old db
/*
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSRXhuPN8RXqWAs-h1NdMLvpYZbXfFq3c",
  authDomain: "twittish-bfec3.firebaseapp.com",
  databaseURL: "https://twittish-bfec3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "twittish-bfec3",
  storageBucket: "twittish-bfec3.appspot.com",
  messagingSenderId: "152077837063",
  appId: "1:152077837063:web:45b6df8e6a96c1f1bb1ba2"
};
*/