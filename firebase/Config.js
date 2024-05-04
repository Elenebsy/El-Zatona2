// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth ,getAuth} from "@firebase/auth";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "@firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4y_HcrmvVOMXd7wb_ci56QJCbBha212Y",
  authDomain: "el-zatona-6013a.firebaseapp.com",
  databaseURL:
    "https://el-zatona-6013a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "el-zatona-6013a",
  storageBucket: "el-zatona-6013a.appspot.com",
  messagingSenderId: "13856631772",
  appId: "1:13856631772:web:8750bab4ccee2704643d19",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const authentication = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

export const usersRef = collection(db, "users");

export const roomsRef = collection(db, "rooms");
