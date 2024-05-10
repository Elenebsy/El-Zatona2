import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import logo from "../../assets/forgetpassword.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { forgetPassword } from "../../firebase/auth";

const Welcome = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const handleForgetpassword = async () => {
    try {
      await forgetPassword(email);
      router.push("/(account)/login");
    } catch (error) {
      Alert.alert("failed", error.message);
      console.log("check your email ");
    }
  };

  return (
    <ScrollView>
      <Text style={{ fontSize: 30, fontWeight: "bold" ,textAlign:"center",color:"green",marginBottom:-20}}>Forgot Password</Text>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        
        <Text style={styles.subtitle}>
          Enter your email below to receive password reset instructions.
        </Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Pressable style={styles.button} onPress={handleForgetpassword}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/(account)/login")}
        >
          <Text style={styles.linkText}>Back to Sign In</Text>
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
  },
  title: {
    color: "#1e1f26",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
  },
  link: {
    textDecorationLine: "underline",
  },
  linkText: {
    color: "blue",
    fontSize: 16,
  },
  image: {
    width: wp(60),
    height: hp(30),
  },
});

export default Welcome;
