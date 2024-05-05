import React from "react";
import { View , Text , StyleSheet , TextInput } from "react-native";
export default function Setting(){

    return(
        <View style={Styles.container}>
            <Text>Setting</Text>
        </View>
    )
};
const Styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }

})