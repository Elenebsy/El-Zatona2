import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import lemon from "../assets/lemon.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CourseItem({ item }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.box}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.code}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    margin: wp(3.5),
    marginBottom: wp(0),
    height: hp(8),
  },
  box: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // margin: wp
    width: wp(90),

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",

  }
});


