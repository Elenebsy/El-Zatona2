import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export default function User({ userId }) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const json = await response.json();
      setUser(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.table}>
        <Text style={styles.row}>ID: {user.id}</Text>
        <Text style={styles.row}>Name: {user.name}</Text>
        <Text style={styles.row}>Username: {user.username}</Text>
        <Text style={styles.row}>Email: {user.email}</Text>
        <Text style={styles.row}>
            Address: {user.address.street}, {user.address.suite},{" "}
            {user.address.city}, {user.address.zipcode}
        </Text>
        <Text style={styles.row}>Phone: {user.phone}</Text>
        <Text style={styles.row}>Website: {user.website}</Text>
        <Text style={styles.row}>Company: {user.company.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    table: {
        // flex: 1,
        // flex: 0.3,
        margin: 5,
        // padding: 15,
        backgroundColor: "yellow",
        width: "100%",
        justifyContent: "center",
        alignItems: "baseline",
        flexWrap: "wrap",
        // backgroundColor: "#ff0",
        // padding: 10,
    },
    row: {
        marginBottom: 5,
        // backgroundColor: "#fff",
        // width: "50%"
    },
});