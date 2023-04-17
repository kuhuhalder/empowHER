import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Avatar } from "react-native-paper";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function MatchPage({navigation}) {
  const [match, setMatch] = useState(null);
  const [mentor, setMentor] = useState(null);


  useEffect(() => {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const query = db.collection("matches").where("menteeId", "==", currentUser.uid);
  
    const unsubscribe = query.onSnapshot((querySnapshot) => {
      const matches = [];
      querySnapshot.forEach((doc) => {
        matches.push({ id: doc.id, ...doc.data() });
      });
      if (matches.length > 0) {
        setMatch(matches[0]);
      } else {
        setMatch(null);
      }
    }, (error) => {
      console.log("Error getting matches: ", error);
    });
  
    return unsubscribe;
  }, []);

  const handleMatchPress = () => {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const query = db.collection("users")
      .doc(currentUser.uid);
  
    query.get().then((doc) => {
      if (doc.exists) {
        const currentUserData = doc.data();
        const menteeClasses = currentUserData.classes || [];
        const mentorQuery = db.collection("users")
          .where("role", "==", "mentor")
          .where("classes", "array-contains-any", menteeClasses)
          .limit(1);
  
        mentorQuery.get().then((mentorQuerySnapshot) => {
          const mentors = [];
          mentorQuerySnapshot.forEach((doc) => {
            mentors.push({ uid: doc.id, ...doc.data() });
          });
  
          if (mentors.length > 0) {
            const mentor = mentors[0];
            setMentor(mentor);
            const match = {
              menteeId: currentUser.uid,
              mentorId: mentor.id,
              menteeName: currentUserData.name,
              mentorName: mentor.name,
              menteeEmail: currentUserData.email,
              mentorEmail: mentor.email,
              menteePhotoURL: currentUserData.photoURL,
              mentorPhotoURL: mentor.photoURL,
              createdAt: firebase.firestore.Timestamp.now(),
            };
            db.collection("matches")
              .add(match)
              .then((docRef) => {
                console.log("Match added with ID: ", docRef.id);
                setMatch(match);
              })
              .catch((error) => {
                console.error("Error adding match: ", error);
              });
          } else {
            console.log("No mentors found with matching classes");
          }
        }).catch((error) => {
          console.error("Error getting mentors: ", error);
        });
      } else {
        console.log("User data not found");
      }
    }).catch((error) => {
      console.error("Error getting user data: ", error);
    });
  };

  return (
    <View style={styles.container}>
    {match ? (
      <View style={styles.matchContainer}>
        <Text style={styles.title}>Here is your mentor Information</Text>
        {match.photoURL ? (
          <Avatar.Image
            source={{ uri: mentor.photoURL }}
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
        <Text style={styles.name}>Mentor: {match.mentorName}</Text>
        <Text style={styles.email}>Mentor Email: {match.mentorEmail}</Text>
      </View>
    ) : (
      <View style={styles.noMatchContainer}>
        <Text style={styles.title}>No match found</Text>
        <Text style={styles.text}>Finding a mentor...</Text>
      </View>
    )}
    <Button
      mode="contained"
      style={styles.button}
      onPress={handleMatchPress}
    >
      Get another match
    </Button>
    <Button
      mode="contained"
      style={styles.button}
      onPress={() => navigation.navigate("View Profile", { user: mentor })}
    >
      View Profile
    </Button>
  </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  matchContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  noMatchContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,

  },
  text: {
    fontSize: 16,
    marginBottom: 5,
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
  avatar: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 15,
    marginTop: 10,
    width: "80%",
  },
});

