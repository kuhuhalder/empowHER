import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import firebase from "firebase/compat/app";
import { Button, Checkbox } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Dropdown } from 'react-native-material-dropdown';
// import CheckBox from '@react-native-community/checkbox';

const PreferencesScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [id, setId] = useState(user.id);
  const [campus, setCampus] = useState(null);
  const [major, setMajor] = useState(null);
  const [year, setYear] = useState(null);
  const [interests, setInterests] = useState(null);
  const [skills, setSkills] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [clubs, setClubs] = useState(null);
  const [selectedValue, setSelectedValue] = useState("default");
  const [checked, setChecked] = useState(false);
  const classes = [
    { id: "111 Intro to CS", name: "Intro to CS" },
    { id: "112 Data Structures", name: "Data Structures" },
    { id: "211 Comp Arch", name: "Comp Arch" },
    { id: "205 Discrete 1", name: "Discrete 1" },
    { id: "206 Discrete 2", name: "Discrete 2" },
    { id: "213 Software Meth", name: "Software Meth" },
    { id: "214 Systems Programming", name: "Systems Programming" },
    { id: "336 Databases", name: "Databases" },

  ];
  const handleClassToggle = (id) => {
    const index = selectedClasses.indexOf(id);
    if (index === -1) {
      setSelectedClasses([...selectedClasses, id]);
    } else {
      setSelectedClasses([
        ...selectedClasses.slice(0, index),
        ...selectedClasses.slice(index + 1),
      ]);
    }
  };

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
          setSelectedClasses(user.classes);
          setClubs(user.clubs);
          setInterests(user.interests);
          setSkills(user.skills);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  // const toggleCheckbox = (id) => {
  //   const selectedClass = classes.find((item) => item.id === id);
  //   if (selectedClass) {
  //     // remove class from array
  //     const updatedClasses = classes.filter((item) => item.id !== id);
  //     setClasses(updatedClasses);
  //   } else {
  //     // add class to array
  //     const classToAdd = classesData.find((item) => item.id === id);
  //     setClasses([...classes, classToAdd]);
  //   }
  // };
  // //   const handlePreferenceChange = (, value) => {

  // //   };

  // const renderItem = ({ item }) => (
  //   <View style={styles.checkboxContainer}>
  //     <CheckBox
  //       value={classes.some((selectedClass) => selectedClass.id === item.id)}
  //       onValueChange={() => toggleCheckbox(item.id)}
  //     />
  //     <Text style={styles.label}>{item.name}</Text>
  //   </View>
  // );

  const handleSave = () => {
    const usersRef = firebase.firestore().collection("users");
    usersRef.doc(id).update({
      campus: campus,
      major: major,
      year: year,
      interests: interests,
      skills: skills,
      classes: selectedClasses,
      clubs: clubs,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: "100%" }}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Preferences</Text>

        <Text style={{ fontSize: 16 }}>
          {" "}
          Select Campus you prefer to meet on
        </Text>
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

        {/* <View style={styles.container}>
      <Text style={{ fontSize: 16 }}>Select Classes you've taken:</Text>
      <FlatList
        data={classesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.selectedClasses}>
        Selected Classes: {classes.map((item) => item.name).join(', ')}
      </Text>
    </View> */}

    
        <Text style={{ fontSize: 16 }}> Select Classes you've taken</Text>
        {classes.map((c) => (
          <View key={c.id} style={styles.checkboxContainer}>
            <Checkbox.Android
              status={selectedClasses.includes(c.id) ? "checked" : "unchecked"}
              onPress={() => handleClassToggle(c.id)}
              color="#6200EE"
            />
            <Text>{c.name}</Text>
          </View>
        ))}

        {/* <Dropdown
  label="Select an option"
  data={items}
  value={selectedValue}
  onChangeText={(value) => setClasses([...classes, value])}
  containerStyle={{ marginHorizontal: 30 }}
/> */}

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
        <Text style={{ fontSize: 16 }}> Select Skills you want to learn</Text>
        <TextInput
          style={styles.input}
          placeholder="Skills"
          value={skills}
          onChangeText={(text) => setSkills(text)}
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
    textAlign: "center",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#6d28d9",
    borderRadius: 5,
    height: 48,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  selectedClasses: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default PreferencesScreen;
