import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { getFollowers, getFollowing, getUserByUid } from '../services/feedService';
import ReportPostSheet from '../components/ReportPostSheet';

import ProfileHeader from '../components/ProfileHeader';
import FollowStats from '../components/FollowStats';
import UserPost from '../components/UserPost';
import CommentSheet from '../components/CommentSheet';

import { fetchMyPosts } from '../services/feedService';
import { gallery, gallery_active, menu, menu_active } from '@/src/constants';
import { User } from '../../chat/types/chat.types';
import { Post } from '../types/feed.types';
import OthersPost from '../components/OthersPost';

const screenWidth = Dimensions.get('window').width;

const UserProfileScreen = () => {
  const route =
    useRoute<
      RouteProp<{ params: { userId: string; uid: string } }, 'params'>
    >();
  const { userId, uid } = route.params;
  const navigation = useNavigation<NavigationProp<any>>();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'Posts' | 'Grid'>('Posts');
  const [showComments, setShowComments] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, postsRes, followersRes, followingRes] = await Promise.all([
          getUserByUid(uid),
          fetchMyPosts(userId),
          getFollowers(uid),
          getFollowing(uid),
        ]);
        setUser(userRes || null);
        setPosts(postsRes);
        setFollowers(followersRes?.followers ?? []);
        setFollowing(followingRes?.following ?? []);
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, uid]);

  const handleOpenComments = (post: Post) => {
    setSelectedPost(post);
    setShowComments(true);
  };

  const handleOpenReport = (post: Post) => {
    setSelectedPost(post);
    setShowReport(true);
  };

  const renderGridItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CompletePostScreen', { item: item.id })
      }
      style={styles.postContainer}
    >
      {item.imageAccessUrl && (
        <Image source={{ uri: item.imageAccessUrl }} style={styles.postImage} />
      )}
      <Text>{item.caption}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#F08080" />
        </View>
      ) : (
        <>
          <ProfileHeader
            showBlockBtn={false}
            toggleBlockBtn={() => {}}
            onBlockPress={() => {}}
            AvatarUrl={user?.avatarUrl}
            fullName={user?.fullName}
          />
          <FollowStats
            followers={followers.length}
            following={following.length}
            onFollowersPress={() => {}}
            onFollowingPress={() => {}}
          />

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <Pressable
              style={[
                styles.tab,
                {
                  paddingRight: 16,
                  borderRightWidth: 1,
                  borderColor: '#1E1D201A',
                },
              ]}
              onPress={() => setActiveTab('Posts')}
            >
              <Image
                source={activeTab === 'Posts' ? menu_active : menu}
                style={styles.icon}
              />
            </Pressable>
            <Pressable style={styles.tab} onPress={() => setActiveTab('Grid')}>
              <Image
                source={activeTab === 'Grid' ? gallery_active : gallery}
                style={styles.icon}
              />
            </Pressable>
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'Posts' ? (
              <FlatList
                key="posts"
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <OthersPost
                    post={item}
                    onOpenComments={handleOpenComments}
                    onOpenReport={handleOpenReport}
                  />
                )}
                refreshing={loading}
                onRefresh={async () => {
                  setLoading(true);
                  const refreshedPosts = await fetchMyPosts(userId);
                  setPosts(refreshedPosts);
                  setLoading(false);
                }}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                  !loading && <View style={styles.emptyState} />
                }
              />
            ) : (
              <FlatList
                key="grid"
                contentContainerStyle={styles.gridContent}
                data={posts}
                renderItem={renderGridItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>

          {/* Modals */}
          {selectedPost && (
            <>
              <CommentSheet
                visible={showComments}
                onClose={() => setShowComments(false)}
                post={selectedPost}
              />
              <ReportPostSheet
                visible={showReport}
                onClose={() => setShowReport(false)}
                post={selectedPost}
              />
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  postContainer: {
    width: screenWidth / 2,
    aspectRatio: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#1E1D201A',
    justifyContent: 'center',
    gap: 16,
  },
  tab: {
    marginVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    color: '#999',
    fontSize: 16,
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabContent: {
    width: '100%',
    marginBottom: 180,
  },
  icon: {
    width: 32,
    height: 32,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyState: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContent: {},
  postImage: {
    width: screenWidth / 2,
    aspectRatio: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 2,
  },
});

export default UserProfileScreen;
