import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const MyMenteePage = () => {
  const [mentee, setMentee] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection("matches")
      .where("mentorId", "==", firebase.auth().currentUser.id)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No match found for this mentor");
          return;
        }
        const match = querySnapshot.docs[0].data();
        setMentee({
          name: match.menteeName,
          email: match.menteeEmail,
          photoURL: match.menteePhotoURL,
        });
      }, (error) => {
        console.log("Error getting match: ", error);
      });
  
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Mentee</Text>
      {mentee ? (
        <>
          <Avatar.Image size={150} source={{ uri: mentee.photoURL }} />
          <Text style={styles.name}>Mentee Name:{mentee.name}</Text>
          <Text style={styles.email}>Mentee Email:{mentee.email}</Text>
          <Button mode="elevated" onPress={() => navigation.navigate("View Profile", {user:mentee})}>
            View Profile
        </Button>
        </>
      ) : (
        <Text>No mentee assigned yet.</Text>
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
