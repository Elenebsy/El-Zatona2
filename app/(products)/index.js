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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
      setData(DATA);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.SearchContainer}>
        <View style={styles.SearchBar}>
          <View style={styles.SearchBarInput}>
            <Ionicons
              style={styles.SearchIcon}
              name="search"
              size={24}
              color="#D3D3D3"
              onPress={() => searchItems(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Search"
              onChangeText={(t) => {
                setText(t);
                searchItems(t);
              }}
            />
          </View>
          <Link href={"/(account)/review"} asChild>
            <TouchableOpacity style={styles.SearchFilter}>
              <MaterialIcons name="reviews" size={24} color="black" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

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
    marginTop: 50,
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
