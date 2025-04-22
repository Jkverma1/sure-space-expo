import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '@/src/features/feed/screens/FeedScreen';
import UserProfileScreen from '@/src/features/feed/screens/UserProfileScreen';

const Stack = createNativeStackNavigator();

export default function FeedScreens() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="FeedScreen"
    >
      <Stack.Screen name="FeedScreen" component={FeedScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}
