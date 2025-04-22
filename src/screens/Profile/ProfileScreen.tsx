import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileMainScreen from '@/src/features/profile/screens/ProfileMainScreen';
import SettingsScreen from '@/src/features/profile/screens/SettingsScreen';
import InviteFriendsScreen from '@/src/features/profile/screens/InviteFriendsScreen';
import UserProfileScreen from '@/src/features/feed/screens/UserProfileScreen';

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
    </Stack.Navigator>
  );
}
