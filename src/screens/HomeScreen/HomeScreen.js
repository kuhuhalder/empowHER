import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Image } from "react-native";
import styles from "./styles";
export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image style={styles.logo} source={require("../../../assets/icon.png")} />
      <Button mode="elevated"  style={{ marginVertical: 10 }} onPress={() => navigation.navigate("Login")}>
        Login
      </Button>

      <Button
        mode="elevated"
        onPress={() => navigation.navigate("Registration")}
      >
        Sign Up
      </Button>
    </View>
  );
}
