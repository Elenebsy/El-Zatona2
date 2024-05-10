import React, { useState, useEffect } from "react";
import {
  Text, View, StyleSheet, TextInput, Alert, FlatList, ActivityIndicator, TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "../../Components/MyButton";
import ProductItem from "../../Components/productItem";
import { getProducts } from "../../firebase/products";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Products() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    setLoading(true);
    try {
      const products = await getProducts();
      setData(products);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch products.");
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    const product = data.find(({ id }) => id === productId);
    if (!product) {
      Alert.alert("Error", "Product not found");
      return;
    }
    const cart = JSON.parse(await AsyncStorage.getItem("Cart") || "[]");
    const index = cart.findIndex(({ id }) => id === productId);
    if (index !== -1) {
      cart[index].qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    await AsyncStorage.setItem("Cart", JSON.stringify(cart));
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <MyButton color="blue" onPress={handleGetProducts}>
            {({ pressed }) => (
              <Text style={{ color: pressed ? "#ddd" : "white" }}>Refresh</Text>
            )}
          </MyButton>
          <FlatList
            style={styles.list}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductItem
                product={item}
                onPress={() => router.push(`/(products)/${item.id}`)}
                onConfirm={() => addToCart(item.id)}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  list: {
    flex: 1,
  },
  text: {
    color: "white",
  },
});
