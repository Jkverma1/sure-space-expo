import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyContentScreen = () => {
  return (
    <View style={styles.container}>
      <Text>My Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});

export default MyContentScreen;
