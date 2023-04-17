import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const MyMenteePage = ({navigation}) => {
  const [mentee, setMentee] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
  
    const unsubscribeMatches = db.collection("matches")
      .where("mentorId", "==", firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No match found for this mentor");
          return;
        }
  
        const match = querySnapshot.docs[0].data();
        const menteeId = match.menteeId;
  
        // Retrieve user from "users" collection using menteeId
        db.collection("users")
          .doc(menteeId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const menteeData = doc.data();
              setMentee(menteeData);
            } else {
              console.log("Mentee user not found in database");
            }
          })
          .catch((error) => {
            console.log("Error getting mentee user: ", error);
          });
      }, (error) => {
        console.log("Error getting match: ", error);
      });
  
    return () => {
      unsubscribeMatches();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Mentee</Text>
      {mentee ? (
    <>
      {mentee.photoURL ? (
        <Avatar.Image
          source={{ uri: mentee.photoURL }}
          size={150}
          style={styles.avatar}
        />
      ) : (
        <Avatar.Image
          source={{ uri: "https://via.placeholder.com/200" }}
          size={150}
          style={styles.avatar}
        />
      )}
      <Text style={styles.name}>Mentee Name: {mentee.name}</Text>
      <Text style={styles.email}>Mentee Email: {mentee.email}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("View Profile", { user: mentee })}
        style={styles.button}
      >
        View Profile
      </Button>
    </>
  ) : (
    <Text style={styles.noMentee}>No mentee selected</Text>
  )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
});

export default MyMenteePage;
