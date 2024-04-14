import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function home() {
  const router = useRouter();
  return (
    <View>
      <Text>Home page </Text>
      <Button
        title="Sign In"
        onPress={() => {
          router.push("/signIn");
        }}
      />
    </View>
  );
}
