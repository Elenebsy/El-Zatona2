// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getAuth } from "@firebase/auth";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "@firebase/database";
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// export const authentication = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app, "gs://el-zatona-6013a.appspot.com");
export const database = getDatabase(app);
