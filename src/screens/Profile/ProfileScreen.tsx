import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileMainScreen from '@/src/features/profile/screens/ProfileMainScreen';
import SettingsScreen from '@/src/features/profile/screens/SettingsScreen';
import InviteFriendsScreen from '@/src/features/profile/screens/InviteFriendsScreen';
import UserProfileScreen from '@/src/features/feed/screens/UserProfileScreen';
import NotificationScreen from '@/src/features/profile/screens/NotificationScreen';
import CompletePostScreen from '@/src/features/feed/screens/CompletePostScreen';
import FollowersFollowingScreen from '@/src/features/feed/screens/FollowersFollowingScreen';

const Stack = createNativeStackNavigator();

export default function ProfileScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileMain"
    >
      <Stack.Screen name="ProfileMain" component={ProfileMainScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="CompletePostScreen" component={CompletePostScreen} />
      <Stack.Screen name = "FollowersFollowingScreen" component={FollowersFollowingScreen} />
    </Stack.Navigator>
  );
}
