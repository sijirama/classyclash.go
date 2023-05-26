import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import dotenv from "dotenv"
dotenv.config()

const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: import.meta.env.AUTH_DOMAIN,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGE_SENDER_ID,
  appId: import.meta.env.APP_ID,
};


const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

