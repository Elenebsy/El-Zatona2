import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemCart from "../../Components/ItemCart";
import MyButton from "../../Components/MyButton";
import { db, auth } from "../../firebase/Config"; // import your firebase config file
import {
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "@firebase/firestore";

export default function Cart() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [DATA, setDATA] = useState([]);
  const [text, setText] = useState("");

  const searchItems = (searchFor) => {
    console.log("searchFor", searchFor);
    if (searchFor) {
      setData(
        DATA.filter((user) =>
          user.name.toLowerCase().includes(searchFor.toLowerCase())
        )
      );
    } else {
      setData(DATA);
    }
  };

  const getData = async () => {
    try {
      const json = JSON.parse((await AsyncStorage.getItem("Cart")) || "");
      setData(json);
      setDATA(json);
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFromCart = async (productId) => {
    const product = data.find(({ id }) => id === productId);
    if (!product) {
      Alert.alert("Not Found", "Can't find product");
      return;
    }
    const newCart = data.filter((u) => u.id !== productId);
    setData(newCart);
    setDATA(newCart);

    await AsyncStorage.setItem("Cart", JSON.stringify(newCart));
  };

  const checkout = async () => {
    try {
      // Upload cart data to Firebase
      const orderscol = collection(db, "orders");

      const cartJson = JSON.parse((await AsyncStorage.getItem("Cart")) || {});
      console.log("cartJson", cartJson);
      const orderdoc = doc(orderscol);

      await setDoc(orderdoc, { ...cartJson, uid: auth.currentUser.uid });

      // Clear cart from AsyncStorage
      await AsyncStorage.removeItem("Cart");
      setData([]);
      setDATA([]);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error during checkout. Please try again.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.top}>
      <View style={styles.top1}>
        <View style={styles.sideBySide}>
          <TextInput
            style={styles.input}
            placeholder="Search for"
            onChangeText={(t) => {
              setText(t);
              searchItems(t);
            }}
          />
          <MyButton color="red" onPress={() => searchItems(text)}>
            {({ pressed }) => (
              <Text style={styles.text}>
                {pressed ? "Searching" : "Search"}
              </Text>
            )}
          </MyButton>
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item: product }) => (
          <ItemCart
            product={product}
            onPress={() => router.navigate(`/(products)/${product.id}`)}
            onDelete={() => deleteFromCart(product.id)}
          />
        )}
      />
      <MyButton
        color="blue"
        onPress={checkout}
        style={{
          width: "50%",
          justifyContent: "center",
          alignSelf: "center",
          fontWeight: "bold",
        }}
      >
        <Text style={styles.text}>Checkout</Text>
      </MyButton>
    </View>
  );
}
const styles = StyleSheet.create({
  top: {
    flex: 1,
    margin: 5,
    padding: 15,
    width: "100%",
  },
  top1: {
    flex: 0.1,
    margin: 5,
    marginTop: 50,
    padding: 15,
    width: "100%",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 20,
  },
  list: {
    flex: 0.9,
    margin: 5,
    width: "100%",
  },
  sideBySide: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
  },
});
