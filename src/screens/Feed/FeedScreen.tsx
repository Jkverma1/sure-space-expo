import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '@/src/features/feed/screens/FeedScreen';
import UserProfileScreen from '@/src/features/feed/screens/UserProfileScreen';
import CompletePostScreen from '@/src/features/feed/screens/CompletePostScreen';
import FollowersFollowingScreen from '@/src/features/feed/screens/FollowersFollowingScreen';

const Stack = createNativeStackNavigator();

export default function FeedScreens() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="FeedScreen"
    >
      <Stack.Screen name="FeedScreen" component={FeedScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="CompletePostScreen" component={CompletePostScreen} />
      <Stack.Screen name = "FollowersFollowingScreen" component={FollowersFollowingScreen} />
    </Stack.Navigator>
  );
}
