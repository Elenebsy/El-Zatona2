import React from "react";
import { StyleSheet, Text, View ,Pressable} from "react-native";
import { useRouter } from "expo-router";

export default function Course() {
  const router = useRouter();
  return (
    <View style={styles.container}>
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