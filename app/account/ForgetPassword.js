import { StyleSheet, View, Text, TextInput, Pressable, Alert,Image ,ScrollView} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import logo from '../../assets/logo.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Welcome = () => {
  const router = useRouter();
  
 
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Enter your email below to receive password reset instructions.</Text>

      <TextInput 
        placeholder='Email' 
        style={styles.input} 
      
    
        keyboardType="email-address" 
        autoCapitalize="none"
      />
      <Pressable style={styles.button} >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      <Pressable style={styles.link} onPress={() => router.push('/account')}>
        <Text style={styles.linkText}>Back to Sign Up</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#1e1f26',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'green',
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  link: {
    textDecorationLine: 'underline',
  },
  linkText: {
    color: 'blue',
    fontSize: 16,
  },
  image: {
    width:wp(70),
    height:hp(40),

   
   
  }
});

export default Welcome;
