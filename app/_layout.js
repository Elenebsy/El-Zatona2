import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segment = useSegments();
  const router = useRouter();
  //
  useEffect(() => {
    if (typeof isAuthenticated === "undefined") {
      return;
    }
    const inApp = segment[0] === "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("home");
    } else if (!isAuthenticated && inApp) {
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};
export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
