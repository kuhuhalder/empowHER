import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const ViewProfilePage = ({route}) => {
const { user } = route.params;

//   useEffect(() => {
//     const usersRef = firebase.firestore().collection("users");
//     usersRef
//       .doc(user.id)
//       .get()
//       .then((doc) => {
//         if (doc.exists) {
//           setUser(doc.data());
//         } else {
//           console.log("No such document!");
//         }
//       })
//       .catch((error) => {
//         console.log("Error getting document:", error);
//       });
//   }, []);

//   if (!user) {
//     return null;
//   }

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>{user.name}</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Year:</Text>
        <Text style={styles.value}>{user.year}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Major:</Text>
        <Text style={styles.value}>{user.major}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Classes taken:</Text>
        <Text style={styles.value}>{user.classes}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Preferred Campus:</Text>
        <Text style={styles.value}>{user.campus}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Clubs part of:</Text>
        <Text style={styles.value}>{user.clubs}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Interests:</Text>
        <Text style={styles.value}>{user.interests}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Skills:</Text>
        <Text style={styles.value}>{user.skills}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.value}>{user.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#555555",
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontWeight: "bold",
    width: 100,
    marginRight: 10,
    color: "#555555",
  },
  value: {
    flex: 1,
    color: "#333333",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 20,
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});



export default ViewProfilePage;
