import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import CourseItem from "../../Components/CourseItem";
import MyButton from "../../Components/MyButton";
import { storage } from "../../firebase/Config";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  updateMetadataquery,
  getDownloadURL,
  getStorage,
  getMetadata,
  listAll,
  deleteObject,
  list,
  updateMetadata,
  uploadString,
} from "firebase/storage";
import { utils } from "@firebase/app";
import uploadToFirebase from "../../firebase/course";
import * as ImagePicker from "expo-image-picker";

import * as DocumentPicker from "expo-document-picker";

export default function Course() {
  const router = useRouter();
  const [image, setImage] = useState([]);
  const [course, setCourse] = useState([
    {
      id: 1,
      code: "course",
      name: "course",
      description: "course",
      image: "course",
      price: 1,
      rating: 1,
      category: "course",
    },
    {
      id: 2,
      code: "course",
      name: "course",
      description: "course",
      image: "course",
      price: 1,
      rating: 1,
      category: "course",
    },
  ]);

  // const handleUpLoadFile = async () => {
  //   const result = await DocumentPicker.getDocumentAsync();

  //   if (!result) return;
  //   console.log(result);

  //   const storageRef = ref(storage, result.assets[0].name);

  //   try {
  //     const response = await uploadBytes(storageRef, result.target.file)
  //       .then(() => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //     console.log(response);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const handleUpLoadFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("result", result);

      //

      const { uri, name } = result;

      const fetchResult = (await fetch(uri)).blob();

      console.log("uri, name", uri, name);

      // Get Firebase Storage reference
      const storageRef = ref(getStorage(), name);

      console.log("storageRef", storageRef);

      // Upload file to Firebase Storage
      await uploadBytes(storageRef, fetchResult);

      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text>Course</Text>
      <Pressable onPress={() => router.push("/account/Welcome")}>
        <Text>List</Text>
        </Pressable>
      <Pressable onPress={() => router.push("/profile/profile")}>
        <Text>profile</Text>
        </Pressable>
=======
      {/* <FlatList
        style={{ width: "100%" }}
        data={course}
        renderItem={({ item }) => <CourseItem item={item} />}
      ></FlatList> */}

      <MyButton onPress={handleUpLoadFile}>MyButton</MyButton>
>>>>>>> El3nbsy
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
});

// import React, { useEffect } from "react";
// import { View, Button } from "react-native";

// import { utils } from "@firebase/app";
// import storage from "@firebase/storage";

// export default function Course() {
//   // create bucket storage reference to not yet existing image
//   const reference = storage().ref("black-t-shirt-sm.png");

//   return (
//     <View>
//       <Button
//         onPress={async () => {
//           // path to existing file on filesystem
//           const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
//           // uploads file
//           await reference.putFile(pathToFile);
//         }}
//       />
//     </View>
//   );
// }
