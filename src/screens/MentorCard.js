import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import {Button} from 'react-native-paper';
const MentorCard = ({ mentor, navigation}) => {
  return (
    <Card>
      <Card.Content>
        <Title>{mentor.name}</Title>
        <Paragraph>{mentor.bio}</Paragraph>
        <Button icon="camera" mode="contained" onPress={() => navigation.navigate("Messaging")}>Message</Button>
      </Card.Content>
    </Card>
  );
};

export default MentorCard;
