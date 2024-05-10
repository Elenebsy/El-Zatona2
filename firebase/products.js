import { db } from "./Config";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  // setProducts,
  // deleteProduct,
  // getProducts,
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
async function setProducts(product) {
  const productsCol = collection(db, "products");
  const productref = doc(productsCol, product.id);
  await setDoc(productref, product);
}

async function deleteProduct(id) {
  const productsCol = collection(db, "products");
  const productref = doc(productsCol, id);
  await deleteDoc(productref);
}

async function updateProduct(id, product) {
  const productsCol = collection(db, "products");
  const productref = doc(productsCol, id);
  await updateDoc(productref, product);
}

export { getProducts, setProducts, deleteProduct, updateProduct };
async function getProductById(id) {
  const productsCol = collection(db, "products");
  const docRef = doc(productsCol, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
}

export {  getProductById };
