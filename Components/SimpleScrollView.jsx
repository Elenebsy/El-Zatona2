import { StatusBar } from "expo-status-bar";
// import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import Item from "./Item";
import lemon from "../assets/lemon.png";
import mango from "../assets/mango.png";

export default function SimpleScrollView() {
  const initialValue = [
    { text: "1234", icon: lemon },
    { text: "lemon", icon: mango },
    { text: "mango", icon: lemon },
    { text: "456", icon: mango },
    { text: "Mohamed", icon: lemon },
    { text: "1234", icon: lemon },
    { text: "lemon", icon: mango },
    { text: "mango", icon: lemon },
    { text: "456", icon: mango },
    { text: "Mohamed", icon: lemon },
  ];
//   const [arrOfObjects, setArrOfObjects] = useState([]);
//   useEffect(() => {
//     AsyncStorage.getItem("todos")
//     .then((value) => {
//       if (!value) {
//         setArrOfObjects(initialValue);
//         AsyncStorage.setItem("todos", JSON.stringify(arrOfObjects));
//       } else setArrOfObjects(JSON.parse(value));
//     })
//     .catch((err) => {
//       console.error("error", err);
//       setArrOfObjects(initialValue);
//     });
  
//     return () => {
//       alert("Unmounting");
//     }
//   }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>First App</Text>
      <ScrollView contentContainerStyle={styles.items}>
        {initialValue.map((e, index) => (
          <Item text={e.text} iconSrc={e.icon} key={index} />
        ))}
      </ScrollView>
      {/* <ScrollView contentContainerStyle={styles.items}>
        {arr.map((e, index) => (
          <Item text={e} iconSrc={index % 2 === 0 ? lemon : mango} />
        ))}
      </ScrollView> */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "stretch",
    // justifyContent: "flex-start",
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    // paddingTop: 80,
    fontSize: 24,
  },
  items: {
    // backgroundColor: "green",
    padding: 2,
    borderWidth: 1
  },
});
