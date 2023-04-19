import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKQCeOoTf4Pu-5omVhf4qriDAoICr45C8",
  authDomain: "list-app-d51c6.firebaseapp.com",
  databaseURL: "https://list-app-d51c6-default-rtdb.firebaseio.com",
  projectId: "list-app-d51c6",
  storageBucket: "list-app-d51c6.appspot.com",
  messagingSenderId: "769453656685",
  appId: "1:769453656685:web:1baa5753476de684ee8d64",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
