import React from 'react';
import { View, Text, Button } from 'react-native';

export default function VerifyEmailScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Verify Email Screen</Text>
      <Button title="Verify Now" onPress={() => {}} />
    </View>
  );
}
