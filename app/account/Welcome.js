import { StyleSheet ,View,Text,Image,useWindowDimensions,Pressable ,ScrollView} from 'react-native'
import React from 'react'
import Education from '../../assets/logo.png'
import { Link , router, useRouter} from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Welcome = ({navigation} ) => {
  const {height} = useWindowDimensions();
  const router = useRouter();
 
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={Education} style={styles.Education}/>
      <Text style={styles.title}>El_Zatona <Text style={styles.span}>Market</Text> For Everything</Text>
      <Text style={styles.text}>It is long established fact that reader distracted by the readable content</Text>
      <Pressable style={styles.button} onPress={() => router.push('/account/')}  >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push('/account/helpandsupportpage')}  >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
     
      
    
    </View>
    </ScrollView>
  );
} 
const styles = StyleSheet.create({
container : {
  flex:1,
  alignItems:'center',
  backgroundColor:"white",
},
Education : {
  width:wp(100),
    height:hp(50),
    resizeMode:"contain",
    justifyContent:"flex-start",
  top:hp(5)

},
title : {
  fontWeight : "bold",
  fontSize : 50  ,
  color : "#1e1f26",
  marginBottom:10 ,
},
span : {
  color : "green"
},
text : {
  fontSize : 20  ,
  color : "#3A3967"
},
button: {
  backgroundColor: 'green',
  width: "60%",
  alignItems: "center",
  height: 40,
  justifyContent: "center",
  marginTop: 15,
  borderRadius: 5,
},
buttonText: {
  color: "white",
  fontSize: 16,
},
});
export default Welcome 