import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function Layout() {
  return <Stack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
