import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';

const PreferencesScreen = ({ route, navigation }) => {
    const {user } = route.params;
  const [id, setUid] = useState(user.id);
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    usersRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setPreferences(doc.data().preferences);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);

  const handlePreferenceChange = (preferenceName, value) => {
    setPreferences({ ...preferences, [preferenceName]: value });
  };

  const handleSave = () => {
    const usersRef = firebase.firestore().collection('users');
    usersRef.doc(uid).update({
      preferences: preferences,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferences</Text>
      <TextInput
        style={styles.input}
        placeholder="Favorite color"
        value={preferences.favoriteColor}
        onChangeText={(text) =>
          handlePreferenceChange('favoriteColor', text)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Favorite food"
        value={preferences.favoriteFood}
        onChangeText={(text) =>
          handlePreferenceChange('favoriteFood', text)
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
