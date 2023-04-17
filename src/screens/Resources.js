import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking } from "react-native";
import { Avatar, Button, Card, IconButton, List } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const ResourcesScreen = () => {
  const resources = [
    {
        id: "1",
        title: "empowHER Mentorship Guide",
        description: "Our guide to mentorship",
        url: "https://kuhuhalder.notion.site/empowHER-Mentorship-Guide-13d4696ed6c946b4acfed4756d614df2",
        icon: "school",
      },
    {
      id: "2",
      title: "Codecademy",
      description: "Learn to code interactively, for free.",
      url: "https://www.codecademy.com/",
      icon: "book",
    },
    {
      id: "3",
      title: "Khan Academy",
      description: "Free online courses, lessons & practice.",
      url: "https://www.khanacademy.org/",
      icon: "school",
    },
    {
      id: "4",
      title: "FreeCodeCamp",
      description: "Learn to code for free and get a developer job.",
      url: "https://www.freecodecamp.org/",
      icon: "laptop",
    },
    {
      id: "5",
      title: "Google Developers",
      description: "Learn to create amazing apps, games, and websites.",
      url: "https://developers.google.com/",
      icon: "google",
    },
    {
      id: "6",
      title: "Coursera",
      description: "Online courses from top universities and companies.",
      url: "https://www.coursera.org/",
      icon: "book-open",
    },
  ];

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => Linking.openURL(item.url)}
      >
        <Avatar.Icon size={50} icon={item.icon} style={styles.cardIcon} />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
        <IconButton icon="arrow-right" color="#999" size={20} />
      </TouchableOpacity>
    </Card>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resources</Text>
        <IconButton
          icon={() => <AntDesign name="search1" size={20} color="#999" />}
          onPress={() => {}}
        />
      </View>
      <List.Section>
        <List.Subheader style={styles.listTitle}>
          Curated list of helpful resources
        </List.Subheader>
        {/* <Card>
          <List.Item
            title="Udacity"
            description="Learn the latest tech skills to advance your career."
            left={() => <Avatar.Icon size={50} icon="school" />}
            right={() => (
              <IconButton
                icon="arrow-right"
                color="#999"
                size={20}
                onPress={() => {}}
              />
            )}
            onPress={() => {}}
          />
        </Card> */}
        <FlatList
          data={resources}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onPress = {() => {item.url}}
        />
      </List.Section>
    </View>
  );
};
export default ResourcesScreen;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f2f2f2',
    },
    headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    },
    listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 10,
    },
    card: {
    marginVertical: 5,
    marginHorizontal: 10,
    },
    cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    },
    cardIcon: {
    backgroundColor: '#eee',
    },
    cardText: {
    flex: 1,
    marginLeft: 10,
    },
    cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    },
    cardDescription: {
    fontSize: 14,
    color: '#999',
    },
    });

    
    
    
    
    
    