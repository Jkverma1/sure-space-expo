import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Header from '../../profile/components/Header';
import { useSelector } from 'react-redux';
import { userAvatar } from '@/src/constants';

interface RouteParams {
  followers: Array<{
    uid: string;
    fullName: string;
    avatarUrl?: string;
    parentUserId: string;
  }>;
  following: Array<{
    uid: string;
    fullName: string;
    avatarUrl?: string;
    parentUserId: string;
  }>;
  active: 'Followers' | 'Following';
}

const FollowersFollowingScreen = () => {
  const route = useRoute();
  const {
    followers = [],
    following = [],
    active = 'Followers',
  } = route.params as RouteParams;
  const user = useSelector((state: any) => state.user.user);
  const [activeTab, setActiveTab] = useState(active);

  const currentData = activeTab === 'Followers' ? followers : following;

  const navigation = useNavigation<NavigationProp<any>>();

  const isFollowing = (userId: string) => {
    return following.some((following) => following.uid === userId);
  };

  const changeState = async (followerId: string) => {
    const state = isFollowing(followerId);
    // Add your follow/unfollow logic here
  };

  const showProfile = (item: any) => {
    navigation.navigate('UserProfileScreen', {
      userId: item.id,
      uid: item.uid,
    });
  };

  return (
    <View style={styles.container}>
      <Header title={activeTab} />
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Followers' && styles.activeTab]}
          onPress={() => setActiveTab('Followers')}
        >
          <Text style={styles.tabText}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Following' && styles.activeTab]}
          onPress={() => setActiveTab('Following')}
        >
          <Text style={styles.tabText}>Following</Text>
        </TouchableOpacity>
      </View>

      {/* Followers/Following List */}
      <ScrollView style={styles.scrollView}>
        {currentData?.map((item, index) => {
          const userId = item.parentUserId;
          return (
              <View key={index} style={styles.followerItem}>
              <Image
                source={item.avatarUrl ? { uri: item.avatarUrl } : userAvatar}
                style={styles.profileImage}
              />
              <Text style={styles.username} onPress={() => showProfile(item)}>
                {item.fullName}
              </Text>
              {activeTab === 'Followers' && user.id !== userId && (
                <TouchableOpacity
                  style={{
                    ...styles.followButton,
                    ...(isFollowing(item.uid) ? styles.unfollowButton : ''),
                  }}
                  onPress={() => changeState(item.uid)}
                >
                  <Text
                    style={{
                      ...styles.followButtonText,
                      ...(isFollowing(item.uid)
                        ? styles.unfollowButtonText
                        : ''),
                    }}
                  >
                    {isFollowing(item.uid) ? `Following` : `Follow`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#1E1D201A',
  },
  activeTab: {
    borderColor: 'black',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Open Sans',
  },
  scrollView: {
      flex: 1,
        paddingHorizontal: 16,
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 12,
  },
  username: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21.79,
    fontFamily: 'Open Sans',
    textAlign: 'left',
  },
  followButton: {
    backgroundColor: '#F08080',
    width: 89,
    borderColor: '#F08080',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 80,
  },
  unfollowButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
  },
  unfollowButtonText: {
    color: '#F08080',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FollowersFollowingScreen;
