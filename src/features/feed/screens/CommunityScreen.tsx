import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const CommunityScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CommunityScreen</Text>
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

export default CommunityScreen;
