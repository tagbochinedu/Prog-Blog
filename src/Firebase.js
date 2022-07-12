import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDARs0gHPZ6ei0wmSMBZTOFXzrC7_chR4U",
  authDomain: "chinedu-website-blog.firebaseapp.com",
  databaseURL: "https://chinedu-website-blog-default-rtdb.firebaseio.com",
  projectId: "chinedu-website-blog",
  storageBucket: "chinedu-website-blog.appspot.com",
  messagingSenderId: "994468490688",
  appId: "1:994468490688:web:54fc820cf4367abfa4ac25",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
