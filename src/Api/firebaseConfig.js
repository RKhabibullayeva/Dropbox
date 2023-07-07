import firebase, { initializeApp } from "firebase/app";
import axios from "axios";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4X9IoWkG4IDF4ZaTzlDrDF_M-gvGhW50",
  authDomain: "dropboxx-9e7cf.firebaseapp.com",
  projectId: "dropboxx-9e7cf",
  storageBucket: "dropboxx-9e7cf.appspot.com",
  messagingSenderId: "1097492992180",
  appId: "1:1097492992180:web:12c88876b645ce841487e1",
  measurementId: "G-3ZKN0MSWQ7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // initialize Firebase Storage
export { auth, db, storage };


export const getUserFiles = (userId) => {
    const filesRef = collection(db, 'files');
    const filesQuery = query(filesRef, where('userId', '==', userId));
  
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(filesQuery, (snapshot) => {
        const files = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        resolve(files);
      }, reject);
      return unsubscribe;
    });
  };
