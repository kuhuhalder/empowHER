import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function MatchPage({ navigation }) {
  const [mentee, setMentee] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    const query = db.collection("users").where("value", "==", "mentee");

    const unsubscribe = query.onSnapshot(
      (querySnapshot) => {
        const mentees = [];
        querySnapshot.forEach((doc) => {
          mentees.push({ id: doc.id, ...doc.data() });
        });
        setMentee(mentees[Math.floor(Math.random() * mentees.length)]);
      },
      (error) => {
        console.log("Error getting mentees: ", error);
      }
    );

    return () =>
      unsubscribe()
        .then(() => {
          console.log("Unsubscribed from mentees");
        })
        .catch((error) => {
          console.log("Error unsubscribing from mentees: ", error);
        });
  }, []);

  useEffect(() => {
    if (mentee) {
      const db = firebase.firestore();
      const unsubscribe = db
        .collection("users")
        .where("value", "==", "mentor")
        .where("classes", "array-contains-any", mentee.classes)
        .get()
        .then((querySnapshot) => {
          const mentors = [];
          querySnapshot.forEach((doc) => {
            mentors.push({ id: doc.id, ...doc.data() });
          });
          setMentor(mentors[Math.floor(Math.random() * mentors.length)]);
        })
        .catch((error) => {
          console.log("Error getting mentors: ", error);
        });
      return () => unsubscribe();
    }
  }, [mentee]);

//   useEffect(() => {
//     if (mentee && mentor) {
//       const db = firebase.firestore();
//       const match = {
//         menteeId: mentee.id,
//         mentorId: mentor.id,
//         menteeName: mentee.name,
//         mentorName: mentor.name,
//         createdAt: firebase.firestore.Timestamp.now(),
//       };
//       db.collection("matches")
//         .add(match)
//         .then((docRef) => {
//           console.log("Match added with ID: ", docRef.id);
//           setMatched(true);
//         })
//         .catch((error) => {
//           console.error("Error adding match: ", error);
//         });
//     }
//   }, [mentee, mentor]);

    const getMatch = () => {
        if (mentee && mentor) {
                  const db = firebase.firestore();
                  const match = {
                    menteeId: mentee.id,
                    mentorId: mentor.id,
                    menteeName: mentee.name,
                    mentorName: mentor.name,
                    createdAt: firebase.firestore.Timestamp.now(),
                  };
                  db.collection("matches")
                    .add(match)
                    .then((docRef) => {
                      console.log("Match added with ID: ", docRef.id);
                      setMatched(true);
                    })
                    .catch((error) => {
                      console.error("Error adding match: ", error);
                    });
                }
            }


  return (
    <View style={styles.container}>
      {matched ? (
        <>
          <Text style={styles.title}>Matched!</Text>
          <Text style={styles.text}>Mentee: {mentee.name}</Text>
          <Text style={styles.text}>Mentor: {mentor.name}</Text>
          <Text style={styles.text}>Mentee: {mentee.email}</Text>
          <Button
            mode="elevated"
            onPress={() =>
              navigation.navigate("View Profile", { id: mentee.id })
            }
          >
            View Mentor Info{" "}
          </Button>
        </>
      ) : (
        <Text style={styles.text}>Matching...</Text>
      )}

      <Button mode="elevated" onPress={() => getMatch}>
        Get another match
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
