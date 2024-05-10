import { View, Text, StyleSheet, Pressable, Image } from "react-native";

export default function ChatItem(item, index) {
  return (
    <View style={styles.container} >
      <Pressable>
        <Image source={item.image} style={{ width: 50, height: 50 }} />
      </Pressable>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },

})