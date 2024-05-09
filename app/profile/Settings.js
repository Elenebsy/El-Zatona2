import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Image } from 'react-native';
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { getUserById } from '../../firebase/review';

const EditProfilePage = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById();
        if (!userData) {
          console.error("User data not found, cannot edit profile.");
          return;
        }
        setUser(userData);
        setName(userData.name || '');
        setEmail(userData.email || '');
        setBirthday(userData.birthday || '');
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSaveProfile = async () => {
    
    try {
      
      console.log('Saving profile:', { name, email, birthday });
      
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/course')}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </Pressable>
        <Text style={styles.userName}>{user.name || "User Name"}</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Pressable onPress={() => console.log("Avatar pressed")}>
          <Image source={user.avatar || require('../../assets/users.png')} style={styles.avatar} />
        </Pressable>
      </View>

      <View style={styles.box}>
        <InfoBox icon="calendar" label="Birthday" value={birthday} onChangeText={setBirthday} />
        <InfoBox icon="phone" label="Phone" value={user.phone || "222-222-222"} onChangeText={setPhone} />
        <InfoBox icon="map-marked-alt" label="Address" value={user.address || "N/A"} onChangeText={setAddress} />
        <InfoBox icon="mail" label="Email" value={email || "user@"} onChangeText={setEmail} />
        <InfoBox icon="admin-panel-settings" label="Admin" value={user.admin || "You are a normal user"} onChangeText={setAdmin} />
      </View>

      <View style={styles.box}>
        <Pressable style={styles.editButton} onPress={handleSaveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

const InfoBox = ({ icon, label, value, onChangeText }) => (
  <View style={styles.infoBox}>
    <FontAwesome5 name={icon} size={30} color="blue" />
    <TextInput
      style={styles.infoText}
      placeholder={label}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: "blue",
    borderRadius: 22,
    textAlign: "center",
    alignContent: 'center',
  },
  userName: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
  avatar: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  avatarContainer: {
    alignItems: "center",
  },
  box: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoBox: {
    padding: 16,
    flexDirection: "row",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  infoText: {
    fontSize: 22,
    color: "black",
    marginLeft: 10,
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
    fontSize: 23,
    fontWeight: "bold",
  },
});

export default EditProfilePage;
