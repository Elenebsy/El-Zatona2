import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "../../Components/MyButton";
import ProductItem from "../../Components/productItem";
import CustomKeyboardView from "../../Components/CustomKeyboardView";
import { getProducts } from "../../firebase/products";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Products() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [DATA, setDATA] = useState([]);
  const [cart, setCart] = useState([]);

  const router = useRouter();

  const AddToCart = async (productId) => {
    const product = data.find(({ id }) => id === productId);
    if (!product) {
      Alert.alert("Not Found", "Can't find product");
      return;
    }
    const cartJson = JSON.parse((await AsyncStorage.getItem("Cart")) || "[]");
    let productInCart = cartJson.find(({ id }) => id === productId);
    let newCart = [];
    if (productInCart) {
      productInCart.qty = (product.qty || 1) + 1;
      product.inCart = true;
      newCart = cartJson.filter((u) => u.id !== productId);
      newCart = [...newCart, productInCart];
    } else {
      productInCart = product;
      productInCart.qty = 1;
      product.inCart = true;
      newCart = [...cartJson, productInCart];
    }
    // const newProducts = data.filter(u=>u.id!==productId);
    setCart(newCart);

    await AsyncStorage.setItem("Cart", JSON.stringify(newCart));
  };

  const deleteFromCart = async (productId) => {
    const product = cart.find(({ id }) => id === productId);
    if (!product) {
      Alert.alert("Not Found", "Can't find product");
      return;
    }
    const newCart = cart.filter((u) => u.id !== productId);
    setCart(newCart);

    await AsyncStorage.setItem("Cart", JSON.stringify(newCart));
  };

  const searchItems = (searchFor) => {
    console.log("searchFor", searchFor);
    if (searchFor) {
      setData(
        DATA.filter((user) =>
          user.name.toLowerCase().includes(searchFor.toLowerCase())
        )
      );
    } else {
      setData(DATA); // Reset data to the original unfiltered data
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    try {
      const products = await getProducts();
      setData(products);
      setDATA(products);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={styles.top}>
      <CustomKeyboardView style={styles.top1}>
        {/* <SafeAreaView style={styles.sideBySide}>
          <TextInput
            style={styles.input}
            placeholder="Search"
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
        </SafeAreaView> */}
      </CustomKeyboardView>
      <CustomKeyboardView style={styles.top1}>
        <MyButton color="blue" onPress={() => handleGetProducts()}>
          {({ pressed }) => (
            <Text style={styles.text}>
              {pressed ? "Refreshing" : "Refresh"}
            </Text>
          )}
        </MyButton>
      </CustomKeyboardView>
      <FlatList
        style={styles.list}
        data={data}
        // keyExtractor={(item) => item.id}

        contentContainerStyle={styles.listContent}
        renderItem={({ item: product }) => (
          <ProductItem
            product={product}
            onPress={() => router.push(`/(products)/${product.id}`)}
            onConfirm={() => AddToCart(product.id)}
            onDelete={() => deleteFromCart(product.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    width: "100%",
    display: "flex",
  },

  list: {
    flex: 1,
    // flexGrow: 1,
    // margin: 5,
    // marginRight: 15,
    // // padding: 15,
    // // backgroundColor: "yellow",
    // width: "100%",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sideBySide: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "white",
    // justifyContent: "center",
    // alignContent:"center",
    // alignItems: "center",
    justifyContent: "space-between",
    // flexWrap: "wrap"
  },
  text: { color: "white" },
  SearchContainer: {
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  SearchBar: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 24,
    paddingHorizontal: 16,
  },

  SearchBarInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  SearchFilter: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  SearchIcon: {
    marginRight: 8,
  },
});
