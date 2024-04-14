import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Fontisto, Octicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../Components/Loading";
import CustomKeyboardView from "../Components/CustomKeyboardView";
import { useAuth } from "../context/authContext";

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }
    // setLoading(true);
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    // setLoading(false);
    console.log("got result", response);
    if (!response.success) {
      Alert.alert("Sign up", response.massage);
      return;
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark" />
      <View style={styles.container1}>
        <View>
          <Image
            style={{ height: hp(25) }}
            source={require("../assets/images/signIn.png")}
          />
        </View>
        <View style={{ gap: 10, alignItems: "center" }}>
          <Text
            style={{
              fontSize: hp(4),
              fontWeight: "bold",
              color: "#000",
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
          <View
            style={{
              height: hp(7),
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#eee",
            }}
          >
            <Feather name="user" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (usernameRef.current = value)}
              style={{
                fontSize: hp(2),
                flex: 1,
                // borderWidth: 1,
                // borderColor: "gray",
              }}
              placeholder="username"
              placeholderTextColor="gray"
            />
          </View>
          <View
            style={{
              height: hp(7),
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#eee",
            }}
          >
            <Fontisto name="email" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (emailRef.current = value)}
              style={{
                fontSize: hp(2),
                flex: 1,
                // borderWidth: 1,
                // borderColor: "gray",
              }}
              placeholder="Email Address"
              placeholderTextColor="gray"
            />
          </View>

          <View
            style={{ gap: 3, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                height: hp(7),
                flexDirection: "row",
                gap: 4,
                // alignItems: "center",
                // justifyContent: "center",
                backgroundColor: "#eee",
              }}
            >
              <Octicons
                name="lock"
                size={hp(2.7)}
                color="gray"
                style={{ marginTop: 15 }}
              />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{
                  fontSize: hp(2),
                  flex: 1,
                  // borderWidth: 1,
                  // borderColor: "gray",
                }}
                placeholder="password"
                secureTextEntry
                placeholderTextColor="gray"
              />
            </View>
            <View
              style={{
                height: hp(7),
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#eee",
              }}
            >
              <FontAwesome5 name="image" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={{
                  fontSize: hp(2),
                  flex: 1,
                  // borderWidth: 1,
                  // borderColor: "gray",
                }}
                placeholder="Profile URL"
                placeholderTextColor="gray"
              />
            </View>
            <Text style={{ alignSelf: "flex-end", fontSize: hp(1.8) }}>
              Forgot Password
            </Text>
          </View>
          <View>
            {loading ? (
              <View>
                <Loading size={hp(5)} />
              </View>
            ) : (
              <Pressable
                onPress={handleRegister}
                style={{
                  backgroundColor: "blue",
                  padding: hp(1),
                  width: wp(80),
                }}
              >
                <Text
                  style={{
                    fontSize: hp(2.7),
                    fontWeight: "bold",
                    // alignItems: "center",
                    // justifyContent: "center",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Sign Up
                </Text>
              </Pressable>
            )}
          </View>

          <View>
            <Text
              style={{
                fontSize: hp(1.8),
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
              <Pressable onPress={() => router.push("signIn")}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontWeight: "bold",
                    color: "blue",
                    textAlign: "center",
                  }}
                >
                  Sign In
                </Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 12,
  },
  container1: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: hp(7),
    paddingHorizontal: wp(5),
    justifyContent: "center",
  },
});
