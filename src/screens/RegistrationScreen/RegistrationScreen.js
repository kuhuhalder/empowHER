import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { RadioButton, useTheme } from "react-native-paper";
// import { Text } from '@rneui/themed';
import { CheckBox, Icon } from "@rneui/themed";

import { firebase } from "../../firebase/config";
// import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default function RegistrationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [role, setValue] = useState("mentee");
  const { colors } = useTheme();
  const [campus, setCampus] = useState(null);
  const [major, setMajor] = useState(null);
  const [year, setYear] = useState(null);
  const [interests, setInterests] = useState(null);
  const [skills, setSkills] = useState(null);
  const [classes, setClasses] = useState(null);
  const [clubs, setClubs] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [checked, setChecked] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  //   const onGoogleButtonPress = async () => {
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const userInfo = await GoogleSignin.signIn();
  //       const googleCredential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
  //       await firebase.auth().signInWithCredential(googleCredential);
  //     }

  //     //   Navigate to the desired screen after successful sign-in
  //     catch (error) {
  //     //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //     //     // user cancelled the sign-in flow
  //     //   } else if (error.code === statusCodes.IN_PROGRESS) {
  //     //     // operation (e.g. sign-in) is in progress already
  //     //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //     //     // play services not available or outdated
  //     //   } else {
  //         // some other error occurred
  //       }
  // }

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          name,
          role,
          bio,
          campus,
          major,
          year,
          interests,
          skills,
          classes,
          clubs,
          photoURL,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Profile", { user: data });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setName(text)}
          value={name}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {/* <RadioButton
        value="Mentor"
        status={ checked === 'mentor' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first') }
      />
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      /> */}
        <Text style={{ marginLeft: 8 }}>Select one</Text>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={role}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="mentor" color={colors.primary} />
            <Text style={{ marginLeft: 8 }}>Mentor</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="mentee"
              color={colors.primary}
              // uncheckedColor={colors.disabled}
              // disabled={false}
            />
            <Text style={{ marginLeft: 8 }}>Mentee</Text>
          </View>
        </RadioButton.Group>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Bio"
          onChangeText={(text) => setBio(text)}
          value={bio}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <CheckBox
          center
          title="By signing up, you are agreeing to receive weekly buddy pairing emails. "
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked}
          onPress={() => setChecked(!checked)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>

        {/* <GoogleSigninButton
  style={{ width: '100%', height: 48 }}
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Light}
  onPress={onGoogleButtonPress}
/> */}
      </KeyboardAwareScrollView>
    </View>
  );
}
