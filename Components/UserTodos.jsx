import { FlatList, StyleSheet, Text, TextInput, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Itemcheckbox from "./Itemcheckbox";
import MyButton from "./MyButton";
import User from "./User";

export default function UserTodos({userId}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedId, setselectedId] = useState(undefined);
  const [searchFor, setSearchFor] = useState("");
  let Data=[];

  const getUsersTodos = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
      const json = await response.json();
      setData(json);
      Data=json;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersTodos();
  }, []);

  const deleteItem = (index) => {
    setData(data.filter((_, i) => i !== index));
  };
  const searchItems = (searchFor) => {
    console.log('searchFor', searchFor);
    setData(Data.filter((item) => item.title.includes(searchFor) ));
  }; 
  return( 
    <View style={styles.top}>
      {/* <View style={styles.top1}>
        <View style={styles.sideBySide}>
          <TextInput
            style={styles.input}
            placeholder="Search for"
            onChangeText={(t) => {
              setSearchFor(t);
              searchItems(t);
            }}
          />
          <MyButton color="red" onPress={() => searchItems(searchFor)}>
            {({ pressed }) => (
              <Text style={styles.text}>
                {pressed ? "Searching" : "Search"}
              </Text>
            )}
          </MyButton>
        </View>
      </View> */}
      <User userId={userId}/>
      {isLoading ? (
    <ActivityIndicator />
  ) : (<FlatList
        style={styles.list}
        data={data}
        // keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Itemcheckbox
            text={item.title}
            isDone={item.completed}
            onPress={() => deleteItem(index)}
            isSelected={selectedId === item.id}
            onSelected={() => setselectedId(item.id)}
          />
        )}
      />)}
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
