// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
import Profile from './src/screens/Profile';
import ViewMentors from './src/screens/ViewMentors';
import { firebase } from './src/firebase/config'
import LogoutScreen from './src/screens/Logout';
import PreferencesScreen from './src/screens/Preferences';
import ViewMentees from './src/screens/ViewMentees';
import Messaging from './src/screens/Messaging';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  
  // useEffect(() => {
  //   const usersRef = firebase.firestore().collection('users');
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data()
  //           setLoading(false)
  //           setUser(userData)
  //         })
  //         .catch((error) => {
  //           setLoading(false)
  //         });
  //     } else {
  //       setLoading(false)
  //     }
  //   });
  // }, []);

  // if (loading) {
  //   return (
  //     <></>
  //   )
  // }

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="ViewMentors" component={ViewMentors} />
//     </Tab.Navigator>
//   );
// }
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login">
        {/* { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <> */}
          { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ViewMentors" component={ViewMentors} />
            <Stack.Screen name="ViewMentees" component={ViewMentees} />
            <Stack.Screen name="Messaging" component={Messaging} />


            <Stack.Screen name="Logout" component={LogoutScreen} />
            <Stack.Screen name="Preferences" component={PreferencesScreen} />
            
          {/* </>
        )} */}
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}