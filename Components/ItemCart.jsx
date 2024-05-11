import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import MyButton from "./MyButton";

export default function ItemCart({ product, onPress, onDelete }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < product.max) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.2 : 1 },
        styles.item,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: product.images[0] }} />
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.mutual}>{`${product.price} EGP`}</Text>
        <View style={styles.counterContainer}>
          <Pressable onPress={handleDecrement}>
            <MaterialIcons name="remove" size={24} color="black" />
          </Pressable>
          <Text style={styles.counter}>{quantity}</Text>
          <Pressable onPress={handleIncrement}>
            <MaterialIcons name="add" size={24} color="black" />
          </Pressable>
        </View>
        <MyButton style={styles.button2} onPress={onDelete}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
        </MyButton>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center"
  },
  item: {
    padding: 5,
    marginVertical: 1,
    flexDirection: "row",
    height: 108,
  },
  title: {
    fontSize: 16,
  },
  mutual: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  imageContainer: {
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    objectFit: "contain",
  },
  sideBySide: {
    flexDirection: "row",
  },
  button2: {
    marginHorizontal: 2,
    backgroundColor: "red",
    borderRadius: 6,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counter: {
    marginHorizontal: 10,
    fontSize: 20,
  }
});
