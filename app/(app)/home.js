import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";

export default function home() {
  const router = useRouter();
  const logout = useAuth().logout;
  handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Home page </Text>
      <Button title="Sign out" onPress={handleLogout} />
      <Button
        title="Sign In"
        onPress={() => {
          router.push("/signIn");
        }}
      />
    </View>
  );
}
