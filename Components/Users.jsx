import { FlatList, StyleSheet, Text, TextInput, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import MyButton from "./MyButton";
import { router } from "expo-router";

export default function TodoFetch() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedId, setselectedId] = useState(undefined);

  const getUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.top}>
      <View style={styles.top1}>
        {/* <Text>{text}</Text> */}
        <View style={styles.sideBySide}>
          <TextInput
            style={styles.input}
            placeholder="Search for"
            onChangeText={(t) => {
              setText(t);
              searchItems(t);
            }}
          />
          <MyButton color="red" onPress={() => searchItems(text)}>
            {({ pressed }) => (
              <Text style={styles.text}>
                {pressed ? "Searching" : "Search"}
              </Text>
            )}
          </MyButton>
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={data}
        // keyExtractor={(item) => item.id}
        renderItem={({ item: user, index }) => (
          <UserItem
            text={user.name}
            onPress={() => router.navigate(`/users/${user.id}`)}
            isSelected={selectedId === user.id}
            onSelected={() => setselectedId(user.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    margin: 5,
    padding: 15,
    width: "100%",
  },
  top1: {
    flex: 0.1,
    margin: 5,
    padding: 15,
    backgroundColor: "yellow",
    width: "100%",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 32,
  },
  list: {
    flex: 0.9,
    margin: 5,
    // padding: 15,
    backgroundColor: "yellow",
    width: "100%",
  },
  sideBySide: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "white",
    // justifyContent: "center",
    // alignContent:"center",
    // alignItems: "center",
    justifyContent: "space-between",
    // flexWrap: "wrap"
  },
});
