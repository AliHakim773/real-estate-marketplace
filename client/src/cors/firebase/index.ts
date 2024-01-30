import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ali-estate.firebaseapp.com",
  projectId: "ali-estate",
  storageBucket: "ali-estate.appspot.com",
  messagingSenderId: "136066063794",
  appId: "1:136066063794:web:88a7acfd7d353efb4d58ab",
}

export const app = initializeApp(firebaseConfig)
