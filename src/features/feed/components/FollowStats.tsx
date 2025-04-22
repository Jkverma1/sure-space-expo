import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FollowStatsProps {
  followers: number;
  following: number;
  onFollowersPress: () => void;
  onFollowingPress: () => void;
}

const FollowStats: React.FC<FollowStatsProps> = ({
  followers,
  following,
  onFollowersPress,
  onFollowingPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.btn} onPress={onFollowersPress}>
      <Text style={styles.count}>{followers || '0'}</Text>
      <Text style={styles.label}>Followers</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn} onPress={onFollowingPress}>
      <Text style={styles.count}>{following || '0'}</Text>
      <Text style={styles.label}>Following</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  btn: {
    alignItems: 'center',
  },
  count: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Open Sans',
    color: '#1E1D20',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#1E1D20',
  },
});

export default FollowStats;
