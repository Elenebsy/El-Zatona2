import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export const MenuItems = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={() => action(value)} >
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        {icon}
      </View>
    </MenuOption>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  text: {
    fontSize: hp(1.7),
    color: "black",
  },
})