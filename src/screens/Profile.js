import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import ViewMentors from "./ViewMentors";
import LogoutScreen from "./Logout";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

export default function Profile({ route, navigation }) {
  const { user } = route.params;
  const [image, setImage] = useState(null);
  const Tab = createBottomTabNavigator();
  const fields = Object.entries(user).filter(
    ([key, value]) => key !== "id" && value !== null
  );
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // Convert the image to a blob
      const response = await fetch(result.uri);
      const blob = await response.blob();

      // Upload the image to Firebase Storage
      const imageName = result.uri.substring(result.uri.lastIndexOf("/") + 1);
      const uploadTask = firebase
        .storage()
        .ref()
        .child(`images/${imageName}`)
        .put(blob);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },
        async () => {
          // Get the download URL for the image and set it in the state
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          setImage(downloadURL);

          // Update the user's document with the download URL of the image
          const currentUser = firebase.auth().currentUser;
          firestoreRef = firebase.firestore();
          if (currentUser) {
            const userRef = firestoreRef
              .collection("users")
              .doc(currentUser.uid);
            await userRef.update({ photoURL: downloadURL });
          }
        }
      );
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={{ width: 150, height: 150, borderRadius: 75 }}
      />
      {/* <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>{user.name}</Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>{user.bio}</Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>Role: {user.value}</Text> */}
      {fields.map(([key, value]) => (
        <View key={key}>
          <Text style={{ fontSize: 24, marginTop: 10 }}>
            {key}: {value}
          </Text>
        </View>
      ))}
    
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}

      <Button mode="contained" onPress={pickImage}>
        Upload an image
      </Button>

      
      {user.value === "mentee" ? (
        <>
          <Button
    
            mode="contained"
            onPress={() => navigation.navigate("ViewMentors")}
          >
            View Mentors
          </Button>
          <Button

            mode="contained"
            onPress={() => navigation.navigate("Preferences", { user })}
          >
            Select Preferences
          </Button>
        </>
      ) : (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("ViewMentees")}
        >
          View Mentees
        </Button>
      )}
    </View>
  );
}
