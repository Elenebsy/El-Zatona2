import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import logo from "../../assets/logo.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomKeyboardView from "../../Components/CustomKeyboardView";
import CustomMenuItems from "../../Components/CustomMenuItems";
import { Platform } from "react-native";
import { login } from "../../firebase/auth";
// import { Alert } from "react-native";

const Welcome = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/(products)");
    } catch (error) {
      Alert.alert("failed", error.message);
      console.log("check your email and password");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Text style={styles.title}>SignIn</Text>
        <Text style={styles.subtitle}>
          Stay updated on your professional world
        </Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>

        <Pressable
          style={styles.link}
          onPress={() => router.push("/(account)/ForgetPassword")}
        >
          <Text style={styles.linkText}>Forget Password?</Text>
        </Pressable>

        <Pressable
          style={styles.link}
          onPress={() => router.push("/(account)/SignUp")}
        >
          <Text style={styles.linkText}>SignUp</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    bottom: hp(10),
  },
  title: {
    fontSize: 30,
    color: "green",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "green",
    width: "60%",
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  image: {
    width: wp(100),
    height: hp(50),
    resizeMode: "contain",
    justifyContent: "flex-start",
    top: hp(5),
  },
});

export default Welcome;
