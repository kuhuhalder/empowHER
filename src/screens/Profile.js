import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import ViewMentors from "./ViewMentors";
import LogoutScreen from "./Logout";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";
export default function Profile({ route, navigation }) {
  // const { user } = route.params;
  const [image, setImage] = useState(null);
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState(route.params.user);
  console.log("profile: ", user)
  const [loading, setLoading] = useState(true);

  const fields = Object.entries(user).filter(
    ([key, value]) =>
      key !== "id" &&
      value !== null &&
      key != "role" &&
      key != "name" &&
      key != "photoURL" && key!="classes"
  );

  const refreshButton = () => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const user = doc.data();
              setUser(user);
              setLoading(false);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        console.log("No user is signed in.");
      }
    });
  };

  // useEffect(() => {
  //   const db = firebase.firestore();
  //   const unsubscribe = db
  //     .collection("users")
  //     .doc(user.id)
  //     .onSnapshot(
  //       (docSnapshot) => {
  //         const updatedUser = {
  //           ...docSnapshot.data(),
  //           id: docSnapshot.id,
  //         };
  //         setUser(updatedUser);
  //         setLoading(false);
  //       },
  //       (error) => {
  //         console.log("Error fetching user: ", error);
  //         setLoading(false);
  //       }
  //     );
  //   return () => unsubscribe();
  // }, [user]);
  

  //   const [loading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      setUser(JSON.parse(user));
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      // Convert the image to a blob
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      // Upload the image to Firebase Storage
      const imageName = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1
      );
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
          const firestoreRef = firebase.firestore();
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
    AsyncStorage.removeItem("user");
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
        {/* {user.photoURL && (
          <Image source={{ uri: user.photoURL }} style={{ width: 200, height: 200, borderRadius:100, alignSelf: "center" }} />
        )}
 */}

        <Button
          mode="elevated"
          style={{ marginVertical: 10 }}
          onPress={refreshButton}
        >
          Refresh{" "}
        </Button>
        {user.photoURL ? (
          <Image
            source={{ uri: user.photoURL }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              alignSelf: "center",
            }}
          />
        ) : (
          <Image
            source={{ uri: "https://via.placeholder.com/200" }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              alignSelf: "center",
            }}
          />
        )}
        <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 20 }}>
          {user.name}

        </Text>
        <Text style={{ fontSize: 24, marginTop: 10, marginBottom:10 }}>Role: {user.role}</Text>
        {user.classes && user.classes.length > 0 &&
  <>
    <Text style={styles.classesTitle}>Classes Taken:</Text>
    {user.classes.map((classItem, index) => (
      <Text key={index} style={styles.classItem}>{classItem}</Text>
    ))}
  </>
}

      {fields.map(([key, value]) => (
          <View key={key}>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              {key}: {value}
            </Text>
          </View>
        ))}

        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}

        <Button
          mode="elevated"
          style={{ marginVertical: 10 }}
          onPress={pickImage}
        >
          Upload an image
        </Button>

        {user.role == "mentee" ? (
          <>
            <Button
              mode="elevated"
              style={{ marginVertical: 10 }}
              onPress={() => navigation.navigate("My Mentor")}
            >
              My Mentor
            </Button>

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
              Add Notes
            </Button>
          </>
        ) : (
          <>
            <Button
              mode="elevated"
              style={{ marginVertical: 10 }}
              onPress={() =>
                navigation.navigate("Add More Information", { user })
              }
            >
              Add More Information
            </Button>
            <Button
              mode="elevated"
              style={{ marginVertical: 10 }}
              onPress={() => navigation.navigate("My Mentee")}
            >
              My Mentee
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
          onPress={() => navigation.navigate("Resources")}
        >
          Resources{" "}
        </Button>
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

const styles = StyleSheet.create({
  classesContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  classesTitle: {
    fontSize: 20,
    marginRight: 10,
  },
  classItem: {
    fontSize: 18,
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
  },
});
