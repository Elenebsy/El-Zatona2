import React from "react";
import { View,Pressable, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
export default function Settings() {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/profile/profile")}>
          <AntDesign name="arrowleft" size={24} color="blue" />
        </Pressable>
      </View>
      <Text>Settings</Text>
    </View>
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
