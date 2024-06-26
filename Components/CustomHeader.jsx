import { View , Text , StyleSheet, TouchableOpacity , TextInput  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import  React, {useState , useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from "expo-router";

import { getUserById } from '../firebase/review';
const CustomHeader = () => {
    const [user, setUser] = useState({});

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
    
        fetchData();
        // Add dependencies if needed
      }, []);

    const router = useRouter();


    const handleShoppingCartPress = () => {
        router.push("/cart");
      };

      const handleProfilePress = () => {
        router.push("/profile/profile");
        };
const handleWelcomePress = () => {
    router.push("/(products)");
    }

    return (


       <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <TouchableOpacity onPress={handleShoppingCartPress} >
          <FontAwesome5 name="shopping-cart" size={24} color="black"  />
         </TouchableOpacity>

                <TouchableOpacity style={styles.top} onPress={handleWelcomePress}>
                    <Text style={styles.title}>Welcome again </Text>
                    <View style={styles.Location}>
                        <Text style={styles.secondTitle}>{user.name}</Text>
                    </View>

                </TouchableOpacity>

        <TouchableOpacity style={styles.profile} onPress={handleShoppingCartPress} >
        <Ionicons name="person-outline" size={24} color="green" onPress={() => router.replace('/profile/profile')} />
        </TouchableOpacity>
        </View>
       </SafeAreaView>


     );
    }

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',

        },
        container: {    
            height:70, 
            backgroundColor: '#fff', 
            flexDirection:'row',
             gap:20,
             alignitem:'center',   
             justifyContent:'space-between',
             paddingHorizontal:15,
             paddingTop:15,
        },
        bike:{
            width:30, 
            height:30,
            
            
        },
        top:{
           flex:1,
        },
        title:{
            fontSize:16,
            color:'#D3D3D3',
         //    gap:20,
        },
        secondTitle:{
            fontSize:20,
            fontWeight:'bold',
            color:'#000',

    },
    Location: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,

    },
    profile: {
        padding: 5,
        borderRadius: 50,
        // width:30, 
        // height:30,
    },
    SearchContainer: {
        height: 60,
        backgroundColor: '#fff',
    },
    SearchBar: {
        height: 40,
        color: '#fff',
        // borderRadius:10,
        // marginHorizontal:20,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
    },

        SearchBarInput:{
            flex:1,
            backgroundColor: '#f4f5f5',
            borderRadius:10,
            fontSize:16,
            flexDirection:'row',
            alignItems:'center',
            color:'#000',
           
        },
        SearchFilter:{
            marginLeft:10,
        },
        input:{
            padding:10,
            width:'100%',
            color:'#424242',
        },
        SearchIcon:{ 
            paddingLeft:10,
        }
        ,
        
    });

export default CustomHeader;