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
async function getProducts() {
  const productsCol = collection(db, "products");
  const querySnapshot = await getDocs(productsCol);
  const productsList = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  if (productsList.length !== 0) {
    await AsyncStorage.setItem("Products", JSON.stringify(productsList));
    return productsList;
  } else {
    Products.map(async (product) => {
      await setDoc(doc(productsCol, product.id), product);
    });
    // await setDoc(doc(productsCol), Products);
    getProducts();
  }
}

export { getProducts };
