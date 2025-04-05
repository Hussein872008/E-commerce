
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnf_jOZZI6GyVfw1aR6xtpESRTJnjPSqI",
  authDomain: "reactcommerce2008.firebaseapp.com",
  projectId: "reactcommerce2008",
  storageBucket: "reactcommerce2008.firebasestorage.app",
  messagingSenderId: "895727160243",
  appId: "1:895727160243:web:8c2c157221a9009e5399c6",
  measurementId: "G-LYGQH07E64"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

