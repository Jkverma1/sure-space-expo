import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import { block_ico, report_ico, userAvatar } from '@/src/constants';

interface ProfileHeaderProps {
  showBlockBtn: boolean;
  onBlockPress: () => void;
  toggleBlockBtn: () => void;
  AvatarUrl?: string;
  fullName?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  showBlockBtn,
  onBlockPress,
  toggleBlockBtn,
  AvatarUrl,
  fullName,
}) => (
  <View style={{ width: '100%' }}>
    <TouchableOpacity style={styles.avatarBtn}>
      <Image
        source={AvatarUrl ? { uri: AvatarUrl } : userAvatar}
        style={styles.avatarIcon}
      />
    </TouchableOpacity>
    {showBlockBtn && (
      <View style={styles.blockContainer}>
        <TouchableOpacity onPress={toggleBlockBtn}>
          <Image source={report_ico} style={styles.reportIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.blockBtn} onPress={onBlockPress}>
          <Image source={block_ico} style={styles.blockIcon} />
        </TouchableOpacity>
      </View>
    )}
    <Text style={styles.name}>{fullName || 'loading...'}</Text>
  </View>
);

const styles = StyleSheet.create({
  avatarBtn: {
    marginBottom: 6,
    width: 72,
    height: 72,
    backgroundColor: '#F08080',
    borderRadius: 72,
    marginHorizontal: 'auto',
  },
  avatarIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 72,
  },
  reportIcon: {
    width: 24,
    height: 24,
  },
  blockContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    top: 18,
    right: 16,
  },
  blockBtn: {
    marginTop: 25,
    padding: 10,
    borderRadius: 5,
    borderColor: '#0000000D',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  blockIcon: {
    width: 16,
    height: 16,
  },
  name: {
    fontSize: 18,
    color: '#1E1D20',
    fontWeight: '600',
    fontFamily: 'Open Sans',
    textAlign: 'center',
  },
});

export default ProfileHeader;
