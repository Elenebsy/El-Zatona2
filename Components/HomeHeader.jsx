import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { Image } from 'expo-image';
import { useAuth } from "../context/authContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItems } from "./CustomMenuItems";
import { Feather, AntDesign } from "@expo/vector-icons";
const ios = Platform.OS === "ios";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function HomeHeader() {
  const { top } = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleProfile = () => {

  }

  const handleLogout = async () => {
    await logout();
  }
  return (
    <View style={{ ...styles.container, paddingTop: ios ? top : top + 15 }}>
      <View>
        <Text style={styles.text} >Chats</Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger customStyles={{ triggerWrapper: {} }} >
            <Image
              style={styles.image}
              source={user?.profileUrl}
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={
              {
                optionsContainer: {
                  borderRadius: 10,
                  borderCurve: 'continuous',
                  marginTop: 30,
                  marginLeft: -30,
                  backgroundColor: 'white',
                  shadowOpacity: 0.2,
                  shadowOffset: { width: 0, height: 10 },
                  width: 168,
                }
              }}>
            <MenuItems
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
            />
            <Divider />
            <MenuItems
              text="Sign Out"
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
            />

          </MenuOptions>
        </Menu>

      </View>
    </View>
  );
}
const Divider = () => {
  return (
    <View
      style={{
        borderBottomColor: "gray",
        borderBottomWidth: 1,
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    borderRadius: 10,
  },
  text: {
    fontSize: hp(3),
    color: "white",
    fontWeight: "bold",
    marginBottom: hp(1),
  },
  image: {
    height: hp(4.3),
    aspectRatio: 1,
    borderRadius: 100,
  }
})