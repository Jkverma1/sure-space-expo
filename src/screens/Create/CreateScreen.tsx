import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateListingScreen from '@/src/features/create/screens/CreateListingScreen';
import ConfirmPostScreen from '@/src/features/create/screens/ConfirmPostScreen';

const Stack = createNativeStackNavigator();

export default function CreateScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CreateListingScreen"
    >
      <Stack.Screen
        name="CreateListingScreen"
        component={CreateListingScreen}
      />
      <Stack.Screen name="ConfirmPostScreen" component={ConfirmPostScreen} />
    </Stack.Navigator>
  );
}
