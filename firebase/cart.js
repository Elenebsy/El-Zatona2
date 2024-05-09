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
import { getProductById } from "./products";

async function getCarts() {
  const cartsCol = collection(db, "carts");
  const querySnapshot = await getDocs(cartsCol);
  const cartsList = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return cartsList;
}

async function setCart(cart) {
  const cartsCol = collection(db, "carts");
  await setDoc(doc(cartsCol), cart);
}

async function addToCart(id) {
  const product = await getProductById(id);
}

export default { getCarts, setCart };
