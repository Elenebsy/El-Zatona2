import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function Loading(size) {
  return (
    <View style={{ ...styles.container, height: size, aspectRatio: 1 }}>
      <LottieView
        source={require("../assets/loading.json")}
        autoPlay
        loop
        speed={2}
        resizeMode="contain"

        autoSize
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  lottie: {

    width: 200,
    height: 200,
  },
});
