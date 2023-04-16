// import React, { useState, useEffect } from 'react';
// import { FlatList } from 'react-native';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// // import firebase from '../firebase/config';
// import MentorCard from './MentorCard';

// const ViewMentees = (navigation) => {
//   const [mentees, setMentees] = useState([]);

//   useEffect(() => {
//     const db = firebase.firestore();
//     const mentorsRef = db.collection('users').where('value', '==', 'mentee');

//     mentorsRef.get().then(querySnapshot => {
//       const menteesList = [];
//       querySnapshot.forEach(doc => {
//         const mentorData = doc.data();
//         const mentor = { id: doc.id, ...mentorData };
//         menteesList.push(mentor);
//       });
//       setMentees(menteesList);
//     });
//   }, []);

//   return (
//     <FlatList
//       data={mentees}
//       renderItem={({ item }) => <MentorCard mentor={item} />}
//       keyExtractor={(item) => item.id}
//     />
//   );
// };

// export default ViewMentees;

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import firebase from "firebase/compat/app";
import { Card, Title, Paragraph } from "react-native-paper";
import { Button } from "react-native-paper";
import "firebase/compat/firestore";
export default function ViewMentors({ navigation }) {
  const [mentors, setMentors] = useState([]);

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
    // Navigate to messaging screen and pass mentor ID as parameter
    navigation.navigate("Messaging", { mentorId: mentorId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressMessage(item.id)}>
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
          mode="contained"
          onPress={() => handlePressMessage(item.id)}
        >
          Message
        </Button>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={mentors}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}
