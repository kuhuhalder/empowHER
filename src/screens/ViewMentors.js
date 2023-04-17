

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import firebase from "firebase/compat/app";
import { Card, Title, Paragraph } from "react-native-paper";
import { Button, Searchbar } from "react-native-paper";
import "firebase/compat/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ViewMentors({ navigation }) {
  const [mentors, setMentors] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  useEffect(() => {
    // Retrieve all mentors from Firestore
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .where("value", "==", "mentor")
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
    <TouchableOpacity onPress={() => navigation.navigate("View Profile", {user: item})}>
      <View style={{ padding: 10 }}>

        {/* <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 16 }}>{item.bio}</Text>
        <Text style={{ fontSize: 16 }}>Skills: {item.skills}</Text> */}

        <Card>
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>{item.bio}</Paragraph>
            {/* <Button icon="camera" mode="contained" onPress={() => navigation.navigate("Messaging")}>Message</Button> */}
          </Card.Content>
        </Card>
        {/* <Button title="Message" onPress={() => handlePressMessage(item.id)} /> */}
        <Button
          mode="contained" style = {{marginTop: 10, width: 150,  alignSelf: 'center'}}
          onPress={() => handlePressMessage(item.id)}
        >
          Message
        </Button>
      </View>
    </TouchableOpacity>
    </KeyboardAwareScrollView>
  );

  return (
    <><Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ marginBottom: 10 }} /><FlatList
              data={mentors}
              keyExtractor={(item) => item.id}
              renderItem={renderItem} /></>
  );
}
