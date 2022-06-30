// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHZPuJUsfjz5Yb6AsEH1aGpaf4tBnfuD0",
  authDomain: "task-manager-95cb1.firebaseapp.com",
  projectId: "task-manager-95cb1",
  storageBucket: "task-manager-95cb1.appspot.com",
  messagingSenderId: "15211190708",
  appId: "1:15211190708:web:015ed52302219233193ae1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);