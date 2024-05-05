import React,{useEffect, useState} from "react";
import { View,ScrollView, Text, Image, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Photo from "../../assets/users.png";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import {getUserById} from "../../firebase/review";
import { MaterialIcons } from '@expo/vector-icons';







const UserProfile = () => {
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById();
        if (!userData) {
          console.error("User data not found, cannot post comment.");
          return;
        }
        console.log("userData1", userData);
        setUser(userData);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the asynchronous function inside useEffect

    // Add dependencies if needed
  }, []); // Empty dependency array means it will only run once after the initial render




  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/course')}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </Pressable>
        <Text style={styles.userName}>{user.name || "user name"}</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Pressable onPress={() => console.log("avatar pressed")}>
          <Image source={Photo} style={ user.avatar || styles.avatar} />
        </Pressable>
      </View>

      {/* User Information */}
      <View style={styles.box}>
        <View style={styles.infoBox}>
          <AntDesign name="calendar" size={24} color="blue" value={user.birthday || "N/A"} />
          <Text style={styles.infoText}  >       {user.birthday || "birthday"} </Text>
        </View>
        <View style={styles.infoBox}>
          <AntDesign name="phone" size={24} color="blue" />
          <Text style={styles.infoText}>       {user.phone || "222-222-222"} </Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesome5 name="map-marked-alt" size={24} color="blue" />
          <Text style={styles.infoText}>      {user.address || "N/A"} </Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <AntDesign name="mail" size={24} color="blue" />
            <Text style={styles.infoLabel}> </Text>      {user.email || "user@"} </Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="admin-panel-settings" size={24} color="blue" />
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}> </Text>      {user.admin || "You are normal user"}</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <View style={styles.box}>
        <Pressable
          style={styles.editButton}
          onPress={() => router.push('/profile/Settings')}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
const InfoBox = ({ icon, label, value }) => (
  <View style={styles.infoBox}>
      <FontAwesome5 name={icon} size={24} color="green" />
      <Text style={styles.infoText}>{label}: {value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light gray background
    padding: 16,
    display: "flex",
  },
  box: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3, // Add elevation for shadow (Android)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: "green",
    borderRadius: 22,
  },
  userName: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    // marginLeft: 85,
    textAlign: "center",
    // alignContent: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 8,
    // marginLeft: 50,
  },
  avatarContainer: {
    alignItems: "center",
  },
  infoBox: {
    // marginBottom: 8,
    padding: 16,
    flexDirection: "row",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  infoText: {
    fontSize: 18,
    color: "black", // Black text color
  },
  infoLabel: {
    fontWeight: "bold",
    color: "purple", // Purple label color
  },
  editButton: {
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 22,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserProfile;
