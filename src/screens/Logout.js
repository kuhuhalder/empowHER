import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
// import { firebase } from '../../firebase/config';
import firebase from 'firebase/compat/app';

const LogoutScreen = (navigation) => {
  const handleLogout = () => {
    firebase.auth().signOut();
    navigation.navigate('Login')
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
