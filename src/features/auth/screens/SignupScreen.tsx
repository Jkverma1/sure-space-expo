import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SignupScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signup Screen</Text>
      <Button title="Create Account" onPress={() => {}} />
    </View>
  );
}
