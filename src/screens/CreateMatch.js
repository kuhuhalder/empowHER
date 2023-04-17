import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function MatchPage({navigation}) {
  const [match, setMatch] = useState(null);
  const [mentor, setMentor] = useState(null);


  useEffect(() => {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const query = db.collection("matches")
      .where("menteeId", "==", currentUser.id);
  
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
  
    return () => unsubscribe().then(() => {
      console.log("Unsubscribed from matches");
    }).catch((error) => {
      console.log("Error unsubscribing from matches: ", error);
    });
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
          .where("value", "==", "mentor")
          .where("classes", "array-contains-any", menteeClasses)
          .limit(1);
  
        mentorQuery.get().then((mentorQuerySnapshot) => {
          const mentors = [];
          mentorQuerySnapshot.forEach((doc) => {
            mentors.push({ id: doc.id, ...doc.data() });
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
        <View>
          <Text style={styles.title}>Here is your mentor Information</Text>
          <Text style={styles.text}>Mentee: {match.menteeName}</Text>
          <Text style={styles.text}>Mentor: {match.mentorName}</Text>
          <Text style={styles.text}>Mentor Email: {match.mentorEmail}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>No match found</Text>
            <Text style={styles.text}>Finding a mentor...</Text>
        </View>
        )}
        <Button mode="elevated" style={{marginBottom:15}} onPress={handleMatchPress}>
            Get another match
        </Button>
        <Button mode="elevated" onPress={() => navigation.navigate("View Profile", {user:mentor})}>
            View Profile
        </Button>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

