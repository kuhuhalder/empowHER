import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
import Profile from "./src/screens/Profile";
import ViewMentors from "./src/screens/ViewMentors";
import { firebase } from "./src/firebase/config";
import LogoutScreen from "./src/screens/Logout";
import PreferencesScreen from "./src/screens/Preferences";
import ViewMentees from "./src/screens/ViewMentees";
import Messaging from "./src/screens/Messaging";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddEntities from "./src/screens/AddEntities";
import ViewProfilePage from "./src/screens/ViewProfile";
import MatchPage from "./src/screens/CreateMatch";
import AddMoreInfo from "./src/screens/AddMoreInfo";
import MyMenteePage from "./src/screens/ViewAssignedMentee";
import { LogBox } from "react-native";
import ResourcesScreen from "./src/screens/Resources";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
      <Stack.Navigator initialRouteName="Home">
        
        {user ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="View Mentors" component={ViewMentors} />
            <Stack.Screen name="View Mentees" component={ViewMentees} />
            <Stack.Screen name="Messages" component={Messaging} />
            <Stack.Screen name="Add Mentors" component={AddEntities} />
            <Stack.Screen name="View Profile" component={ViewProfilePage} />
            <Stack.Screen name="My Mentor" component={MatchPage} />
            <Stack.Screen name="My Mentee" component={MyMenteePage} />
            <Stack.Screen name="Resources" component={ResourcesScreen} />

            <Stack.Screen name="Add More Information" component={AddMoreInfo} />

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
