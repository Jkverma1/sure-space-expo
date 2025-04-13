import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsMainScreen from './screens/SettingsMainScreen';
import PersonalInformationScreen from './screens/PersonalInformationScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import BlockedUsersScreen from './screens/BlockedUsersScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
import HelpScreen from './screens/HelpScreen';
import DataUsageScreen from './screens/DataUsageScreen';
import PasswordChangedScreen from './screens/PasswordChangedScreen';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName="SettingsMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsMainScreen} />
      <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="DataUsage" component={DataUsageScreen} />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
    </Stack.Navigator>
  );
}
