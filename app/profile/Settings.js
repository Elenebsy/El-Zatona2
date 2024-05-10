import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../../firebase/Config';
import { getUserById } from "../../firebase/review";
import { updateuser } from '../../firebase/auth';
import { useRouter } from 'expo-router';

const EditProfileScreen = () => {
  const currentUser = auth.currentUser;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [userDataFetched, setUserDataFetched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const user = await getUserById(currentUser.uid);
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setAddress(user.address);
      setBirthday(user.birthday);
      setUserDataFetched(true);
    }
  };

  const updateUserProfile = async () => {
    await updateuser({
      name,
      phone,
      address,
      birthday
    });
    router.replace('/profile/profile'); 

    Alert.alert('Profile Updated', 'Your profile has been successfully updated!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      {userDataFetched ? (
        <>
          <TextInput
            style={styles.input}
            placeholder={`Name: ${name}`}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder={`Phone: ${phone}`}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder={`Address: ${address}`}
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder={`Birthday (YYYY-MM-DD): ${birthday}`}
            value={birthday}
            onChangeText={setBirthday}
            keyboardType="numeric"
          />
          <Button title="Update Profile" onPress={updateUserProfile} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default EditProfileScreen;
