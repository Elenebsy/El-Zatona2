import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter, Link } from "expo-router";

// Import local assets
import supermarketLogo from "../../assets/supermarketlogo.png"; // Assume you have a logo

const WelcomePage = () => {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/account");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={supermarketLogo} style={styles.logo} />
      <Text style={styles.title}>Welcome to El Zatona Market</Text>
      <Text style={styles.subtitle}>
        Find everything you need, from groceries to home essentials!
      </Text>

      <Pressable style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: wp(5),
    backgroundColor: "white",
  },
  logo: {
    width: wp(100),
    height: hp(30),
    resizeMode: "contain",
    marginBottom: hp(5),
  },
  title: {
    fontSize: wp(8),
    fontWeight: "bold",
    color: "green", // Brand primary color
    marginBottom: hp(2),
  },
  subtitle: {
    fontSize: wp(4.5),
    color: "#264653", // Secondary color
    textAlign: "center",
    marginBottom: hp(4),
  },
  button: {
    backgroundColor: "green",
    width: "60%",
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default WelcomePage;
