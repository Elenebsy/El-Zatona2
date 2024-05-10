import { View , Text , StyleSheet, TouchableOpacity,Image , TextInput  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { React , useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";


// const SearchBar = () => (
//     <View style={styles.SearchContainer}>
//       <View style={styles.SearchBar}>
//         <View style={styles.SearchBarInput}>
//           <Ionicons style={styles.SearchIcon} name="search" size={24} color="#D3D3D3" />
//           <TextInput
//             style={styles.input}
//             placeholder="Search"
//             // onChangeText={(text) => {
//             //     setSearchQuery(text);
//             //     searchItems(text);
//             //   }}
//             //   value={searchQuery}
//           />
//         </View>
//         <Link href={'/'} asChild>
//           <TouchableOpacity style={styles.SearchFilter}>
//             <Ionicons name="options-outline" size={20} color="green" />
//           </TouchableOpacity>
//         </Link>
//       </View>
//     </View>
//   );

const CustomHeader = () => {


    const handleImagePress = () => {
        // Add your desired functionality here
        console.log('Image pressed');
    };

    return (


       <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <TouchableOpacity onPress={handleImagePress}>
            <Image  style = {styles.bike} source={require('../assets/images/delivery-bike.png')} />
         </TouchableOpacity>

        <TouchableOpacity style={styles.top}>
            <Text style={styles.title}>Delivering to</Text>
            <View style={styles.Location}>
            <Text style={styles.secondTitle}>Current Location</Text>
            <Ionicons name="chevron-down" size={20} color="green" />
            </View>

        </TouchableOpacity>

        <TouchableOpacity style={styles.profile}>
        <Ionicons name="person-outline" size={24} color="green" />
        </TouchableOpacity>
        </View>
      {/*<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchItems={searchItems} />*/}
       </SafeAreaView>


     );
    }

    const styles = StyleSheet.create({
        safeArea:{
            flex:1,
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
            fontSize:14,
            color:'#D3D3D3',
         //    gap:20,
        },
        secondTitle:{
            fontSize:16,
            fontWeight:'bold',
            color:'#000',

        },
        Location:{
            flexDirection:'row',
            alignItems:'center',
            gap:5,

        },
        profile:{
          padding:5,
          borderRadius:50,
            // width:30, 
            // height:30,
        },
        SearchContainer:{
            height:60, 
            backgroundColor: '#fff',
        },
        SearchBar:{
            height:40,
            color:'#fff',
            // borderRadius:10,
            // marginHorizontal:20,
            flexDirection:'row',
            gap:10,
            alignItems:'center',
             paddingHorizontal:10,
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