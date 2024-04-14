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
import { Fontisto, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../Components/Loading";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handlelogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert(" Sign In", "Please fill all the fields");
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
            Sign In
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
                onPress={handlelogin}
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
                  Sign In
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
              Don't have an account?{" "}
              <Pressable onPress={() => router.push("signUp")}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontWeight: "bold",
                    color: "blue",
                    textAlign: "center",
                  }}
                >
                  Sign Up
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
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
    justifyContent: "center",
  },
});
