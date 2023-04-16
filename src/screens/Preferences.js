import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';

const PreferencesScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [id, setId] = useState(user.id);
//   const [preferences, setPreferences] = useState({
//     campus: '',
//     major: '',
//     year: '',
//     classes: '',
//     clubs: '',
//     interests: '',
//     skills: '',
//   });
const [campus, setCampus] = useState(null);
const [major, setMajor] = useState(null);
const [year, setYear] = useState(null);
const [interests, setInterests] = useState(null);
const [skills, setSkills] = useState(null);
const [classes, setClasses] = useState(null);
const [clubs, setClubs] = useState(null);


  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
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
            setSkills(user.skills);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);

//   const handlePreferenceChange = (, value) => {
   
//   };

  const handleSave = () => {
    const usersRef = firebase.firestore().collection('users');
    usersRef.doc(id).update({
      campus: campus,
        major: major,
        year: year,
        interests: interests,
        skills: skills,
        classes: classes,
        clubs: clubs,

    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferences</Text>

      <Text style={{fontSize: 16}}> Select Campus</Text>
      <TextInput
        style={styles.input}
        placeholder="Campus"
        value={campus}
        onChangeText={(text) =>
          setCampus(text)
        }
      />
      <Text style={{fontSize: 16}}> Select Major</Text>
      <TextInput
        style={styles.input}
        placeholder="Major"
        value={major}
        onChangeText={(text) =>
          setMajor(text)
        }
      />
       <Text style={{fontSize: 16}}> Select Year</Text>
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={(text) =>
          setYear(text)
        }
      />
       <Text style={{fontSize: 16}}> Select Classes</Text>
      <TextInput
        style={styles.input}
        placeholder="Classes"
        value={classes}
        onChangeText={(text) =>
          setClasses(text)
        }
      />
       <Text style={{fontSize: 16}}> Select Clubs</Text>
      <TextInput
        style={styles.input}
        placeholder="Clubs"
        value={clubs}
        onChangeText={(text) =>
          setClubs(text)
        }
      />
       <Text style={{fontSize: 16}}> Select Interests</Text>
      <TextInput
        style={styles.input}
        placeholder="Interests"
        value={interests}
        onChangeText={(text) =>
          setInterests(text)
        }
      />
       <Text style={{fontSize: 16}}> Select Skills</Text>
      <TextInput
        style={styles.input}
        placeholder="Skills"
        value={skills}
        onChangeText={(text) =>
          setSkills(text)
        }
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default PreferencesScreen;
