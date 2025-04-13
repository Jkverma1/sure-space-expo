import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import MenuList from '../components/MenuList';
import { ProfileStackParamList } from '../types/profile.types';

import {
  download_ico,
  invite_friends,
  referal_user,
  settings,
  signed_up,
  user_image,
} from '@/src/constants';

const screenWidth = Dimensions.get('screen').width;

const menuData = [
  {
    name: 'Settings',
    screen: 'Settings' as keyof ProfileStackParamList,
    image: settings,
  },
  {
    name: 'Invite Friends',
    screen: 'InviteFriends' as keyof ProfileStackParamList,
    image: invite_friends,
  },
];

export default function ProfileMainScreen() {
  const user = useSelector((state: any) => state.user.user);

  const avatarSrc =
    user?.avatarUrl && user.avatarUrl !== ''
      ? { uri: user.avatarUrl }
      : user_image;

  const referralLeft = 20 - (user?.referralCount ?? 0);
  const downloaded = user?.referralCount ?? 0;
  const signedUp = user?.referralCount ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text></Text>
        <Text style={styles.header_title}>Profile</Text>
      </View>

      <View style={styles.user_avatar}>
        <Image style={styles.user_image} source={avatarSrc} />
        <Text style={styles.username}>{user?.fullName || 'User'}</Text>
      </View>

      <View style={styles.referral_container}>
        <View style={styles.icon_row}>
          <Image source={referal_user} style={styles.referal_user} />
          <View>
            <Text style={styles.first_name}>User</Text>
            <Text style={styles.description}>
              {referralLeft} Invites left to the level Influencer
            </Text>
          </View>
        </View>
        <View style={styles.refferal_btn_container}>
          <View style={styles.icon_row}>
            <Image source={download_ico} style={styles.referral_icon} />
            <Text style={styles.people_count_text}>
              {downloaded} Downloaded
            </Text>
          </View>
          <View style={styles.icon_row}>
            <Image source={signed_up} style={styles.referral_icon} />
            <Text style={styles.people_count_text}>{signedUp} Signed Up</Text>
          </View>
        </View>
      </View>

      <MenuList data={menuData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    position: 'relative',
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 18,
    paddingHorizontal: 16,
  },
  header_title: {
    position: 'absolute',
    top: 0,
    left: screenWidth / 2 - 32,
    fontSize: 20,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    lineHeight: 27.24,
    color: '#1E1D20',
  },
  user_avatar: {
    marginTop: 16,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user_image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 18,
    fontFamily: 'Open Sans',
    fontWeight: '700',
    lineHeight: 24.51,
    color: '#1E1D20',
  },
  first_name: {
    fontSize: 20,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    lineHeight: 27.24,
    color: '#1E1D20',
  },
  description: {
    marginTop: 6,
    marginBottom: 3,
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    lineHeight: 16.34,
    color: '#1E1D2080',
  },
  people_count_text: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    lineHeight: 19.07,
    color: '#1E1D20',
  },
  referral_container: {
    marginTop: 26,
    borderWidth: 1,
    borderColor: '#FBC4AB',
    borderRadius: 10,
    padding: 12,
    width: screenWidth - 32,
  },
  referal_user: {
    width: 72,
    height: 72,
  },
  referral_icon: {
    width: 40,
    height: 40,
  },
  icon_row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  refferal_btn_container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
