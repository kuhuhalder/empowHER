import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
// import { firebase } from '../../firebase/config';
import firebase from 'firebase/compat/app';

const LogoutScreen = () => {
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LogoutScreen;
