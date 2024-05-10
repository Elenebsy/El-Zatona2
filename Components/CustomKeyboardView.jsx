import React from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View, Platform } from "react-native";

export default function CustomKeyboardView({ children }) {

  const ios = Platform.OS === "ios";

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
  },
})