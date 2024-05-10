import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getProductById } from "../../firebase/products";
import { useLocalSearchParams } from "expo-router";
import MyButton from "../../Components/MyButton";
import { getUserById } from "../../firebase/review";
import { deleteProduct, updateProduct } from "../../firebase/products";
import { useRouter } from "expo-router";
export default function Product() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [disabled, setDisabled] = useState(true); // Start with disabled state as true
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchProduct();
    fetchUser();
  }, [id]);

  useEffect(() => {
    // Check if the user is admin and set disabled state accordingly
    if (user.isAdmin) {
      setIsAdmin(true);
      setDisabled(false);
    } else {
      setIsAdmin(false);
      setDisabled(true);
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const userData = await getUserById();
      if (!userData) {
        console.error("User data not found, cannot post comment.");
        return;
      }
      setUser(userData);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleUpdateProduct = () => {
    // Only perform update action if user is admin
    if (isAdmin) {
      router.push(`/(products)/updateProduct/${id}`);
      console.log("Update product");
    }
  };

  const handleDeleteProduct = async () => {
    // Only perform delete action if user is admin
    if (isAdmin) {
      try {
        await deleteProduct(id);
        console.log("Product deleted successfully");
        router.push("/(products)");
      }
      catch (error) {
        console.error("Error deleting product:", error);
      }

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

      <MyButton style={styles.button} onPress={() => console.log("Add to cart")}>
        <Text style={{ color: "white" }}>Add to cart</Text>
      </MyButton>
      <MyButton
        style={{ ...styles.button, display: disabled ? "none" : "flex" }}
        onPress={handleUpdateProduct} // Call handleUpdateProduct function
      >
        <Text style={{ color: "white" }}>Update product</Text>
      </MyButton>
      <MyButton
        style={{ ...styles.button, display: disabled ? "none" : "flex" }}
        onPress={handleDeleteProduct} // Call handleDeleteProduct function
      >
        <Text style={{ color: "white" }}>Delete product</Text>
      </MyButton>
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
