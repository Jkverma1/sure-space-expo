import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import FollowStats from '../components/FollowStats';
import { AppDispatch, RootState } from '@/src/redux/store';
import {
  fetchAndCacheFollowers,
  fetchAndCacheFollowing,
  Post,
} from '../types/feed.types';
import { gallery, gallery_active, menu, menu_active } from '@/src/constants';
import OthersPost from '../components/OthersPost';
import ReportPostSheet from '../components/ReportPostSheet';
import CommentSheet from '../components/CommentSheet';
import { loadMyPosts } from '@/src/redux/slices/myProfileSlice';

const MyContentScreen = () => {
  const [activeTab, setActiveTab] = useState<'Posts' | 'Grid'>('Posts');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const loading = useSelector((state: RootState) => state.myProfile.loading);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const posts = useSelector(
    (state: RootState) => state.myProfile.myPosts,
  ) as Post[];
  const user = useSelector((state: any) => state.user.user);
  const followers = useSelector(
    (state: RootState) => state.myProfile.followers,
  );
  const following = useSelector(
    (state: RootState) => state.myProfile.following,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!followers && !following && user.uid) {
      fetchAndCacheFollowers(user.uid, dispatch);
      fetchAndCacheFollowing(user.uid, dispatch);
    }
  }, [followers, following, user.uid]);

  useEffect(() => {
    if ((!posts || posts.length === 0) && isFirstLoad) {
      dispatch(loadMyPosts(user.id)).finally(() => setIsFirstLoad(false));
    } else {
      setIsFirstLoad(false);
    }
  }, [dispatch, posts?.length]);

  const handleOpenComments = (post: Post) => {
    setSelectedPost(post);
    setShowComments(true);
  };

  const handleOpenReport = (post: Post) => {
    setSelectedPost(post);
    setShowReport(true);
  };
  return (
    <View style={styles.container}>
      <ProfileHeader
        showBlockBtn={false}
        toggleBlockBtn={() => {}}
        onBlockPress={() => {}}
        AvatarUrl={user?.avatarUrl}
        fullName={user?.fullName}
      />
      <FollowStats
        followers={followers?.length || 0}
        following={following?.length || 0}
        onFollowersPress={() => {}}
        onFollowingPress={() => {}}
      />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Pressable
          style={{
            ...styles.tab,
            paddingRight: 16,
            borderRightWidth: 1,
            borderColor: '#1E1D201A',
          }}
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

      {/* Tab Content Placeholder */}
      <View style={styles.tabContent}>
        {activeTab === 'Posts' ? (
          isFirstLoad ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : (
            <FlatList
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
              onRefresh={() => dispatch(loadMyPosts(user.id))}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={
                !loading ? <View style={styles.emptyState} /> : null
              }
            />
          )
        ) : (
          <Text>Show Grid Layout Here</Text>
        )}

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  postContainer: {
    flex: 1,
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
    marginBottom: 125,
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
});

export default MyContentScreen;
