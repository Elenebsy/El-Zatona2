import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import MyButton from "./MyButton";

const ProductItem = ({ product, onPress, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.item,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: product.images[0] }} />
      </View>
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {product.name}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{`${product.price} EGP`}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <MyButton style={styles.quantityButton} onPress={decreaseQuantity}>
            <Text style={styles.quantityButtonText}>-</Text>
          </MyButton>
          <Text style={styles.quantity}>{quantity}</Text>
          <MyButton style={styles.quantityButton} onPress={increaseQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </MyButton>
        </View>
        <View style={styles.buttonContainer}>
          <MyButton style={styles.button} onPress={onConfirm}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </MyButton>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
   padding: 10,
  }, 
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  imageContainer: {
     flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    
  },
  image: {
    width: 200,
    height: 200,
  },
 
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,

  },
  title: {
    fontSize: 18,
    fontWeight: "bold",


  },
  priceContainer: {
   alignItems: "center",
   marginBottom: 10,
   marginLeft: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  quantityContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 5,
    padding: 10,
  },
  quantityButton: {
    backgroundColor: "#007AFF", 
    borderRadius: 50,
    width: 30,
    height: 30,
   textAlign: 'center',
    padding: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductItem;