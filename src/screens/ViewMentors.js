import React from 'react';
import { FlatList } from 'react-native';
import MentorCard from './MentorCard';

const mentors = [
  {
    name: 'John Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Jane Smith',
    bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
  },
];

const ViewMentors = () => {


  return (
    <FlatList
      data={mentors}
      renderItem={({ item }) => <MentorCard mentor={item} />}
      keyExtractor={(item) => item.name}
    />
  );
};

export default ViewMentors;
