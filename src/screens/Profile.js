import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import ViewMentors from './ViewMentors';

export default function Profile(props) {
    const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={{ width: 150, height: 150, borderRadius: 75 }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>John Doe</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>UX Designer</Text>
      <Tab.Navigator>
      <Tab.Screen
        name="Mentors"
        component={ViewMentors}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          )
        }}
        
      />
    </Tab.Navigator>    
    
    </View>
  );
}
