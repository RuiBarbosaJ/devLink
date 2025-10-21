import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCmATju9bPeJ-nhNg_lmt-yd1JNASVKXs",
  authDomain: "devlink-43073.firebaseapp.com",
  projectId: "devlink-43073",
  storageBucket: "devlink-43073.firebasestorage.app",
  messagingSenderId: "525639410827",
  appId: "1:525639410827:web:3edc04f35314f1330a208e",
  measurementId: "G-5G29BLCHJM",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
