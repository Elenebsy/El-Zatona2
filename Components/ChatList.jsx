import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ChatItem from "./ChatItem";

export default function ChatList(users) {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <ChatItem item={item} index={index} />}
      />
      {/* <Text>ewqewqrwe </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})