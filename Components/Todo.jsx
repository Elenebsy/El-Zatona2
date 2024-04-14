import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import lemon from "../assets/lemon.png";
import mango from "../assets/mango.png";
import Item from "./Item";
import MyButton from "./MyButton";

export default function Todo() {
  const DATA = [
    { text: "1234", icon: lemon },
    { text: "lemon", icon: mango },
    { text: "mango", icon: lemon },
    { text: "456", icon: mango },
    { text: "Mohamed", icon: lemon },
    { text: "apple", icon: lemon },
    { text: "banana", icon: mango },
    { text: "orange", icon: lemon },
    { text: "grape", icon: mango },
    { text: "watermelon", icon: lemon }, 
  ];
  const icons = [mango, lemon];
  const [text, setText] = useState("");
  const [items, setItems] = useState(DATA);
  const [selectedId, setselectedId] = useState(undefined);
  const [iconIndex, setIconIndex] = useState(0);
  const addItem = () => {
    // items.push({text:text});
    if (text) {
      setItems([
        ...items,
        { text: text, icon: icons[iconIndex], id: text + items.length, isDone:false },
      ]);
      setIconIndex((iconIndex + 1) % 2);
    }
  };
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  const searchItems = (searchFor) => {
    console.log('searchFor', searchFor);
    setItems(DATA.filter((item) => item.text.includes(searchFor) ));
  };  
  return (
    <View style={styles.top}>
      <View style={styles.top1}>
        {/* <Text>{text}</Text> */}
        <View style={styles.sideBySide}>
          <TextInput
            style={styles.input}
            placeholder="Search for"
            onChangeText={(t) => {setText(t); searchItems(t)}}
          />
          <MyButton color="red" onPress={()=>searchItems(text)}>
            {({ pressed }) => (
              <Text style={styles.text}>{pressed ? "Searching" : "Search"}</Text>
            )}
          </MyButton>
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={items}
        // keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Item
            text={item.text}
            iconSrc={item.icon}
            isDone={item.isDone}
            onPress={() => deleteItem(index)}
            isSelected={selectedId === item.id}
            onSelected={() => setselectedId(item.id)}
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
