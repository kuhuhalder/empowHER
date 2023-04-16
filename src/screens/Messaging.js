import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const Messaging = ({ route, navigation }) => {
  const { mentorId } = route.params;

  const [messages, setMessages] = useState([]);
  const [receiverName, setReceiverName] = useState("");
  const [text, setText] = useState("");
  const currentUser = firebase.auth().currentUser;
  const userId = currentUser ? currentUser.uid : null;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(mentorId)
      .onSnapshot((doc) => {
        const name = doc.data().name;
        setReceiverName(name);
      });
    return unsubscribe;
  }, [mentorId]);
  // Initialize Firebase Firestore
  useEffect(() => {
    firebase
      .firestore()
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messages);
      });
  }, []);

  // Send a message
  const sendMessage = async () => {
    if (text.trim()) {
      const userRef = firebase.firestore().collection("users").doc(userId);
      const userDoc = await userRef.get();
      var senderName = userDoc.data().name;

      const userRef1 = firebase.firestore().collection("users").doc(mentorId);
      const userDoc1 = await userRef1.get();
      var receiverName = userDoc1.data().name;
  
      const message = {
        senderId: userId,
        senderName: senderName,
        receiverName: receiverName,
        receiverId: mentorId,
        text: text,
        createdAt: new Date().getTime(),
      };
      await firebase.firestore().collection("messages").add(message);
      setText("");
    }
  };
  

  // Render a message
const renderMessage = ({ item }) => {
    const isSender = item.senderId === userId;
    const alignStyle = isSender
      ? { alignSelf: "flex-end", marginRight: 15, marginLeft: 50 }
      : { alignSelf: "flex-start" };
    const name = isSender ? "You" : item.receiverName;
    return (
      <View style={{ marginVertical: 8, ...alignStyle }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", marginRight: 8 }}>{name}:</Text>
          <Text style={{ fontSize: 16 }}>{item.text}</Text>
        </View>
      </View>
    );
  };
  

  return (
    <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", alignItems: "center" }}>{receiverName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        inverted
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#eee",
          padding: 50,
        }}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type your message..."
          style={{ flex: 1, fontSize: 16, marginRight: 8 }}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={{ color: "blue", fontSize: 16 }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Messaging;
