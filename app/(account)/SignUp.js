import { StyleSheet, View, Text, TextInput, Pressable, useWindowDimensions ,Image,ScrollView,Alert} from 'react-native';
import logo from '../../assets/supermarketlogo.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { register } from '../../firebase/auth';
import { FontAwesome6,Fontisto  } from '@expo/vector-icons';


import React, { useState } from 'react';
import { useRouter,Link } from 'expo-router';

const Welcome = () => {
 const router = useRouter();
 const [code, setCode] = useState('');
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [password, setPassword] = useState('');
 const handleSignUp = async () => {
  try {
    await register(email, password, name, phone, code);
   
    router.push('/(products)');
  } catch (error) {
    Alert.alert("failed", error.message);
    console.log("check your email and password");
  }
}
 

  return (
    <ScrollView>
      <Text style={{ fontSize: 30, fontWeight: "bold" ,textAlign:"center",color:"green",marginBottom:-20}}>Create an Account</Text>
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      

      <TextInput placeholder='Email' style={styles.input}  value={email} onChangeText={setEmail}/>
      <TextInput placeholder='Name' style={styles.input} value={name} onChangeText={setName}/>
      <TextInput placeholder='code' style={styles.input}  value={code} onChangeText={setCode}/>
      <TextInput placeholder='Phone' style={styles.input}  value={phone} onChangeText={setPhone} />  
      <TextInput placeholder='Password' style={styles.input}  value={password} onChangeText={setPassword}  secureTextEntry/>

      <Pressable style={styles.tt} onPress={() => router.push('/(account)/ForgetPassword')}>
        <Text style={{ color: "blue" }}>Forget Password?</Text>
      </Pressable>

      <Pressable style={styles.link} onPress={handleSignUp}  >
        <Text style={styles.linkText}>Sign Up</Text>
      </Pressable>
      <Pressable style={{marginTop:10}} onPress={() => router.replace('/(account)/login')}>
        <Text  style={{ color: "blue" }}>Back To SignIn</Text>
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
    width: "100%",
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
    fontSize: 20,
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
   width: wp(80),
   height: hp(30),
   
    


  },
  tt: {
    alignSelf: "flex-start",
  }
});

export default Welcome;
