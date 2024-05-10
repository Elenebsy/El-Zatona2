import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Products screen component
// const ProductsScreen = () => (
//   <View style={styles.container}>
//     <Text style={styles.title}>Products Screen</Text>
//   </View>
// );

// // Cart screen component
// const CartScreen = () => (
//   <View style={styles.container}>
//     <Text style={styles.title}>Cart Screen</Text>
//   </View>
// );

export default function Layout({ children }) {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        // component={ProductsScreen}
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-bag" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        // component={CartScreen}
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
