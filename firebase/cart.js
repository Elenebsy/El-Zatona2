import { db } from "./Config";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Products from "./products.json";

async function getCart() {}

export default getCart;
