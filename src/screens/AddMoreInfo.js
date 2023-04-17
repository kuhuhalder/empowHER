import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import firebase from "firebase/compat/app";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddMoreInfo = ({ route, navigation }) => {
  const { user } = route.params;
  const [id, setId] = useState(user.id);
  const [campus, setCampus] = useState(null);
  const [major, setMajor] = useState(null);
  const [year, setYear] = useState(null);
  const [interests, setInterests] = useState(null);
  const [classes, setClasses] = useState([]);
  const [clubs, setClubs] = useState(null);
  const [linkedIn, setLinkedIn] = useState(null);
  const [instagram, setInstagram] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const user = doc.data();
          setCampus(user.campus);
          setMajor(user.major);
          setYear(user.year);
          setClasses(user.classes);
          setClubs(user.clubs);
          setInterests(user.interests);
          setInstagram(user.instagram);
          setLinkedIn(user.linkedIn);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  //   const handlePreferenceChange = (, value) => {

  //   };

  const handleSave = () => {
    const usersRef = firebase.firestore().collection("users");
    usersRef.doc(id).update({
      campus: campus,
      major: major,
      year: year,
      interests: interests,
      classes: classes,
      clubs: clubs,
      linkedIn: linkedIn,
      instagram: instagram,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
    style={{ flex: 1, width: "100%" }}
    keyboardShouldPersistTaps="always"
  >
    <View style={styles.container}>
      <Text style={{ fontSize: 16 }}> Select Campus you prefer to meet on</Text>
      <TextInput
        style={styles.input}
        placeholder="Campus"
        value={campus}
        onChangeText={(text) => setCampus(text)}
      />
      <Text style={{ fontSize: 16 }}> Select your Major</Text>
      <TextInput
        style={styles.input}
        placeholder="Major"
        value={major}
        onChangeText={(text) => setMajor(text)}
      />
      <Text style={{ fontSize: 16 }}> Select Year</Text>
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={(text) => setYear(text)}
      />
      <Text style={{ fontSize: 16 }}> Select Classes you've taken</Text>
      <TextInput
        style={styles.input}
        placeholder="Classes"
        value={classes}
        onChangeText={(text) => setClasses(text)}
      />
      <Text style={{ fontSize: 16 }}> Select Clubs you are a part of</Text>
      <TextInput
        style={styles.input}
        placeholder="Clubs"
        value={clubs}
        onChangeText={(text) => setClubs(text)}
      />
      <Text style={{ fontSize: 16 }}> Select your Interests</Text>
      <TextInput
        style={styles.input}
        placeholder="Interests"
        value={interests}
        onChangeText={(text) => setInterests(text)}
      />
      <Text style={{ fontSize: 16 }}> Social Handles</Text>
      <TextInput
        style={styles.input}
        placeholder="LinkedIn"
        value={linkedIn}
        onChangeText={(text) => setLinkedIn(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Instagram"
        value={instagram}
        onChangeText={(text) => setInstagram(text)}
      />
      <Button
        mode="elevated"
        style={{ marginVertical: 10 }}
        onPress={handleSave}
      >
        Save
      </Button>
    </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#333",
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: "#fff",
      color: "#333",
    },
    submitButton: {
      backgroundColor: "#3F51B5",
      borderRadius: 5,
      padding: 10,
      marginTop: 20,
    },
    submitButtonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
  });
  

export default AddMoreInfo;
