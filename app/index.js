import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { auth } from "../firebase/Config";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Components/Loading";
export default function Page() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user1", user);
        try {
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Error storing user data:", error);
        }
        router.push("/(products)/");
      } else {
        console.log("user2", user);
        try {
          await AsyncStorage.removeItem("user");
        } catch (error) {
          console.error("Error removing user data:", error);
        }
        router.push("/(account)/Welcome");
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
