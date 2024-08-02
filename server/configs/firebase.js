// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmZ6-B_4tf4KWksMnLSAGnUcdFa4Gje8s",
  authDomain: "final-foody-project.firebaseapp.com",
  projectId: "final-foody-project",
  storageBucket: "final-foody-project.appspot.com",
  messagingSenderId: "109303860594",
  appId: "1:109303860594:web:4ab05829e9d3fc135ba1eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fileStorage = getStorage(app);
