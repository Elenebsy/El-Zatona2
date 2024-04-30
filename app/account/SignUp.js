import { StyleSheet, View, Text, TextInput, Pressable, useWindowDimensions ,Image,ScrollView} from 'react-native';
import logo from '../../assets/logo.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { register } from '../../firebase/auth';


import React, { useState } from 'react';
import { useRouter,Link } from 'expo-router';

const Welcome = () => {
 const router = useRouter();
 const [code, setCode] = useState('');
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [password, setPassword] = useState('');
 const handleSignUp = async() => {
   await register(email, password, name, phone, code);
   router.push('/');
   
  
 }
 

  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Create an Account</Text>

      <TextInput placeholder='Email' style={styles.input}  value={email} onChangeText={setEmail}/>
      <TextInput placeholder='Name' style={styles.input} value={name} onChangeText={setName}/>
      <TextInput placeholder='code' style={styles.input}  value={code} onChangeText={setCode}/>
      <TextInput placeholder='Phone' style={styles.input}  value={phone} onChangeText={setPhone} />  
      <TextInput placeholder='Password' style={styles.input}  value={password} onChangeText={setPassword}  secureTextEntry/>

     

      <Pressable style={styles.link} onPress={handleSignUp}  >
        <Text style={styles.linkText}>Sign Up</Text>
      </Pressable>
      <Pressable style={styles.tt} onPress={() => router.replace('/account')}>
        <Text  style={{ color: "blue" }}>Back To SignIn</Text>
      </Pressable>

      <Pressable style={styles.tt} onPress={() => router.push('/account/ForgetPassword')}>
        <Text style={{ color: "blue" }}>Forget Password?</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#1e1f26',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F2F2F2',
    width: "85%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
  },
  link: {
    backgroundColor: 'green',
    width: "50%",
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  linkText: {
    color: "white",
    fontSize: 16,
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  tt: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: "blue",
  },
  image: {
   width: wp(40),
   height: hp(40),
   
    


  }
});

export default Welcome;
