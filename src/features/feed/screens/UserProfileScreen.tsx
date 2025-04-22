import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
// import {getFollowers, getFollowing} from '../../services/get';

import ProfileHeader from '../components/ProfileHeader';
import FollowStats from '../components/FollowStats';
import FollowButton from '../components/FollowButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';

const UserProfileScreen = () => {
  const route =
    useRoute<
      RouteProp<{ params: { userId: string; uid: string } }, 'params'>
    >();
  const { userId, uid } = route.params;
  const [userDetails, setUserDetails] = useState<{ fullName: string } | null>(
    null,
  );
  // const {getUser, getBlockList, unblockUser, blockUser, handleFollow, handleUnFollow} = useAuth();
  const getUser = (uid: string) => {
    // Mocked implementation
    return Promise.resolve({ data: { fullName: 'John Doe' } });
  };
  const getBlockList = async () => {
    return { data: [{ id: '1' }, { id: '2' }] }; // Mocked data
  };
  const unblockUser = () => {};
  const blockUser = () => {};
  const handleFollow = () => {};
  const handleUnFollow = () => {};
  const user = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation();

  const [followers, setFollowers] = useState<{
    followers: { uid: string }[];
  } | null>(null);
  const [following, setFollowing] = useState<{
    following: { uid: string }[];
  } | null>(null);
  const [openBlock, setOpenBlock] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showBlockBtn, setShowBlockBtn] = useState(false);

  const fetchFollowers = async () => {
    // const resFollowers = await getFollowers(uid);
    // const resFollowing = await getFollowing(uid);
    const resFollowers = { data: { followers: [{ uid: '1' }, { uid: '2' }] } }; // Mocked data
    const resFollowing = { data: { following: [{ uid: '3' }, { uid: '4' }] } }; // Mocked data
    setFollowers(resFollowers.data);
    setFollowing(resFollowing.data);
  };

  useEffect(() => {
    // const blocked: boolean = blockList?.data?.some((user: { id: string }) => user.id === userId);
    const fetchData = async () => {
      const blockList = await getBlockList();
      const blocked: boolean = blockList.data?.some(
        (user: { id: string }) => user.id === userId,
      );
      setIsBlocked(blocked);
      if (!blocked) {
        const userData = await getUser(uid);
        setUserDetails(userData.data);
        fetchFollowers();
      }
    };
    fetchData();
  }, []);

  const isFollowing = () => {
    return followers?.followers?.some((f) => f.uid === user.uid);
  };

  const changeState = async () => {
    if (isBlocked) {
      await unblockUser();
      setIsBlocked(false);
    } else {
      isFollowing() ? await handleUnFollow() : await handleFollow();
      fetchFollowers();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        showBlockBtn={showBlockBtn}
        toggleBlockBtn={() => setShowBlockBtn(!showBlockBtn)}
        onBlockPress={() => setOpenBlock(true)}
      />
      <FollowStats
        followers={followers?.followers?.length || 0}
        following={following?.following?.length || 0}
        onFollowersPress={() => {
          // followers?.followers?.length &&
          // navigation.navigate('FollowersFollowing', {
          //   active: 'Followers',
          //   followers: followers,
        }}
        onFollowingPress={() => {
          // following?.following?.length &&
          // navigation.navigate('FollowersFollowing', {
          //   active: 'Following',
          //   followers: followers,
          // })
        }}
      />
      <FollowButton
        isBlocked={isBlocked}
        isFollowing={!!isFollowing()}
        onPress={changeState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default UserProfileScreen;
