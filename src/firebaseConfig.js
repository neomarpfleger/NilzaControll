import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKmHpwQWG0vCHael2iMFYzgNv_2ctlij4",
  authDomain: "nilza-controll.firebaseapp.com",
  projectId: "nilza-controll",
  storageBucket: "nilza-controll.appspot.com",
  messagingSenderId: "304218993931",
  appId: "1:304218993931:web:56ce1292e315fbfbccde0e",
  measurementId: "G-TM623T80R8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
