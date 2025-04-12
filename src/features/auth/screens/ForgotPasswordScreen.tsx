import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ForgotPasswordScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Forgot Password Screen</Text>
      <Button title="Reset Password" onPress={() => {}} />
    </View>
  );
}
