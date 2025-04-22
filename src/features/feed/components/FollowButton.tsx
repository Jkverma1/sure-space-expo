import { followIcon } from '@/src/constants';
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

interface FollowButtonProps {
  isBlocked: boolean;
  isFollowing: boolean;
  onPress: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isBlocked,
  isFollowing,
  onPress,
}) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Image source={followIcon} style={styles.icon} />
    <Text style={styles.text}>
      {isBlocked ? 'Unblock' : isFollowing ? 'Following' : 'Follow'}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F08080',
    borderRadius: 80,
    paddingVertical: 8,
    minWidth: 250,
    marginTop: 12,
    gap: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default FollowButton;
