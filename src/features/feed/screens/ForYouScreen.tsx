import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import OthersPost from '../components/OthersPost';
import CommentSheet from '../components/CommentSheet';
import ReportPostSheet from '../components/ReportPostSheet';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { Post } from '../types/feed.types';
import { loadForYouPosts } from '@/src/redux/slices/feedSlice';

const ForYouScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.feed.posts) as Post[];
  const loading = useSelector((state: RootState) => state.feed.loading);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if ((!posts || posts.length === 0) && isFirstLoad) {
      dispatch(loadForYouPosts()).finally(() => setIsFirstLoad(false));
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
      {isFirstLoad ? (
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
          onRefresh={() => dispatch(loadForYouPosts())}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            !loading ? <View style={styles.emptyState} /> : null
          }
        />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForYouScreen;
