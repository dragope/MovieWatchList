import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

export const firebaseConfig =  {
  apiKey: "AIzaSyAQFrmdJfHlL0PItwa0tojuUBA0WozO2Z0",
  authDomain: "watchlist-bd0a2.firebaseapp.com",
  projectId: "watchlist-bd0a2",
  storageBucket: "gs://watchlist-bd0a2.appspot.com",
  messagingSenderId: "662576068351",
  appId: "1:662576068351:web:c656efaacb0845a9e83eca"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const auth = getAuth(app)
