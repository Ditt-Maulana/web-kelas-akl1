// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDDsc7J_V0fb8CvpU-YOKMLe9hjDqUpoM8",
  authDomain: "web-kelas-xii-akl-1.firebaseapp.com",
  projectId: "web-kelas-xii-akl-1",
  storageBucket: "web-kelas-xii-akl-1.firebasestorage.app",
  messagingSenderId: "411441904086",
  appId: "1:411441904086:web:9c78c2b5dd26259caf0c77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();