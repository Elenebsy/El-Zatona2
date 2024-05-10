import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getProductById } from "../../firebase/products";
import { useLocalSearchParams } from "expo-router";
import MyButton from "../../Components/MyButton";
import { getUserById } from "../../firebase/review";
export default function Product() {
  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const [disbled, setDisabled] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchProduct();

    fetchUser();
    console.log("user", user);

    if (user) {
      console.log("user", user);
      if (user.isAdmin) {
        setAdmin(true);
        console.log("isAdmin", isAdmin);
      }
    }
    if (isAdmin) {
      setDisabled("flex");
    } else {
      setDisabled("none");
    }
  }, [id]);
  const fetchUser = async () => {
    try {
      const userData = await getUserById();
      if (!userData) {
        console.error("User data not found, cannot post comment.");
        return;
      }
      console.log("userData1", userData);
      setUser(userData);
      console.log("usddder", user);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
  const fetchProduct = async () => {
    try {
      console.log("id", id);
      const data = await getProductById(id);
      console.log("data", data);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <View style={styles.container}>
      {product && product.images && product.images.length > 0 && (
        <Image source={{ uri: product.images[0] }} style={styles.image} />
      )}
      {product && product.name && (
        <Text style={styles.text}>{product.name}</Text>
      )}
      {product && product.discount_price && (
        <Text style={styles.text}>
          Discount Price: {product.discount_price}
        </Text>
      )}
      {product && product.price && (
        <Text style={styles.text}>Price: {product.price}</Text>
      )}
      {product && product.isAvailable !== undefined && (
        <Text style={styles.text}>
          Available: {product.isAvailable ? "Yes" : "No"}
        </Text>
      )}
      {product && product.max && (
        <Text style={styles.text}>Max: {product.max}</Text>
      )}

      {/* <View style={{ marginTop: 10 }}> */}
      <MyButton
        style={styles.button}
        onPress={() => console.log("Add to cart")}
      >
        <Text style={{ color: "white" }}>Add to cart</Text>
      </MyButton>
      <MyButton
        style={{ ...styles.button, display: disbled }}
        onPress={() => console.log("update product")}
      >
        <Text style={{ color: "white" }}>update product</Text>
      </MyButton>
      <MyButton
        style={{ ...styles.button, display: disbled }}
        onPress={() => console.log("Delete product")}
      >
        <Text style={{ color: "white" }}>Delete product</Text>
      </MyButton>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 45,
    objectFit: "contain",
  },
  text: {
    marginBottom: 5,
    fontSize: 20,
  },
  button: {
    margin: 5,
    width: "100%",
  },
});
