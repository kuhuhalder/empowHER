import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import ViewMentors from "./ViewMentors";
import LogoutScreen from "./Logout";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Profile({ route, navigation }) {
  const { user } = route.params;
  const [image, setImage] = useState(null);
  const Tab = createBottomTabNavigator();
  const fields = Object.entries(user).filter(
    ([key, value]) => key !== "id" && value !== null && key!="value" && key!="name"
  );
  //   const [loading, setLoading] = useState(true);

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
              .doc(currentUser.id);
            await userRef.update({ photoURL: downloadURL });
          }
        }
      );
    }
  };

  // get all the info of the logged in user

  //   useEffect(() => {
  //     const usersRef = firebase.firestore().collection("users");
  //     firebase.auth().onAuthStateChanged((user) => {
  //         if (user) {
  //             usersRef
  //                 .doc(user.uid)
  //                 .get()
  //                 .then((document) => {
  //                     const userData = document.data()
  //                     setLoading(false)
  //                     setUser(userData)
  //                 })
  //                 .catch((error) => {
  //                     setLoading(false)
  //                 });
  //         } else {
  //             setLoading(false)
  //         }
  //     });
  // }, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Home");
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          //   source={{ uri: "https://via.placeholder.com/150" }}
          source={require("../../assets/woman.png")}
          style={{ width: 150, height: 150, borderRadius: 75 }}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>{user.name}</Text>
        <Text style={{ fontSize: 24, marginTop: 10 }}>Role: {user.value}</Text>
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

        <Button
          mode="elevated"
          style={{ marginVertical: 10 }}
          onPress={pickImage}
        >
          Upload an image
        </Button>

        {user.value === "mentee" ? (
          <>
          <Button
              mode="elevated"
              style={{ marginVertical: 10 }}
              onPress={() => navigation.navigate("View Match")}
            >
              View Mentor/ Match
            </Button>

            {/* <Button
              mode="elevated"
              style={{ marginVertical: 10 }}
              onPress={() => navigation.navigate("View Match")}
            >
              View Mentor/ Match
            </Button> */}

            <Button
              mode="elevated"
              style={{ marginVertical: 10 }}
              onPress={() => navigation.navigate("View Mentors")}
            >
              View Mentors
            </Button>
            <Button
              mode="elevated"
              style={{ marginVertical: 10 }}
              onPress={() => navigation.navigate("Preferences", { user })}
            >
              Select Preferences
            </Button>

            <Button
              mode="elevated"
              style={{ marginVertical: 10 }}
              onPress={() => navigation.navigate("Add Mentors", { user: user })}
            >
              Add To Dos
            </Button>
          </>
        ) : (
            <>
            <Button
            mode="elevated"
            style={{ marginVertical: 10 }}
            onPress={() => navigation.navigate("Add More Information", {user})}
          >
            Add More Information
          </Button>
          <Button
            mode="elevated"
            style={{ marginVertical: 10 }}
            onPress={() => navigation.navigate("View Mentees")}
          >
            View Mentees
          </Button>
          </>
        )}

        <Button
          mode="elevated"
          style={{ marginVertical: 10 }}
          onPress={handleLogout}
        >
          Logout{" "}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
