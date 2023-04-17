import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import firebase from "firebase/compat/app";
import { Card, Title, Paragraph } from "react-native-paper";
import { Button, Searchbar } from "react-native-paper";
import "firebase/compat/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ViewMentors({ navigation }) {
  const [mentors, setMentors] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  useEffect(() => {
    // Retrieve all mentors from Firestore
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .where("role", "==", "mentor")
      .onSnapshot((snapshot) => {
        const mentorsData = [];
        snapshot.forEach((doc) => {
          mentorsData.push({ id: doc.id, ...doc.data() });
        });
        setMentors(mentorsData);
      });
    return () => unsubscribe();
  }, []);

  const handlePressMessage = (mentorId) => {
    console.log("Message button pressed", mentorId);
    navigation.navigate("Messages", { mentorId: mentorId });
  };

  const renderItem = ({ item }) => (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: "100%" }}
      keyboardShouldPersistTaps="always"
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("View Profile", { user: item })}
      >
        <View style={{ padding: 10 }}>
          {/* <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 16 }}>{item.bio}</Text>
        <Text style={{ fontSize: 16 }}>Skills: {item.skills}</Text> */}

          <Card style={styles.cardContainer}>
          {item.photoURL ? (
              <Image source={{ uri: item.photoURL }} style={styles.cardImage} />
            ) : (
              <Image
                source={{ uri: "https://via.placeholder.com/200" }}
                style={styles.cardImage}
              />
            )}
            <Card.Content style={styles.cardContent}>
              <Title style={styles.cardTitle}>{item.name}</Title>
              <Paragraph style={styles.cardBio}>{item.bio}</Paragraph>
            </Card.Content>
          </Card>
          {/* <Button title="Message" onPress={() => handlePressMessage(item.id)} /> */}
          <Button
            mode="contained"
            style={{ marginTop: 10, width: 150, alignSelf: "center" }}
            onPress={() => handlePressMessage(item.id)}
          >
            Message
          </Button>
        </View>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ marginBottom: 10 }}
      />
      <FlatList
        data={mentors}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 10,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cardBio: {
    fontSize: 16,
    textAlign: "center",
  },
});
