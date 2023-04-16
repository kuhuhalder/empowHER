import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import firebase from '../firebase/config';
import MentorCard from './MentorCard';

const ViewMentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const mentorsRef = db.collection('users').where('value', '==', 'mentor');

    mentorsRef.get().then(querySnapshot => {
      const mentorsList = [];
      querySnapshot.forEach(doc => {
        const mentorData = doc.data();
        const mentor = { id: doc.id, ...mentorData };
        mentorsList.push(mentor);
      });
      setMentors(mentorsList);
    });
  }, []);

  return (
    <FlatList
      data={mentors}
      renderItem={({ item }) => <MentorCard mentor={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ViewMentors;
