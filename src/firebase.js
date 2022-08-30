// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;