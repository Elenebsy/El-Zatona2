import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  TextInput,
} from "react-native";

export default function PressableVsButton() {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter your name"></TextInput>
      <Pressable style={styles.logBox} onPress={(e) => alert("hi")}>
        <Text>Click here</Text>
      </Pressable>
      <TextInput placeholder="Enter your name"></TextInput>
      <Pressable
        onPress={() => {
          alert("title + message");
        }}
        style={({ pressed }) => [
          {
            backgroundColor: "rgb(33, 150, 243)",
            opacity: pressed ? 0.2 : 1,
          },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.text}>{pressed ? "Pressed!" : "CLICK HERE"}</Text>
        )}
      </Pressable>
      <TextInput placeholder="Enter your name"></TextInput>
      <Button title="click here" onPress={(e) => alert("hi")}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: "white",
    fontFamily:
      "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
  },
  wrapperCustom: {
    borderRadius: 2,
    padding: 8,
  },
});
