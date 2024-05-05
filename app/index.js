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
    // console.log("auth().currentUser", auth.currentUser);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user1", user);
        AsyncStorage.setItem("user", JSON.stringify(user));
        router.replace("/products");
      } else {
        console.log("user2", user);
        AsyncStorage.removeItem("user");
        router.replace("/account");
      }
      // setUser(user)
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <Link href={"/course"}>Not loading? Login here</Link>
      {/* {user ? <App /> : <Register />} */}
      <StatusBar style="auto" />
    </View>
    // <Cities />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
