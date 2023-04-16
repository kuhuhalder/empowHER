import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

const MentorCard = ({ mentor }) => {
  return (
    <Card>
      <Card.Content>
        <Title>{mentor.name}</Title>
        <Paragraph>{mentor.bio}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default MentorCard;
